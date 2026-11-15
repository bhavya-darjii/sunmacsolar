import { randomUUID } from "node:crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { forwardToSurge, type EnquiryForm } from "@/lib/surge";

export const config = { api: { bodyParser: { sizeLimit: "64kb" } } };

/** Each form's fields. Anything else the browser sends is dropped. */
const FIELDS: Record<EnquiryForm, readonly string[]> = {
  quote: ["name", "email", "phone", "location", "service_type", "message"],
  chat: ["name", "email", "phone", "message"],
  ppa: [
    "name",
    "email",
    "phone",
    "land_size_acres",
    "land_location",
    "has_grid_connection",
    "notes",
  ],
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const isForm = (value: unknown): value is EnquiryForm =>
  typeof value === "string" && Object.hasOwn(FIELDS, value);

/**
 * The quote form (/contact), the Joey chat and the PPA form (/ppa) post here. The enquiry goes to
 * Surge, SunMac's lead dashboard, signed with this server's secret, and the person lands on its
 * Leads screen within seconds. Anything but a 200 makes the form say it couldn't send, so an
 * enquiry is never lost quietly.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use POST" });
  }
  const body = (req.body ?? {}) as Record<string, unknown>;
  if (!isForm(body.form)) return res.status(400).json({ error: "Unknown form" });

  // A field people never see: bots fill it in. Answer as if it went, and send nothing.
  if (typeof body.company_website === "string" && body.company_website.trim()) {
    return res.status(200).json({ ok: true });
  }

  const typed = (body.fields ?? {}) as Record<string, unknown>;
  const fields = Object.fromEntries(
    FIELDS[body.form].filter((key) => typed[key] !== undefined).map((key) => [key, typed[key]]),
  );
  const submissionId =
    typeof body.submission_id === "string" && UUID.test(body.submission_id)
      ? body.submission_id
      : randomUUID();
  const page = typeof req.headers.referer === "string" ? req.headers.referer.slice(0, 500) : "";

  const sent = await forwardToSurge({
    form: body.form,
    submission_id: submissionId,
    submitted_at: new Date().toISOString(),
    ...(page ? { page } : {}),
    fields,
  });
  if (!sent) return res.status(502).json({ error: "Couldn't send the enquiry" });
  return res.status(200).json({ ok: true });
}
