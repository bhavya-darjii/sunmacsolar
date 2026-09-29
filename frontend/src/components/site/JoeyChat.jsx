import { useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { MASCOT } from "@/data/site";
import { api } from "@/lib/api";

export default function JoeyChat() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("intro"); // intro | form | done
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
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
      toast.error("Could not send. Please try the Contact page or email info@sunmacsolar.com.au.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-50" data-testid="joey-chat-root">
      {/* Panel */}
      {open && (
        <div
          className="mb-3 w-[340px] max-w-[calc(100vw-2.5rem)] rounded-3xl overflow-hidden shadow-2xl border border-[#E7E5E4] bg-[#FDFBF7] animate-in fade-in slide-in-from-bottom-4 duration-300"
          data-testid="joey-chat-panel"
        >
          {/* Header */}
          <div className="bg-[#1C1917] text-[#FDFBF7] p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#D97706] shrink-0">
              <img src={MASCOT.url} alt="Joey" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 leading-tight">
              <div className="font-display font-semibold flex items-center gap-2">
                {MASCOT.name}
                <span className="inline-flex items-center gap-1 text-[10px] font-normal text-[#A8A29E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" /> online
                </span>
              </div>
              <div className="text-xs text-[#D6D3D1]">{MASCOT.tagline}</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              data-testid="joey-chat-close"
              className="w-8 h-8 rounded-full hover:bg-[#292524] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 max-h-[60vh] overflow-y-auto">
            {step === "intro" && (
              <div className="space-y-4" data-testid="joey-chat-intro">
                <div className="bg-[#F5F5F0] rounded-2xl rounded-tl-md p-4 text-sm leading-relaxed">
                  G&apos;day! I&apos;m Joey. Tell our team a bit about your project and we&apos;ll come back within 48 hours with a realistic quote.
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
                      onClick={() => { onChange("message", `Interested in: ${opt}`); setStep("form"); }}
                      className="px-3 py-1.5 text-xs rounded-full border border-[#E7E5E4] hover:bg-[#1C1917] hover:text-[#FDFBF7] transition-colors"
                      data-testid={`joey-chat-opt-${opt.toLowerCase().replace(/[^a-z]/g, "-").replace(/-+/g, "-")}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep("form")}
                  className="w-full rounded-full bg-[#D97706] hover:bg-[#B45309] text-[#FDFBF7] py-3 text-sm font-medium transition-colors"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] text-sm outline-none focus:border-[#D97706]"
                  data-testid="joey-chat-name"
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] text-sm outline-none focus:border-[#D97706]"
                  data-testid="joey-chat-email"
                />
                <input
                  required
                  value={form.phone}
                  onChange={(e) => onChange("phone", e.target.value)}
                  placeholder="Phone"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] text-sm outline-none focus:border-[#D97706]"
                  data-testid="joey-chat-phone"
                />
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => onChange("message", e.target.value)}
                  placeholder="How can we help?"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] text-sm outline-none focus:border-[#D97706] resize-none"
                  data-testid="joey-chat-message"
                />
                <button
                  disabled={submitting}
                  type="submit"
                  className="w-full rounded-full bg-[#D97706] hover:bg-[#B45309] text-[#FDFBF7] py-3 text-sm font-medium transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
                  data-testid="joey-chat-submit"
                >
                  {submitting ? "Sending…" : (<>Send to our team <Send className="w-4 h-4" /></>)}
                </button>
              </form>
            )}

            {step === "done" && (
              <div className="text-center space-y-4 py-4" data-testid="joey-chat-done">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-[#D97706]">
                  <img src={MASCOT.url} alt="Joey waving" className="w-full h-full object-cover" />
                </div>
                <div className="font-display text-lg font-medium">Thanks, mate!</div>
                <p className="text-sm text-[#57534E]">
                  I&apos;ve hopped your message over to the SunMac Solar team. Expect a reply within 48 hours.
                </p>
                <button
                  onClick={() => { setStep("intro"); setForm({ name: "", email: "", phone: "", message: "" }); setOpen(false); }}
                  className="text-sm text-[#D97706] hover:underline"
                  data-testid="joey-chat-close-done"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Joey chat" : "Chat with Joey"}
        data-testid="joey-chat-toggle"
        className="group relative flex items-center gap-3 pl-1 pr-5 py-1 rounded-full bg-[#1C1917] text-[#FDFBF7] shadow-xl hover:bg-[#D97706] transition-colors"
      >
        <span className="relative">
          <span className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#D97706] bg-[#F5F5F0] block">
            <img src={MASCOT.url} alt="Joey" className="w-full h-full object-cover" />
          </span>
          {!open && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#22c55e] border-2 border-[#1C1917] group-hover:border-[#D97706] transition-colors" />
          )}
        </span>
        <span className="hidden sm:flex flex-col items-start leading-tight">
          <span className="text-xs text-[#FBBF24] font-medium">{open ? "Close chat" : "Chat with Joey"}</span>
          <span className="text-[10px] text-[#D6D3D1] inline-flex items-center gap-1">
            <MessageCircle className="w-3 h-3" /> Get a quick quote
          </span>
        </span>
      </button>
    </div>
  );
}
