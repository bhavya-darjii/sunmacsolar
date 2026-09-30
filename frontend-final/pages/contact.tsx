import { useState } from "react";
import Head from "next/head";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import Reveal from "@/components/Reveal";
import PageIntro from "@/components/site/PageIntro";
import { api } from "@/lib/api";
import ContactFeaturedForm from "@/components/contact/ContactFeaturedForm";
import { CONTACT_SERVICE_OPTIONS } from "@/data/contact";
import { COMPANY } from "@/data/site";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    service_type: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/leads", form);
      toast.success("Thanks — we'll be in touch within 48 hours.");
      setForm({ name: "", email: "", phone: "", location: "", service_type: "", message: "" });
    } catch {
      toast.error("Could not send. Please email info@sunmacsolar.com.au.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Our Engineering Team | SunMac Solar</title>
        <meta
          name="description"
          content="Request a realistic concept and quote within 48 hours for your commercial, regional, or off-grid solar installation."
        />
      </Head>
      <div data-testid="contact-page">
        <PageIntro
          overline="Contact"
          title="Talk to our engineering team."
          description="Tell us a bit about your site and what you are trying to achieve. We will come back within 48 hours with a realistic system concept and quote."
        />

        <section className="container-final grid gap-12 pb-24 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <form
              onSubmit={onSubmit}
              className="space-y-4 rounded-[var(--radius-card)] border border-[#e7e5e4] bg-[#f5f5f0] p-8 md:p-10"
              data-testid="contact-form"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  required
                  value={form.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  placeholder="Full name"
                  data-testid="contact-name"
                  className="input-final"
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  placeholder="Email"
                  data-testid="contact-email"
                  className="input-final"
                />
                <input
                  required
                  value={form.phone}
                  onChange={(e) => onChange("phone", e.target.value)}
                  placeholder="Phone"
                  data-testid="contact-phone"
                  className="input-final"
                />
                <input
                  value={form.location}
                  onChange={(e) => onChange("location", e.target.value)}
                  placeholder="Site location (suburb, state)"
                  data-testid="contact-location"
                  className="input-final"
                />
              </div>
              <select
                value={form.service_type}
                onChange={(e) => onChange("service_type", e.target.value)}
                data-testid="contact-service"
                className="input-final"
              >
                {CONTACT_SERVICE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value} disabled={o.value === ""}>
                    {o.label}
                  </option>
                ))}
              </select>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => onChange("message", e.target.value)}
                placeholder="Tell us about your project — daily energy use, roof or land available, existing system if any…"
                data-testid="contact-message"
                className="input-final resize-none"
              />
              <button disabled={submitting} type="submit" data-testid="contact-submit" className="btn-primary">
                {submitting ? "Sending…" : "Send enquiry"}
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="space-y-6 md:col-span-5">
            <div className="rounded-[var(--radius-card)] bg-[#1c1917] p-8 text-[#fdfbf7]">
              <p className="text-[11px] font-bold tracking-[0.2em] text-[#fbbf24] uppercase">Office</p>
              <div className="mt-4 space-y-4 text-sm">
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-start gap-3 hover:text-[#fbbf24]"
                  data-testid="contact-email-link"
                >
                  <Mail className="mt-0.5 h-4 w-4" /> {COMPANY.email}
                </a>
                <a
                  href={`https://${COMPANY.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 hover:text-[#fbbf24]"
                  data-testid="contact-website-link"
                >
                  <Globe className="mt-0.5 h-4 w-4" /> {COMPANY.website}
                </a>
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-3 hover:text-[#fbbf24]"
                  data-testid="contact-phone-link"
                >
                  <Phone className="mt-0.5 h-4 w-4" /> {COMPANY.phone}
                </a>
                <div className="flex items-start gap-3 text-[#d6d3d1]">
                  <MapPin className="mt-0.5 h-4 w-4" /> {COMPANY.address}
                </div>
              </div>
              <div className="mt-6 border-t border-[#292524] pt-6 text-xs text-[#a8a29e]">
                <div>{COMPANY.parent}</div>
                <div>ABN/ACN: {COMPANY.abn}</div>
              </div>
            </div>

            <div className="rounded-[var(--radius-card)] border border-[#e7e5e4] bg-[#f5f5f0] p-8">
              <p className="overline">Hours</p>
              <div className="mt-3 space-y-1 text-sm text-[#57534e]">
                <div>Mon — Fri: 8:00 a.m. — 5:30 p.m.</div>
                <div>Sat: by appointment</div>
                <div>Sun: closed</div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="container-final border-t border-[#e7e5e4] pb-24">
          <Reveal>
            <ContactFeaturedForm />
          </Reveal>
        </section>
      </div>
    </>
  );
}
