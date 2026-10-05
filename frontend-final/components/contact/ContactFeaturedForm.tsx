import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { CONTACT_SERVICE_PILLS } from "@/data/contact";
import GlideSelect from "@/components/ui/GlideSelect";
import ContactOfficeHoursBento from "@/components/contact/ContactOfficeHoursBento";

const fieldClass =
  "w-full border-b-2 border-[#ffffff]/35 bg-transparent px-1 py-2 font-bold text-[#ffffff] outline-none placeholder:font-bold placeholder:text-[#ffffff]/55 focus:border-[#ffffff]";

const messageFieldClass =
  `${fieldClass} min-h-[2.75rem] resize-y max-h-40 leading-snug`;

const labelClass =
  "text-sm font-bold tracking-wide text-[#ffffff] uppercase";

const GLIDE_SURFACE = "#000000";
const GLIDE_HIGHLIGHT = "#e7e5e4";
const GLIDE_TEXT = "#000000";
const GLIDE_ACCENT = "#000000";

const SERVICE_GLIDE_OPTIONS = CONTACT_SERVICE_PILLS.map((o) => ({
  value: o.value,
  label: o.label,
}));

export default function ContactFeaturedForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    service_type: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const onChange = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      await api.post("/leads", form);
      setSubmitStatus("success");
      toast.success("Thanks — we'll be in touch within 48 hours.");
      setForm({
        name: "",
        email: "",
        phone: "",
        location: "",
        service_type: "",
        message: "",
      });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch {
      setSubmitStatus("error");
      toast.error("Could not send. Please email info@sunmacsolar.com.au.");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="px-0 pt-4 pb-10 md:pt-6 md:pb-14" data-testid="contact-featured-form-section">
      <div className="mx-auto max-w-5xl">
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
            data-testid="contact-form"
          >
            <div className="space-y-3">
              <p className="text-xl font-bold uppercase tracking-wide text-[#ffffff] sm:text-2xl md:text-3xl">
                Request a quote
              </p>
              <p className="max-w-2xl text-base font-bold leading-relaxed text-[#ffffff] md:text-lg">
                Share your site details and what you are trying to achieve. Our team will respond
                within 48 hours with a realistic system concept.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
              <label className="block space-y-2">
                <span className={labelClass}>Full name</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  placeholder="Your name"
                  data-testid="contact-name"
                  className={fieldClass}
                />
              </label>
              <label className="block space-y-2">
                <span className={labelClass}>Email</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  placeholder="you@company.com"
                  data-testid="contact-email"
                  className={fieldClass}
                />
              </label>
              <label className="block space-y-2">
                <span className={labelClass}>Phone</span>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => onChange("phone", e.target.value)}
                  placeholder="Best number to reach you"
                  data-testid="contact-phone"
                  className={fieldClass}
                />
              </label>
              <label className="block space-y-2">
                <span className={labelClass}>Site location</span>
                <input
                  value={form.location}
                  onChange={(e) => onChange("location", e.target.value)}
                  placeholder="Suburb, state"
                  data-testid="contact-location"
                  className={fieldClass}
                />
              </label>
            </div>

            <div className="space-y-3">
              <p className={labelClass}>What are you looking for?</p>
              <div data-testid="contact-service">
                <GlideSelect
                  className="glide-select--glass glide-select--matched-width"
                  options={SERVICE_GLIDE_OPTIONS}
                  value={form.service_type}
                  onChange={(value) => onChange("service_type", value)}
                  placeholder="What are you looking for?"
                  showTags={false}
                  accentColor={GLIDE_ACCENT}
                  surfaceColor={GLIDE_SURFACE}
                  highlightColor={GLIDE_HIGHLIGHT}
                  textColor={GLIDE_TEXT}
                  size="lg"
                  radius={10}
                  menuWidth={400}
                  placement="bottom"
                  align="left"
                  popDuration={180}
                  glideDuration={220}
                  rememberPosition
                  ariaLabel="Service type"
                />
              </div>
            </div>

            <label className="block space-y-2">
              <span className={labelClass}>Project details</span>
              <textarea
                rows={1}
                value={form.message}
                onChange={(e) => onChange("message", e.target.value)}
                placeholder="Daily energy use, roof or land available, existing system if any…"
                data-testid="contact-message"
                className={messageFieldClass}
              />
            </label>

            <div className="flex min-h-[3.5rem] items-center sm:min-h-[4rem] md:h-20">
              {submitStatus === "success" ? (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl font-bold text-[#ffffff] sm:text-2xl md:text-3xl"
                >
                  Sent — we&apos;ll be in touch within 48 hours.
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
                  data-testid="contact-submit"
                >
                  {submitting ? (
                    <>
                      Sending…
                      <Loader2 className="h-6 w-6 animate-spin sm:h-8 sm:w-8 md:h-9 md:w-9" />
                    </>
                  ) : (
                    <>
                      Send enquiry
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
        <ContactOfficeHoursBento />
      </div>
    </section>
  );
}
