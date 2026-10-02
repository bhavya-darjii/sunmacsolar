import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import NavPillMenu from "@/components/site/NavPillMenu";
import { NAV } from "@/data/site";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const router = useRouter();
  const pathname = router.asPath.split("?")[0];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  /** 0 = fully visible, 1 = hidden (driven by footer intersection) */
  const [footerHideT, setFooterHideT] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector('[data-testid="site-footer"]');
    if (!footer) return;

    /** Only the lower half of the viewport counts — header hides closer to the footer */
    const hideAtRatio = 0.35;
    const thresholds = [
      0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
    ];

    const bottomInsetPx = () => Math.round(window.innerHeight * 0.5);

    let observer: IntersectionObserver | null = null;

    const attach = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            setFooterHideT(0);
            return;
          }
          const t = Math.min(1, entry.intersectionRatio / hideAtRatio);
          setFooterHideT(t);
        },
        {
          rootMargin: `0px 0px -${bottomInsetPx()}px 0px`,
          threshold: thresholds,
        }
      );
      observer.observe(footer);
    };

    attach();
    window.addEventListener("resize", attach, { passive: true });
    return () => {
      window.removeEventListener("resize", attach);
      observer?.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      data-testid="site-header"
      style={{
        transform: `translate3d(0, ${-footerHideT * 100}%, 0)`,
        opacity: 1 - footerHideT,
      }}
      className={cn(
        "sticky top-0 z-50 will-change-[transform,opacity]",
        "transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        footerHideT >= 0.98 && "pointer-events-none",
        scrolled
          ? "border-b border-[#e7e5e4]/90 bg-[#fdfbf7]/92 backdrop-blur-xl shadow-sm"
          : "border-b border-transparent bg-[#fdfbf7]"
      )}
    >
      <div className="container-final flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link href="/" className="flex min-w-0 items-center gap-3" data-testid="header-logo">
          <Image
            src="/logo/sunmac-solar-icon.png"
            alt="SunMac Solar"
            width={36}
            height={36}
            className="shrink-0 rounded-full"
          />
          <div className="min-w-0 leading-tight">
            <div className="truncate font-display text-base font-semibold tracking-tight text-[#1c1917] md:text-lg">
              SunMac Solar
            </div>
            <div className="hidden text-[10px] tracking-[0.18em] text-[#78716c] uppercase sm:block">
              Ecomac Energy
            </div>
          </div>
        </Link>

        <NavPillMenu
          pathname={pathname}
          variant="site"
          className="hidden lg:flex"
        />

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            data-testid="header-get-quote-btn"
            className="hidden rounded-full bg-[#1c1917] px-5 py-2.5 text-sm font-medium text-[#fdfbf7] transition-colors hover:bg-[#d97706] sm:inline-flex"
          >
            Get a quote
          </Link>
          <button
            type="button"
            className="rounded-full border border-[#e7e5e4] p-2 lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            data-testid="mobile-menu-toggle"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="border-t border-[#e7e5e4] bg-[#fdfbf7] lg:hidden"
          data-testid="mobile-menu"
        >
          <div className="container-final flex flex-col gap-1 py-4">
            {NAV.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-medium",
                    isActive
                      ? "bg-[#1c1917] text-[#fdfbf7]"
                      : "text-[#1c1917] hover:bg-[#f5f5f0]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/contact" className="btn-primary mt-2 text-center" data-testid="mobile-get-quote-btn">
              Get a quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
