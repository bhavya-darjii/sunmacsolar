import Link from "next/link";
import Reveal from "@/components/Reveal";
import FooterAustraliaFlags from "@/components/site/FooterAustraliaFlags";
import { COMPANY, NAV } from "@/data/site";

const EXPLORE_LINKS = NAV.filter((n) => n.href !== "/").map((n) => ({
  label: n.label,
  href: n.href,
}));

const exploreSplit = Math.ceil(EXPLORE_LINKS.length / 2);
const EXPLORE_COL_1 = EXPLORE_LINKS.slice(0, exploreSplit);
const EXPLORE_COL_2 = EXPLORE_LINKS.slice(exploreSplit);

const CONTACT_LINKS = [
  { label: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/\s/g, "")}` },
  { label: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { label: "Request a quote", href: "/contact" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: COMPANY.partner.name, href: COMPANY.partner.url },
  { label: `ABN ${COMPANY.abn}`, href: "/about" },
];

function FooterLinkList({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  return (
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-sm text-white/70 transition hover:text-white"
            {...(link.href.startsWith("http")
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function SiteFooter() {
  return (
    <footer
      data-testid="site-footer"
      className="flex min-h-dvh flex-col bg-black text-[#fdfbf7]"
    >
      <div className="container-final shrink-0 pt-6 md:pt-8">
        <Reveal>
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-10">
            <p className="footer-tagline font-display font-light lg:max-w-sm">
              <span className="block text-white">Clean energy.</span>
              <span className="block text-white/40">Built in Australia.</span>
            </p>

            <div className="mx-auto w-full max-w-md text-center lg:max-w-lg">
              <p className="text-[11px] font-semibold tracking-[0.12em] text-white/45 uppercase">
                Explore
              </p>
              <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-left sm:gap-x-12">
                <FooterLinkList links={EXPLORE_COL_1} />
                <FooterLinkList links={EXPLORE_COL_2} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:gap-10 lg:justify-self-end lg:text-left">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.12em] text-white/45 uppercase">
                  Contact
                </p>
                <div className="mt-4">
                  <FooterLinkList links={CONTACT_LINKS} />
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.12em] text-white/45 uppercase">
                  Company
                </p>
                <div className="mt-4">
                  <FooterLinkList links={COMPANY_LINKS} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="footer-sunmac-wrap w-full shrink-0 overflow-hidden px-0">
        <Reveal delay={0.08}>
          <p
            className="footer-word footer-word--compact text-center text-white"
            aria-hidden
          >
            SunMac
          </p>
        </Reveal>
      </div>

      <div className="min-h-0 flex-1" aria-hidden />

      <div className="shrink-0">
        <div className="container-final flex min-h-[48px] items-center justify-between gap-4 py-3 text-xs text-white/45">
          <span>
            © {new Date().getFullYear()} {COMPANY.parent}. Trading as SunMac Solar.
          </span>

          <FooterAustraliaFlags />
        </div>
      </div>
    </footer>
  );
}
