import type { NextApiRequest, NextApiResponse } from "next";
import { isUnsubscribeToken, relayUnsubscribe } from "@/lib/surge";

export const config = { api: { bodyParser: { sizeLimit: "4kb" } } };

/**
 * A mail app's own unsubscribe button (RFC 8058 one-click), served at /unsubscribe/one-click
 * (next.config.ts). It reads this address from the email's List-Unsubscribe header and posts
 * "List-Unsubscribe=One-Click" here, with no cookies. The token in the address is the proof; the
 * body isn't needed, so any POST with a whole token unsubscribes.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  const token = typeof req.query.t === "string" ? req.query.t : null;

  if (req.method === "POST") {
    const result = await relayUnsubscribe(token);
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    if (result.status === "done") return res.status(200).send("Unsubscribed.");
    if (result.status === "invalid") {
      return res.status(400).send("This unsubscribe link isn't complete.");
    }
    return res.status(503).send("Couldn't unsubscribe just now. Try again shortly.");
  }

  if (req.method === "GET") {
    // Opening the address in a browser shows the page with the button: a GET never unsubscribes.
    return res.redirect(
      303,
      isUnsubscribeToken(token) ? `/unsubscribe?t=${token}` : "/unsubscribe",
    );
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).send("Use POST");
}
