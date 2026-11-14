import Link from "next/link";
import { useEffect, useRef } from "react";
import Reveal from "@/components/Reveal";
import FooterAustraliaFlags from "@/components/site/FooterAustraliaFlags";
import { COMPANY, NAV } from "@/data/site";
import { useHysteresisInView } from "@/hooks/use-hysteresis-in-view";
import { cn } from "@/lib/utils";

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
    <ul>
      {links.map((link) => (
        <li key={link.label}>
          {/* Padding instead of list spacing: same 28px rhythm, but a taller tap target */}
          <Link
            href={link.href}
            className="block w-fit py-1 text-sm text-white/70 transition hover:text-white"
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
  const footerRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  // With Reduce motion on, home.css keeps the word white and skips the fade
  const wordShown = useHysteresisInView(wordRef, { amount: 0.12 });

  // While the footer is on screen (globals.css): black page background and no bounce past the
  // end of the page.
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const root = document.documentElement;
    const observer = new IntersectionObserver(([entry]) => {
      root.classList.toggle("footer-in-view", entry.isIntersecting);
    });
    observer.observe(footer);
    return () => {
      observer.disconnect();
      root.classList.remove("footer-in-view");
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      data-testid="site-footer"
      // Height and top padding come from .site-footer (home.css): taller than the screen on
      // phones, so nothing white is left above it at the end of the page.
      className="site-footer flex flex-col bg-black text-[#fdfbf7]"
    >
      <div className="container-final shrink-0 pt-6 md:pt-8">
        <Reveal>
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-10">
            <p className="footer-tagline font-display font-light lg:max-w-sm">
              <span className="block text-white">Clean energy.</span>
              <span className="block text-white/40">Built in Australia.</span>
            </p>

            <div className="w-full lg:mx-auto lg:max-w-lg lg:text-center">
              <p className="text-[11px] font-semibold tracking-[0.12em] text-white/45 uppercase">
                Explore
              </p>
              <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 text-left sm:gap-x-12">
                <FooterLinkList links={EXPLORE_COL_1} />
                <FooterLinkList links={EXPLORE_COL_2} />
              </div>
            </div>

            {/* Phones: wrap instead of a fixed 2-col grid, the email address is wider than half of a 360–375px screen */}
            <div className="flex flex-wrap gap-8 sm:grid sm:grid-cols-2 sm:gap-10 lg:justify-self-end lg:text-left">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.12em] text-white/45 uppercase">
                  Contact
                </p>
                <div className="mt-3">
                  <FooterLinkList links={CONTACT_LINKS} />
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.12em] text-white/45 uppercase">
                  Company
                </p>
                <div className="mt-3">
                  <FooterLinkList links={COMPANY_LINKS} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/*
        The word fades in by colour, from black (invisible on the black footer) to white. A colour
        change is repainted in place, so the word is always drawn like the rest of the page. Do not
        animate its opacity or transform, cover it with an animated element, or position this
        wrapper: each of those puts the word on a separate layer while the footer's other entrance
        animation runs, and Windows draws text on such a layer with lighter smoothing, so the word
        visibly thickens a moment later.
      */}
      <div ref={wordRef} className="footer-sunmac-wrap w-full min-h-0 flex-1 overflow-hidden px-0">
        <p
          className={cn(
            "footer-word footer-word--compact text-center",
            wordShown ? "text-white" : "text-black"
          )}
          aria-hidden
        >
          SunMac
        </p>
      </div>

      <div className="shrink-0 pb-[env(safe-area-inset-bottom)]">
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
