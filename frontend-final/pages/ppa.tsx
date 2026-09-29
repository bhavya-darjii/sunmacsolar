import { useState } from "react";
import Head from "next/head";
import { toast } from "sonner";
import { Check, DollarSign, FileText, Map, Wrench, type LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";
import PageIntro from "@/components/site/PageIntro";
import { api } from "@/lib/api";

interface Benefit {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: DollarSign,
    title: "Recurring revenue",
    desc: "Earn long-term lease + revenue-share payments over 20-30 years.",
  },
  {
    icon: Map,
    title: "No capital required",
    desc: "We finance, design and build the solar farm at no cost to you.",
  },
  {
    icon: Wrench,
    title: "Full O&M handled",
    desc: "Operations, maintenance and grid management are entirely our responsibility.",
  },
  {
    icon: FileText,
    title: "Transparent contracts",
    desc: "Plain-English PPA agreements drafted by Australian energy specialists.",
  },
];

export default function PpaPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    land_size_acres: "",
    land_location: "",
    has_grid_connection: false,
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/ppa-inquiries", {
        ...form,
        land_size_acres: form.land_size_acres ? parseFloat(form.land_size_acres) : null,
      });
      toast.success("Inquiry sent — our PPA team will be in touch within 2 business days.");
      setForm({
        name: "",
        email: "",
        phone: "",
        land_size_acres: "",
        land_location: "",
        has_grid_connection: false,
        notes: "",
      });
    } catch {
      toast.error("Could not send inquiry. Please try again or email info@sunmacsolar.com.au.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Solar PPA Contracts for Landowners | SunMac Solar</title>
        <meta
          name="description"
          content="Host a utility solar farm on your rural land with $0 capital and guaranteed long-term lease returns."
        />
      </Head>
      <div data-testid="ppa-page">
        <PageIntro
          overline="PPA contracts"
          title="Turn vacant land into long-term solar revenue."
          description="A Power Purchase Agreement (PPA) lets landowners host a utility-scale solar farm on their land — financed, built and operated entirely by SunMac Solar. You receive lease and revenue-share payments across the life of the project."
        />

        <section className="section-pad bg-[#f5f5f0]">
          <div className="container-final">
            <Reveal>
              <p className="overline">Why landowners choose us</p>
              <h2 className="mt-4 max-w-3xl font-display text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
                No capital, no operations, no risk.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.05}>
                  <div
                    className="card-lift h-full rounded-[var(--radius-card)] border border-[#e7e5e4] bg-[#fdfbf7] p-8"
                    data-testid={`ppa-benefit-${i}`}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#166534]/10 text-[#166534]">
                      <b.icon className="h-5 w-5" />
                    </div>
                    <div className="mt-5 font-display text-lg font-medium">{b.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-[#57534e]">{b.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="container-final section-pad">
          <div className="grid items-start gap-12 md:grid-cols-12">
            <Reveal className="space-y-6 md:col-span-5">
              <p className="overline">Ideal sites</p>
              <h3 className="font-display text-3xl font-medium tracking-tight">
                Does your land qualify?
              </h3>
              <ul className="space-y-3 text-[#57534e]">
                {[
                  "20+ acres of clear, relatively flat land",
                  "Reasonable proximity to existing power lines (ideally within 5km)",
                  "Located in NSW, QLD, VIC, SA or WA",
                  "Existing access road or easy ability to build one",
                  "Land currently underutilised or low-yield for farming",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#166534]" /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="md:col-span-7">
              <form
                onSubmit={onSubmit}
                className="space-y-4 rounded-[var(--radius-card)] border border-[#e7e5e4] bg-[#f5f5f0] p-8 md:p-10"
                data-testid="ppa-form"
              >
                <p className="overline">Free site evaluation</p>
                <h3 className="mt-1 font-display text-2xl font-medium tracking-tight">
                  Tell us about your land
                </h3>

                <div className="grid gap-4 pt-2 md:grid-cols-2">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    placeholder="Full name"
                    data-testid="ppa-name"
                    className="input-final"
                  />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    placeholder="Email"
                    data-testid="ppa-email"
                    className="input-final"
                  />
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => onChange("phone", e.target.value)}
                    placeholder="Phone"
                    data-testid="ppa-phone"
                    className="input-final"
                  />
                  <input
                    value={form.land_size_acres}
                    onChange={(e) => onChange("land_size_acres", e.target.value)}
                    type="number"
                    step="0.1"
                    placeholder="Land size (acres)"
                    data-testid="ppa-acres"
                    className="input-final"
                  />
                </div>
                <input
                  required
                  value={form.land_location}
                  onChange={(e) => onChange("land_location", e.target.value)}
                  placeholder="Land location (suburb, state)"
                  data-testid="ppa-location"
                  className="input-final"
                />
                <label className="flex items-center gap-2 text-sm text-[#57534e]">
                  <input
                    type="checkbox"
                    checked={form.has_grid_connection}
                    onChange={(e) => onChange("has_grid_connection", e.target.checked)}
                    data-testid="ppa-grid"
                    className="h-4 w-4 accent-[#d97706]"
                  />
                  Power lines are nearby (within 5km)
                </label>
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={(e) => onChange("notes", e.target.value)}
                  placeholder="Anything else we should know?"
                  data-testid="ppa-notes"
                  className="input-final resize-none"
                />

                <button disabled={submitting} type="submit" data-testid="ppa-submit" className="btn-primary">
                  {submitting ? "Sending…" : "Request a site evaluation"}
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
