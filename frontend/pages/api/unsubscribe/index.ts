import type { NextApiRequest, NextApiResponse } from "next";
import { relayUnsubscribe } from "@/lib/surge";

export const config = { api: { bodyParser: { sizeLimit: "4kb" } } };

/**
 * The unsubscribe page's button, when JavaScript is on (pages/unsubscribe.tsx): the token goes to
 * SunMac's system and the answer comes back as JSON for the page to show. Anyone with a link may
 * press it: the token is the proof, and SunMac's system checks it.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use POST" });
  }
  const token = (req.body as { token?: unknown } | null)?.token;
  const result = await relayUnsubscribe(token);
  const status = result.status === "done" ? 200 : result.status === "invalid" ? 400 : 503;
  return res.status(status).json(result);
}
