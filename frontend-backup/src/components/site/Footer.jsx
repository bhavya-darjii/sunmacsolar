import { Link } from "react-router-dom";
import { Sun, Mail, Phone, MapPin, Globe } from "lucide-react";
import { COMPANY, NAV } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-[#1C1917] text-[#F5F5F0] mt-12" data-testid="site-footer">
      <div className="container-page py-16 md:py-20 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5 space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#D97706] flex items-center justify-center">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display text-lg font-semibold">SunMac Solar</div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-[#A8A29E]">
                Powered by {COMPANY.parent}
              </div>
            </div>
          </Link>
          <p className="text-sm text-[#A8A29E] max-w-md">
            Commercial, residential and off-grid solar specialists across Australia. Engineered, installed and supported entirely in-house.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="overline text-[#A8A29E] mb-4">Explore</div>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-[#D97706] transition-colors">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4 space-y-3 text-sm">
          <div className="overline text-[#A8A29E] mb-4">Contact</div>
          <a href={`mailto:${COMPANY.email}`} className="flex items-start gap-3 hover:text-[#D97706]">
            <Mail className="w-4 h-4 mt-0.5 shrink-0" /> {COMPANY.email}
          </a>
          <a href={`https://${COMPANY.website}`} target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-[#D97706]" data-testid="footer-website-link">
            <Globe className="w-4 h-4 mt-0.5 shrink-0" /> {COMPANY.website}
          </a>
          <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="flex items-start gap-3 hover:text-[#D97706]">
            <Phone className="w-4 h-4 mt-0.5 shrink-0" /> {COMPANY.phone}
          </a>
          <div className="flex items-start gap-3 text-[#D6D3D1]">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" /> {COMPANY.address}
          </div>
          <div className="text-xs text-[#A8A29E] pt-3">
            ABN/ACN: {COMPANY.abn}
          </div>
        </div>
      </div>
      <div className="border-t border-[#292524]">
        <div className="container-page py-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-[#A8A29E]">
          <div>© {new Date().getFullYear()} {COMPANY.parent}. Trading as SunMac Solar.</div>
          <div>Clean energy. Built in Australia.</div>
        </div>
      </div>
    </footer>
  );
}
