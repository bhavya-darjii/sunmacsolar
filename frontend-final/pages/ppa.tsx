import { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowUpRight,
  Check,
  DollarSign,
  FileText,
  Loader2,
  Map,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import PageIntro from "@/components/site/PageIntro";
import {
  featuredFormFieldClass,
  featuredFormLabelClass,
  featuredFormMessageFieldClass,
} from "@/components/forms/featuredFormStyles";
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
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const onChange = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      await api.post("/ppa-inquiries", {
        ...form,
        land_size_acres: form.land_size_acres ? parseFloat(form.land_size_acres) : null,
      });
      setSubmitStatus("success");
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
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch {
      setSubmitStatus("error");
      toast.error("Could not send inquiry. Please try again or email info@sunmacsolar.com.au.");
      setTimeout(() => setSubmitStatus("idle"), 5000);
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
              <h2 className="display-lead mt-4 max-w-3xl">
                <span className="font-semibold">No capital, no operations, no risk.</span>
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
              <h3 className="display-lead mt-4">
                <span className="font-semibold">Does your land qualify?</span>
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
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="contact-featured-form-bg overflow-hidden rounded-3xl border border-[#ffffff]/10 p-8 shadow-2xl shadow-black/60 md:p-12 lg:p-16"
              >
                <form
                  onSubmit={onSubmit}
                  className="contact-featured-form space-y-8 sm:space-y-10"
                  data-testid="ppa-form"
                >
                  <div className="space-y-3">
                    <p className="text-xl font-bold uppercase tracking-wide text-[#ffffff] sm:text-2xl md:text-3xl">
                      Free site evaluation
                    </p>
                    <p className="max-w-2xl text-base font-bold leading-relaxed text-[#ffffff] md:text-lg">
                      Tell us about your land. Our PPA team will review your site and be in touch within
                      2 business days.
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
                    <label className="block space-y-2">
                      <span className={featuredFormLabelClass}>Full name</span>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => onChange("name", e.target.value)}
                        placeholder="Your name"
                        data-testid="ppa-name"
                        className={featuredFormFieldClass}
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className={featuredFormLabelClass}>Email</span>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => onChange("email", e.target.value)}
                        placeholder="you@company.com"
                        data-testid="ppa-email"
                        className={featuredFormFieldClass}
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className={featuredFormLabelClass}>Phone</span>
                      <input
                        required
                        value={form.phone}
                        onChange={(e) => onChange("phone", e.target.value)}
                        placeholder="Best number to reach you"
                        data-testid="ppa-phone"
                        className={featuredFormFieldClass}
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className={featuredFormLabelClass}>Land size (acres)</span>
                      <input
                        value={form.land_size_acres}
                        onChange={(e) => onChange("land_size_acres", e.target.value)}
                        type="number"
                        step="0.1"
                        placeholder="e.g. 40"
                        data-testid="ppa-acres"
                        className={featuredFormFieldClass}
                      />
                    </label>
                  </div>

                  <label className="block space-y-2">
                    <span className={featuredFormLabelClass}>Land location</span>
                    <input
                      required
                      value={form.land_location}
                      onChange={(e) => onChange("land_location", e.target.value)}
                      placeholder="Suburb, state"
                      data-testid="ppa-location"
                      className={featuredFormFieldClass}
                    />
                  </label>

                  <label className="group flex cursor-pointer items-start gap-4">
                    <input
                      type="checkbox"
                      checked={form.has_grid_connection}
                      onChange={(e) => onChange("has_grid_connection", e.target.checked)}
                      data-testid="ppa-grid"
                      className="peer sr-only focus:outline-none"
                    />
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-[#ffffff]/35 bg-transparent transition-colors group-hover:border-[#ffffff]/55 peer-checked:border-[#ffffff] peer-checked:bg-[#ffffff] peer-checked:[&_svg]:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-[#ffffff]/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#000000]"
                      aria-hidden
                    >
                      <Check
                        className="h-3.5 w-3.5 text-[#000000] opacity-0 transition-opacity"
                        strokeWidth={3}
                      />
                    </span>
                    <span className="text-sm font-bold leading-snug text-[#ffffff]">
                      Power lines are nearby (within 5km)
                    </span>
                  </label>

                  <label className="block space-y-2">
                    <span className={featuredFormLabelClass}>Additional details</span>
                    <textarea
                      rows={1}
                      value={form.notes}
                      onChange={(e) => onChange("notes", e.target.value)}
                      placeholder="Access roads, current land use, grid connection notes…"
                      data-testid="ppa-notes"
                      className={featuredFormMessageFieldClass}
                    />
                  </label>

                  <div className="flex min-h-[3.5rem] items-center sm:min-h-[4rem] md:h-20">
                    {submitStatus === "success" ? (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl font-bold text-[#ffffff] sm:text-2xl md:text-3xl"
                      >
                        Sent — our PPA team will be in touch within 2 business days.
                      </motion.p>
                    ) : submitStatus === "error" ? (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-lg font-bold text-[#ffffff] sm:text-xl md:text-2xl"
                      >
                        Something went wrong. Please try again or email us directly.
                      </motion.p>
                    ) : (
                      <button
                        type="submit"
                        disabled={submitting}
                        className="group flex items-center gap-2 text-2xl font-bold text-[#ffffff] transition-opacity hover:opacity-80 disabled:opacity-50 sm:gap-3 sm:text-3xl md:text-4xl"
                        data-testid="ppa-submit"
                      >
                        {submitting ? (
                          <>
                            Sending…
                            <Loader2 className="h-6 w-6 animate-spin sm:h-8 sm:w-8 md:h-9 md:w-9" />
                          </>
                        ) : (
                          <>
                            Request a site evaluation
                            <ArrowUpRight
                              className="h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-8 sm:w-8 md:h-9 md:w-9"
                            />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
