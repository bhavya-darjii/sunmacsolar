import type { IncomingMessage } from "node:http";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useState, type FormEvent } from "react";
import { isUnsubscribeToken, relayUnsubscribe, type UnsubscribeResult } from "@/lib/surge";

/**
 * The page behind the unsubscribe link in every email SunMac sends. The link is
 * /unsubscribe?t=<token>; opening it changes nothing, because mail scanners open links. Only the
 * button does: with JavaScript it posts to /api/unsubscribe and shows the answer here; without it,
 * the form posts to this page, and the server answers in the page it sends back. Either way the
 * token goes to SunMac's system (lib/surge.ts), which checks it and unsubscribes the address.
 *
 * It looks exactly as the page did before it moved here from SunMac's internal system: the same
 * layout, words, one button and results, with no site header or footer (_app.tsx).
 */

type Props = {
  /** The token, when it's whole. A link a mail app cut short has none. */
  token: string | null;
  /** What pressing the button without JavaScript came to. */
  initial: UnsubscribeResult | null;
};

/** The form a button posts without JavaScript: a token and nothing else. Never more than this. */
const MAX_FORM_BYTES = 4096;

async function readForm(req: IncomingMessage): Promise<URLSearchParams | null> {
  const type = req.headers["content-type"] ?? "";
  if (!type.startsWith("application/x-www-form-urlencoded")) return null;
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    size += (chunk as Buffer).length;
    if (size > MAX_FORM_BYTES) return null;
    chunks.push(chunk as Buffer);
  }
  return new URLSearchParams(Buffer.concat(chunks).toString("utf8"));
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res, query }) => {
  // The token is in the address: never cache it, and never pass it on in a Referer.
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Referrer-Policy", "no-referrer");
  const fromAddress = typeof query.t === "string" ? query.t : null;
  if (req.method === "POST") {
    const posted = (await readForm(req))?.get("t") ?? fromAddress;
    return {
      props: {
        token: isUnsubscribeToken(posted) ? posted : null,
        initial: await relayUnsubscribe(posted),
      },
    };
  }
  return {
    props: { token: isUnsubscribeToken(fromAddress) ? fromAddress : null, initial: null },
  };
};

const REPLY_INSTEAD =
  'You can also reply "unsubscribe" to any email from us, and we\'ll take you off the list.';

/** SunMac Solar's mark: a cream sun on an amber disc (public/logo/sunmac-solar-icon.svg). */
function SunMark() {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" className="size-11 shrink-0">
      <circle cx="128" cy="128" r="120" fill="#d97706" />
      <g
        transform="translate(64,64) scale(5.333)"
        stroke="#fdfbf7"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </g>
    </svg>
  );
}

function CircleCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-8 shrink-0 text-[#d97706]"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

// Surge's display-lead sets a line height of 1.25; the site's own is a little looser.
const HEADLINE_LEADING = { lineHeight: 1.25 } as const;

/**
 * The one button. Opening the page changes nothing; pressing the button posts the token, and the
 * page then says what happened.
 */
function UnsubscribeForm({ token, initial }: { token: string; initial: UnsubscribeResult | null }) {
  const [state, setState] = useState<UnsubscribeResult | null>(initial);
  const [pending, setPending] = useState(false);

  async function unsubscribe(event: FormEvent<HTMLFormElement>) {
    // With JavaScript: ask in the background, so the page doesn't reload.
    event.preventDefault();
    setPending(true);
    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const answer = (await response.json()) as UnsubscribeResult;
      setState(
        answer.status === "done" || answer.status === "invalid"
          ? answer
          : { status: "unavailable" },
      );
    } catch {
      setState({ status: "unavailable" });
    } finally {
      setPending(false);
    }
  }

  if (state?.status === "done") {
    return (
      <div role="status" className="flex flex-col gap-3">
        <CircleCheck />
        <h1 className="display-lead" style={HEADLINE_LEADING}>
          You&apos;re <span className="font-semibold">unsubscribed.</span>
        </h1>
        <p className="text-base text-[#57534e]">
          {state.already ? "You'd already unsubscribed: " : ""}SunMac Solar won&apos;t email{" "}
          {state.email ? <span className="break-all text-[#1c1917]">{state.email}</span> : "you"}{" "}
          again. You can close this page.
        </p>
      </div>
    );
  }

  return (
    <form method="post" onSubmit={unsubscribe} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="overline">Unsubscribe</p>
        <h1 className="display-lead" style={HEADLINE_LEADING}>
          Stop emails from <span className="font-semibold">SunMac Solar?</span>
        </h1>
        <p className="text-base text-[#57534e]">
          Press the button and we won&apos;t email you again.
        </p>
      </div>
      <input type="hidden" name="t" value={token} />
      <button
        type="submit"
        disabled={pending}
        className="group/button inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-transparent bg-[#1c1917] bg-clip-padding px-5 text-sm font-semibold whitespace-nowrap text-[#fdfbf7] shadow-xs transition-[color,background-color,border-color,box-shadow] duration-200 outline-none select-none hover:bg-[#d97706] hover:text-[#fdfbf7] focus-visible:border-[#d97706] focus-visible:ring-3 focus-visible:ring-[#d97706]/40 active:translate-y-px disabled:pointer-events-none disabled:opacity-50"
      >
        {pending ? "Unsubscribing…" : "Unsubscribe"}
      </button>
      {state?.status === "invalid" && (
        <p role="alert" className="rounded-xl bg-[#dc2626]/5 p-3 text-sm text-[#dc2626]">
          This link isn&apos;t complete, so it can&apos;t unsubscribe you. {REPLY_INSTEAD}
        </p>
      )}
      {state?.status === "unavailable" && (
        <p role="alert" className="rounded-xl bg-[#fffbeb] p-3 text-sm text-[#b45309]">
          We couldn&apos;t unsubscribe you just now. Try again in a minute. {REPLY_INSTEAD}
        </p>
      )}
    </form>
  );
}

export default function UnsubscribePage({ token, initial }: Props) {
  return (
    <>
      <Head>
        <title>Unsubscribe · SunMac Solar</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="flex min-h-dvh flex-1 items-center justify-center bg-white px-4 py-10 sm:px-6">
        <div className="flex w-full max-w-md flex-col gap-8">
          <div className="flex items-center gap-3">
            <SunMark />
            <div className="leading-tight">
              <div className="font-heading text-lg font-semibold tracking-tight">SunMac Solar</div>
              <div className="text-[10px] tracking-[0.18em] text-[#78716c] uppercase">
                Ecomac Energy
              </div>
            </div>
          </div>
          {token ? (
            <UnsubscribeForm token={token} initial={initial} />
          ) : (
            <div className="flex flex-col gap-2">
              <p className="overline">Unsubscribe</p>
              <h1 className="display-lead" style={HEADLINE_LEADING}>
                This link isn&apos;t <span className="font-semibold">complete.</span>
              </h1>
              <p className="text-base text-[#57534e]">
                Your mail app may have cut it short. Reply &quot;unsubscribe&quot; to any email
                from SunMac Solar instead, and we&apos;ll take you off the list.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
