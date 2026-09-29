import { useState } from "react";
import { toast } from "sonner";
import { Check, DollarSign, FileText, Map, Wrench } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { api } from "@/lib/api";

const BENEFITS = [
  { icon: DollarSign, title: "Recurring revenue", desc: "Earn long-term lease + revenue-share payments over 20-30 years." },
  { icon: Map, title: "No capital required", desc: "We finance, design and build the solar farm at no cost to you." },
  { icon: Wrench, title: "Full O&M handled", desc: "Operations, maintenance and grid management are entirely our responsibility." },
  { icon: FileText, title: "Transparent contracts", desc: "Plain-English PPA agreements drafted by Australian energy specialists." },
];

export default function PPA() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", land_size_acres: "", land_location: "", has_grid_connection: false, notes: "" });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/ppa-inquiries", {
        ...form,
        land_size_acres: form.land_size_acres ? parseFloat(form.land_size_acres) : null,
      });
      toast.success("Inquiry sent — our PPA team will be in touch within 2 business days.");
      setForm({ name: "", email: "", phone: "", land_size_acres: "", land_location: "", has_grid_connection: false, notes: "" });
    } catch (err) {
      toast.error("Could not send inquiry. Please try again or email info@sunmacsolar.com.au.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="ppa-page">
      <section className="container-page pt-20 md:pt-28 pb-12">
        <Reveal>
          <div className="overline text-[#D97706]">PPA contracts</div>
          <h1 className="font-display font-light text-5xl sm:text-6xl tracking-tight mt-4 max-w-4xl">
            Turn vacant land into long-term solar revenue.
          </h1>
          <p className="mt-6 text-lg text-[#57534E] max-w-3xl">
            A Power Purchase Agreement (PPA) lets landowners host a utility-scale solar farm on their land — financed, built and operated entirely by SunMac Solar. You receive lease and revenue-share payments across the life of the project.
          </p>
        </Reveal>
      </section>

      <section className="bg-[#F5F5F0] section-pad">
        <div className="container-page">
          <Reveal>
            <div className="overline text-[#D97706]">Why landowners choose us</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mt-4 font-medium tracking-tight max-w-3xl">No capital, no operations, no risk.</h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05}>
                <div className="bg-[#FDFBF7] border border-[#E7E5E4] rounded-2xl p-8 h-full" data-testid={`ppa-benefit-${i}`}>
                  <div className="w-11 h-11 rounded-xl bg-[#166534]/10 text-[#166534] flex items-center justify-center">
                    <b.icon className="w-5 h-5" />
                  </div>
                  <div className="font-display text-lg font-medium mt-5">{b.title}</div>
                  <div className="text-sm text-[#57534E] mt-2 leading-relaxed">{b.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page section-pad">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <Reveal className="md:col-span-5 space-y-6">
            <div className="overline text-[#D97706]">Ideal sites</div>
            <h3 className="font-display text-3xl font-medium tracking-tight">Does your land qualify?</h3>
            <ul className="space-y-3 text-[#57534E]">
              {[
                "20+ acres of clear, relatively flat land",
                "Reasonable proximity to existing power lines (ideally within 5km)",
                "Located in NSW, QLD, VIC, SA or WA",
                "Existing access road or easy ability to build one",
                "Land currently underutilised or low-yield for farming",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2"><Check className="w-4 h-4 text-[#166534] mt-1 shrink-0" /> {t}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <form onSubmit={onSubmit} className="bg-[#F5F5F0] border border-[#E7E5E4] rounded-3xl p-8 md:p-10 space-y-4" data-testid="ppa-form">
              <div className="overline text-[#D97706]">Free site evaluation</div>
              <h3 className="font-display text-2xl font-medium tracking-tight mt-1">Tell us about your land</h3>

              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <input required value={form.name} onChange={(e) => onChange("name", e.target.value)} placeholder="Full name" data-testid="ppa-name" className="w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] outline-none focus:border-[#D97706]" />
                <input required type="email" value={form.email} onChange={(e) => onChange("email", e.target.value)} placeholder="Email" data-testid="ppa-email" className="w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] outline-none focus:border-[#D97706]" />
                <input required value={form.phone} onChange={(e) => onChange("phone", e.target.value)} placeholder="Phone" data-testid="ppa-phone" className="w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] outline-none focus:border-[#D97706]" />
                <input value={form.land_size_acres} onChange={(e) => onChange("land_size_acres", e.target.value)} type="number" step="0.1" placeholder="Land size (acres)" data-testid="ppa-acres" className="w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] outline-none focus:border-[#D97706]" />
              </div>
              <input required value={form.land_location} onChange={(e) => onChange("land_location", e.target.value)} placeholder="Land location (suburb, state)" data-testid="ppa-location" className="w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] outline-none focus:border-[#D97706]" />
              <label className="flex items-center gap-2 text-sm text-[#57534E]">
                <input type="checkbox" checked={form.has_grid_connection} onChange={(e) => onChange("has_grid_connection", e.target.checked)} data-testid="ppa-grid" className="w-4 h-4 accent-[#D97706]" />
                Power lines are nearby (within 5km)
              </label>
              <textarea rows={4} value={form.notes} onChange={(e) => onChange("notes", e.target.value)} placeholder="Anything else we should know?" data-testid="ppa-notes" className="w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] outline-none focus:border-[#D97706] resize-none" />

              <button disabled={submitting} type="submit" data-testid="ppa-submit" className="rounded-full bg-[#D97706] hover:bg-[#B45309] text-[#FDFBF7] px-7 py-3.5 font-medium transition-colors disabled:opacity-60">
                {submitting ? "Sending…" : "Request a site evaluation"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
