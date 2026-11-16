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

/**
 * What an unsubscribe came to. Done says which address it was and whether it had been done
 * before; invalid is a link that isn't whole or isn't one SunMac made; unavailable is "try again
 * in a minute".
 */
export type UnsubscribeResult =
  | { status: "done"; email: string; already: boolean }
  | { status: "invalid" }
  | { status: "unavailable" };

/**
 * base64url(kind, id, address) "." base64url(16-byte signature): the shape of the token in an
 * email's unsubscribe link, which only SunMac's system can make and check. A link a mail app cut
 * short fails here, before anything is sent. Must match isUnsubscribeToken in Surge's
 * packages/compliance/src/unsubscribe-link.ts.
 */
const TOKEN = /^[A-Za-z0-9_-]{27,362}\.[A-Za-z0-9_-]{22}$/;

export function isUnsubscribeToken(value: unknown): value is string {
  return typeof value === "string" && TOKEN.test(value);
}

/**
 * Hands the token from an unsubscribe link to Surge, which unsubscribes the address it names. Opening
 * the link never calls this: only the page's button (or a mail app's one-click POST) does, because
 * mail scanners open links. Signed like an enquiry, but with its own secret
 * (SURGE_UNSUBSCRIBE_SECRET; Surge holds the same value as WEBSITE_UNSUBSCRIBE_SECRET), so neither
 * secret can be used for the other. The token is the proof and SunMac's database checks it: this
 * server decides nothing. One retry on a network or server error is safe: unsubscribing twice
 * changes nothing. Server-only; nothing personal is logged.
 */
export async function relayUnsubscribe(token: unknown): Promise<UnsubscribeResult> {
  if (!isUnsubscribeToken(token)) return { status: "invalid" };
  const url = process.env.SURGE_UNSUBSCRIBE_URL?.trim();
  const secret = process.env.SURGE_UNSUBSCRIBE_SECRET?.trim();
  if (!url || !secret) {
    console.error(
      "Unsubscribes can't reach SunMac's system: set SURGE_UNSUBSCRIBE_URL and SURGE_UNSUBSCRIBE_SECRET",
    );
    return { status: "unavailable" };
  }
  const body = JSON.stringify({ token });
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const timestamp = Math.floor(Date.now() / 1000);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-surge-timestamp": String(timestamp),
          "x-surge-signature": signEnquiry(secret, timestamp, body),
        },
        body,
        signal: AbortSignal.timeout(8000),
      });
      if (response.status === 400) return { status: "invalid" };
      if (response.ok) {
        const answer = (await response.json()) as {
          status?: unknown;
          email?: unknown;
          already?: unknown;
        };
        if (answer.status === "done") {
          return {
            status: "done",
            email: typeof answer.email === "string" ? answer.email : "",
            already: answer.already === true,
          };
        }
        return { status: "unavailable" };
      }
      // Refused for another reason (401: the two secrets differ): sending again won't help.
      if (response.status < 500) {
        console.error(`An unsubscribe was refused: ${response.status}`);
        return { status: "unavailable" };
      }
    } catch {
      // A network error or a timeout: sending it again is safe.
    }
  }
  console.error("An unsubscribe didn't reach SunMac's system");
  return { status: "unavailable" };
}
