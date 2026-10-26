import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  Sun,
  Battery,
  Zap,
  FileCheck,
  ShieldCheck,
  Activity,
  ArrowRight,
} from "lucide-react";

interface PackageFeature {
  text: string;
  icon: typeof Sun;
}

interface PackagePlan {
  id: string;
  badge?: {
    text: string;
    variant: "amber" | "soft";
  };
  name: string;
  subtitle: string;
  pricePrefix?: string;
  price: string;
  priceSuffix?: string;
  features: PackageFeature[];
  ctaText: string;
  ctaHref: string;
  featured?: boolean;
}

const PACKAGES: PackagePlan[] = [
  {
    id: "starter",
    badge: {
      text: "Most Popular",
      variant: "soft",
    },
    name: "Starter Commercial",
    subtitle: "Ideal for retail, workshops, and daytime commercial operations.",
    pricePrefix: "From",
    price: "$30,499",
    priceSuffix: "ex. GST",
    features: [
      { text: "30 kW Tier 1 monocrystalline solar array", icon: Sun },
      { text: "100 kWh Fox ESS modular battery storage", icon: Battery },
      { text: "Commercial string inverter (SMA / Fronius)", icon: Zap },
      { text: "Network connection & DNSP approval included", icon: FileCheck },
      { text: "Turnkey installation by accredited electricians", icon: ShieldCheck },
      { text: "12-month full workmanship warranty", icon: Activity },
    ],
    ctaText: "Request Starter Spec",
    ctaHref: "/contact?package=starter",
    featured: false,
  },
  {
    id: "growth",
    badge: {
      text: "Best Value",
      variant: "amber",
    },
    name: "Growth Commercial",
    subtitle: "High-capacity generation & storage for agribusiness & manufacturing.",
    pricePrefix: "From",
    price: "$69,999",
    priceSuffix: "ex. GST",
    features: [
      { text: "99 kW high-efficiency commercial rooftop array", icon: Sun },
      { text: "200 kWh Fox ESS modular battery storage bank", icon: Battery },
      { text: "3-phase smart inverter with cloud portal", icon: Zap },
      { text: "Structural engineering & council approvals", icon: FileCheck },
      { text: "In-house CEC team — zero sub-contractors", icon: ShieldCheck },
      { text: "5-year performance monitoring & annual check", icon: Activity },
    ],
    ctaText: "Request Growth Spec",
    ctaHref: "/contact?package=growth",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise Farm & Station",
    subtitle: "Megawatt-scale microgrids & off-grid irrigation power stations.",
    pricePrefix: "Tailored Engineering",
    price: "Custom Quote",
    priceSuffix: "Turnkey EPC",
    features: [
      { text: "250 kW+ ground-mount or shed rooftop array", icon: Sun },
      { text: "200 kWh+ containerised BESS architecture", icon: Battery },
      { text: "SCADA & automated generator integration", icon: Zap },
      { text: "Full grid connection & DNO engineering review", icon: FileCheck },
      { text: "Dedicated project manager & EPC handover", icon: ShieldCheck },
      { text: "Comprehensive O&M maintenance contract", icon: Activity },
    ],
    ctaText: "Talk to an Engineer",
    ctaHref: "/contact?package=enterprise",
    featured: false,
  },
];

export default function PackageShowcase() {
  return (
    <section
      className="package-showcase-section"
      data-testid="package-showcase"
      aria-label="Commercial solar and battery packages"
    >
      <div className="container-final">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal variant="rise">
            <h2 className="display-lead">
              Commercial solar & battery packages.{" "}
              <span className="font-semibold">Sized for your operation.</span>
            </h2>
          </Reveal>
          <Reveal variant="rise" delay={0.12}>
            <p className="mt-4 text-base md:text-lg text-[#57534e] leading-relaxed">
              Pre-engineered solar and battery systems designed for Australian operating conditions.
              Every installation is calibrated to your site’s demand curve.
            </p>
          </Reveal>
        </div>

        {/* 3 Package Cards */}
        <div className="package-grid" role="list">
          {PACKAGES.map((pkg, index) => {
            return (
              <div key={pkg.id} role="listitem">
                <Reveal variant="rise" delay={0.1 + index * 0.08} className="h-full">
                  <div className="package-card h-full">
                    <div>
                      {/* Badge slot */}
                      <div className="package-badge-slot">
                        {pkg.badge ? (
                          <span
                            className={`package-badge ${pkg.badge.variant === "amber"
                                ? "package-badge--amber"
                                : "package-badge--soft"
                              }`}
                          >
                            {pkg.badge.text}
                          </span>
                        ) : (
                          <span
                            className="text-xs font-semibold uppercase tracking-wider text-[#78716c]"
                            aria-hidden
                          >
                            Custom Engineering
                          </span>
                        )}
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="package-title">{pkg.name}</h3>
                      <p className="package-subtitle">{pkg.subtitle}</p>

                      {/* Price */}
                      <div className="package-price-wrap">
                        {pkg.pricePrefix && (
                          <div className="package-price-from">
                            {pkg.pricePrefix}
                          </div>
                        )}
                        <div className="package-price">{pkg.price}</div>
                        {pkg.priceSuffix && (
                          <div className="text-xs mt-1 text-[#78716c]">
                            {pkg.priceSuffix}
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <ul className="package-feature-list" role="list">
                        {pkg.features.map((feature, fIndex) => {
                          const Icon = feature.icon;
                          return (
                            <li key={fIndex} className="package-feature-item">
                              <Icon className="package-feature-icon" aria-hidden />
                              <span>{feature.text}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={pkg.ctaHref}
                      className={`package-cta-btn group ${pkg.featured
                          ? "package-cta-btn--primary"
                          : "package-cta-btn--secondary"
                        }`}
                    >
                      <span>{pkg.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
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
