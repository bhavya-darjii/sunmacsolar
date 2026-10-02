import { useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { MASCOT } from "@/data/site";
import { api } from "@/lib/api";

export default function JoeyChat() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"intro" | "form" | "done">("intro");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/leads", {
        ...form,
        service_type: "joey-chat",
      });
      setStep("done");
      toast.success("Joey hopped your message over to our team!");
    } catch {
      toast.error(
        "Could not send. Please try the Contact page or email info@sunmacsolar.com.au."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-50" data-testid="joey-chat-root">
      {open && (
        <div
          className="mb-3 w-[340px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-[var(--radius-card)] border border-[#e7e5e4] bg-[#fdfbf7] shadow-2xl"
          data-testid="joey-chat-panel"
        >
          <div className="flex items-center gap-3 bg-[#1c1917] p-4 text-[#fdfbf7]">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-[#d97706]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={MASCOT.url} alt="Joey" className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 leading-tight">
              <div className="flex items-center gap-2 font-display font-semibold">
                {MASCOT.name}
                <span className="inline-flex items-center gap-1 text-[10px] font-normal text-[#a8a29e]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22c55e]" />
                  online
                </span>
              </div>
              <div className="text-xs text-[#d6d3d1]">{MASCOT.tagline}</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              data-testid="joey-chat-close"
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#292524]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-5">
            {step === "intro" && (
              <div className="space-y-4" data-testid="joey-chat-intro">
                <div className="rounded-2xl rounded-tl-md bg-[#f5f5f0] p-4 text-sm leading-relaxed">
                  G&apos;day! I&apos;m Joey. Tell our team a bit about your project and we&apos;ll
                  come back within 48 hours with a realistic quote.
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Home solar + battery",
                    "Commercial system",
                    "Irrigation pumps",
                    "Off-grid setup",
                    "PPA / solar farm",
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        onChange("message", `Interested in: ${opt}`);
                        setStep("form");
                      }}
                      className="rounded-full border border-[#e7e5e4] px-3 py-1.5 text-xs transition-colors hover:bg-[#1c1917] hover:text-[#fdfbf7]"
                      data-testid={`joey-chat-opt-${opt
                        .toLowerCase()
                        .replace(/[^a-z]/g, "-")
                        .replace(/-+/g, "-")}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="btn-primary w-full"
                  data-testid="joey-chat-start"
                >
                  Start a conversation
                </button>
              </div>
            )}

            {step === "form" && (
              <form onSubmit={submit} className="space-y-3" data-testid="joey-chat-form">
                <input
                  required
                  value={form.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  placeholder="Your name"
                  className="input-final text-sm"
                  data-testid="joey-chat-name"
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  placeholder="Email"
                  className="input-final text-sm"
                  data-testid="joey-chat-email"
                />
                <input
                  required
                  value={form.phone}
                  onChange={(e) => onChange("phone", e.target.value)}
                  placeholder="Phone"
                  className="input-final text-sm"
                  data-testid="joey-chat-phone"
                />
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => onChange("message", e.target.value)}
                  placeholder="How can we help?"
                  className="input-final resize-none text-sm"
                  data-testid="joey-chat-message"
                />
                <button
                  disabled={submitting}
                  type="submit"
                  className="btn-primary w-full disabled:opacity-60"
                  data-testid="joey-chat-submit"
                >
                  {submitting ? "Sending…" : (
                    <>
                      Send to our team <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {step === "done" && (
              <div className="space-y-4 py-4 text-center" data-testid="joey-chat-done">
                <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-4 border-[#d97706]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={MASCOT.url} alt="Joey waving" className="h-full w-full object-cover" />
                </div>
                <div className="font-display text-lg font-medium">Thanks, mate!</div>
                <p className="text-sm text-[#57534e]">
                  I&apos;ve hopped your message over to the SunMac Solar team. Expect a reply within
                  48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStep("intro");
                    setForm({ name: "", email: "", phone: "", message: "" });
                    setOpen(false);
                  }}
                  className="text-sm text-[#d97706] hover:underline"
                  data-testid="joey-chat-close-done"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Joey chat" : "Chat with Joey"}
        data-testid="joey-chat-toggle"
        className="group relative flex items-center gap-3 rounded-full bg-[#1c1917] py-1 pl-1 pr-5 text-[#fdfbf7] shadow-xl transition-colors hover:bg-[#d97706]"
      >
        <span className="relative">
          <span className="block h-14 w-14 overflow-hidden rounded-full border-2 border-[#d97706] bg-[#f5f5f0]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={MASCOT.url} alt="Joey" className="h-full w-full object-cover" />
          </span>
          {!open && (
            <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#1c1917] bg-[#22c55e] transition-colors group-hover:border-[#d97706]" />
          )}
        </span>
        <span className="hidden flex-col items-start leading-tight sm:flex">
          <span className="text-xs font-medium text-[#fbbf24]">
            {open ? "Close chat" : "Chat with Joey"}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-[#d6d3d1]">
            <MessageCircle className="h-3 w-3" /> Get a quick quote
          </span>
        </span>
      </button>
    </div>
  );
}
