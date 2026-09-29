import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { api } from "@/lib/api";
import { COMPANY } from "@/data/site";

const SERVICE_OPTIONS = [
  { value: "", label: "What are you looking for?" },
  { value: "commercial", label: "Commercial solar & battery" },
  { value: "residential", label: "Residential solar & battery" },
  { value: "irrigation", label: "Solar irrigation pumps" },
  { value: "offgrid", label: "Off-grid system" },
  { value: "hvac", label: "Commercial HVAC / air conditioning" },
  { value: "ppa", label: "PPA / solar farm on my land" },
  { value: "other", label: "Other / general enquiry" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", location: "", service_type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e) => {
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
    <div data-testid="contact-page">
      <section className="container-page pt-20 md:pt-28 pb-12">
        <Reveal>
          <div className="overline text-[#D97706]">Contact</div>
          <h1 className="font-display font-light text-5xl sm:text-6xl tracking-tight mt-4 max-w-4xl">
            Talk to our engineering team.
          </h1>
          <p className="mt-6 text-lg text-[#57534E] max-w-2xl">
            Tell us a bit about your site and what you are trying to achieve. We will come back within 48 hours with a realistic system concept and quote.
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-24 grid md:grid-cols-12 gap-12">
        <Reveal className="md:col-span-7">
          <form onSubmit={onSubmit} className="bg-[#F5F5F0] border border-[#E7E5E4] rounded-3xl p-8 md:p-10 space-y-4" data-testid="contact-form">
            <div className="grid md:grid-cols-2 gap-4">
              <input required value={form.name} onChange={(e) => onChange("name", e.target.value)} placeholder="Full name" data-testid="contact-name" className="w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] outline-none focus:border-[#D97706]" />
              <input required type="email" value={form.email} onChange={(e) => onChange("email", e.target.value)} placeholder="Email" data-testid="contact-email" className="w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] outline-none focus:border-[#D97706]" />
              <input required value={form.phone} onChange={(e) => onChange("phone", e.target.value)} placeholder="Phone" data-testid="contact-phone" className="w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] outline-none focus:border-[#D97706]" />
              <input value={form.location} onChange={(e) => onChange("location", e.target.value)} placeholder="Site location (suburb, state)" data-testid="contact-location" className="w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] outline-none focus:border-[#D97706]" />
            </div>
            <select value={form.service_type} onChange={(e) => onChange("service_type", e.target.value)} data-testid="contact-service" className="w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] outline-none focus:border-[#D97706]">
              {SERVICE_OPTIONS.map((o) => <option key={o.value} value={o.value} disabled={o.value === ""}>{o.label}</option>)}
            </select>
            <textarea rows={5} value={form.message} onChange={(e) => onChange("message", e.target.value)} placeholder="Tell us about your project — daily energy use, roof or land available, existing system if any…" data-testid="contact-message" className="w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] outline-none focus:border-[#D97706] resize-none" />
            <button disabled={submitting} type="submit" data-testid="contact-submit" className="rounded-full bg-[#D97706] hover:bg-[#B45309] text-[#FDFBF7] px-7 py-3.5 font-medium transition-colors disabled:opacity-60">
              {submitting ? "Sending…" : "Send enquiry"}
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-5 space-y-6">
          <div className="bg-[#1C1917] text-[#FDFBF7] rounded-3xl p-8">
            <div className="overline text-[#FBBF24]">Office</div>
            <div className="mt-4 space-y-4 text-sm">
              <a href={`mailto:${COMPANY.email}`} className="flex items-start gap-3 hover:text-[#FBBF24]" data-testid="contact-email-link"><Mail className="w-4 h-4 mt-0.5" /> {COMPANY.email}</a>
              <a href={`https://${COMPANY.website}`} target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-[#FBBF24]" data-testid="contact-website-link"><Globe className="w-4 h-4 mt-0.5" /> {COMPANY.website}</a>
              <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="flex items-start gap-3 hover:text-[#FBBF24]" data-testid="contact-phone-link"><Phone className="w-4 h-4 mt-0.5" /> {COMPANY.phone}</a>
              <div className="flex items-start gap-3 text-[#D6D3D1]"><MapPin className="w-4 h-4 mt-0.5" /> {COMPANY.address}</div>
            </div>
            <div className="mt-6 pt-6 border-t border-[#292524] text-xs text-[#A8A29E]">
              <div>{COMPANY.parent}</div>
              <div>ABN/ACN: {COMPANY.abn}</div>
            </div>
          </div>

          <div className="bg-[#F5F5F0] border border-[#E7E5E4] rounded-3xl p-8">
            <div className="overline text-[#D97706]">Hours</div>
            <div className="mt-3 text-sm text-[#57534E] space-y-1">
              <div>Mon — Fri: 8:00am — 5:30pm</div>
              <div>Sat: by appointment</div>
              <div>Sun: closed</div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
