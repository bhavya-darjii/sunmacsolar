/**
 * Sends one of the website's forms to SunMac's team: the browser posts to /api/enquiry, which
 * forwards it to Surge (lib/surge.ts). Throws when it didn't arrive, so the form can say so.
 */
export async function sendEnquiry(
  form: "quote" | "chat" | "ppa",
  submissionId: string,
  fields: Record<string, unknown>,
  /** The hidden spam-trap field's value: empty for a person. */
  trap: string,
): Promise<void> {
  const response = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ form, submission_id: submissionId, fields, company_website: trap }),
  });
  if (!response.ok) throw new Error(`The enquiry wasn't sent (${response.status})`);
}

/** A new id for a filled-in form. A retry of the same form reuses it, so it lands once. */
export function newSubmissionId(): string {
  return crypto.randomUUID();
}
