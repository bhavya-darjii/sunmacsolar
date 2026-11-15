import Reveal from "@/components/Reveal";
import {
  Award,
  ShieldCheck,
  Zap,
  HardHat,
  BadgeCheck,
  FileCheck2,
} from "lucide-react";

interface CertBadge {
  id: string;
  abbr: string;
  name: string;
  body: string;
  icon: typeof Award;
  iconColor: string;
}

const CERTS: CertBadge[] = [
  {
    id: "cec-retailer",
    abbr: "CEC Retailer",
    name: "Approved Solar Retailer",
    body: "Clean Energy Council Code of Conduct signatory",
    icon: BadgeCheck,
    iconColor: "#d97706",
  },
  {
    id: "cec-installer",
    abbr: "CEC Installer",
    name: "Accredited Designer & Installer",
    body: "Commercial grid-connect & battery endorsements",
    icon: ShieldCheck,
    iconColor: "#d97706",
  },
  {
    id: "as-5033",
    abbr: "AS/NZS 5033",
    name: "PV Array Compliance",
    body: "Rigorous Australian safety & installation standards",
    icon: FileCheck2,
    iconColor: "#166534",
  },
  {
    id: "as-4777",
    abbr: "AS 4777.2:2020",
    name: "Grid Inverter Standard",
    body: "National DNSP network integration compliance",
    icon: Zap,
    iconColor: "#d97706",
  },
  {
    id: "worksafe-rec",
    abbr: "Licensed REC",
    name: "Registered Electrical Contractor",
    body: "In-house Master Electricians on every project",
    icon: HardHat,
    iconColor: "#1c1917",
  },
  {
    id: "iso-9001",
    abbr: "ISO 9001:2015",
    name: "Quality Management",
    body: "Audited quality control & project management",
    icon: Award,
    iconColor: "#d97706",
  },
];

export default function CertBadges() {
  return (
    <section
      className="cert-badges-section"
      data-testid="cert-badges"
      aria-label="Accreditations and Australian Standards"
    >
      <div className="container-final">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal variant="rise">
            <h2 className="display-lead">
              Certified. Compliant.{" "}
              <span className="font-semibold">Fully Accountable.</span>
            </h2>
          </Reveal>
          <Reveal variant="rise" delay={0.12}>
            <p className="mt-3 text-sm md:text-base text-[#57534e]">
              Every SunMac Solar installation is designed, signed off, and commissioned by
              CEC-accredited personnel to current Australian Standards.
            </p>
          </Reveal>
        </div>

        {/* 6 Badges Grid */}
        <div className="cert-badges-grid" role="list">
          {CERTS.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div key={cert.id} role="listitem">
                <Reveal variant="rise" delay={0.08 + index * 0.05} className="h-full">
                  <div className="cert-badge-card">
                    <div className="cert-badge-icon-wrap" aria-hidden>
                      <Icon
                        className="w-6 h-6"
                        style={{ color: cert.iconColor }}
                        strokeWidth={1.75}
                      />
                    </div>
                    <span className="cert-badge-abbr">{cert.abbr}</span>
                    <h3 className="cert-badge-name">{cert.name}</h3>
                    <p className="cert-badge-body">{cert.body}</p>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
