import { createHmac } from "node:crypto";

/**
 * Sends the website's enquiries to Surge, SunMac's lead dashboard, where each one lands on the
 * Leads screen within seconds. Server-only (node:crypto, and the secret): only pages/api/enquiry.ts
 * imports it.
 *
 * Surge checks that a request came from this server: an HMAC-SHA256 over
 * `<unix seconds>.<the JSON body>`, keyed with SURGE_ENQUIRY_SECRET (Surge holds the same value as
 * WEBSITE_ENQUIRY_SECRET). This must match Surge's apps/web/src/lib/enquiry-signature.ts.
 */

export type EnquiryForm = "quote" | "chat" | "ppa";

export type Enquiry = {
  form: EnquiryForm;
  /** Made in the browser once per filled-in form, so a retry is recognised as the same one. */
  submission_id: string;
  /** When this server received it. */
  submitted_at: string;
  /** The page it was sent from. */
  page?: string;
  /** The form's fields, exactly as the person typed them. */
  fields: Record<string, unknown>;
};

export function signEnquiry(secret: string, timestamp: number, body: string): string {
  return `v1=${createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex")}`;
}

/** Whether Surge recorded the enquiry. One retry on a network error or a server error. */
export async function forwardToSurge(enquiry: Enquiry): Promise<boolean> {
  const url = process.env.SURGE_ENQUIRY_URL?.trim();
  const secret = process.env.SURGE_ENQUIRY_SECRET?.trim();
  if (!url || !secret) {
    console.error("Enquiries can't reach Surge: set SURGE_ENQUIRY_URL and SURGE_ENQUIRY_SECRET");
    return false;
  }
  const body = JSON.stringify(enquiry);
  const timestamp = Math.floor(Date.now() / 1000);
  const headers = {
    "Content-Type": "application/json",
    "x-surge-timestamp": String(timestamp),
    "x-surge-signature": signEnquiry(secret, timestamp, body),
  };
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
        signal: AbortSignal.timeout(4000),
      });
      if (response.ok) return true;
      // Surge refused it (a bad signature or a field it can't take): sending again won't help.
      if (response.status < 500) {
        console.error(`Surge refused enquiry ${enquiry.submission_id}: ${response.status}`);
        return false;
      }
    } catch {
      // A network error or a timeout: the submission id makes a second try safe.
    }
  }
  console.error(`Enquiry ${enquiry.submission_id} didn't reach Surge`);
  return false;
}
