import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavPillMenu from "@/components/site/NavPillMenu";
import MobileNav from "@/components/site/MobileNav";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  /**
   * The page opens on a full-bleed photo (project pages): the header floats over it, transparent
   * with white text, a see-through menu (no blur) and a white "Get a quote" button, and turns into
   * the normal white header as soon as the page scrolls.
   */
  overlay?: boolean;
};

/** The header starts to leave when the footer's top edge is this far down the screen (0–1)... */
const HIDE_START = 0.5;
/** ...and is fully gone by the time the footer's top edge reaches here */
const HIDE_END = 0.15;
/** Same length as the header's own transform/opacity transition */
const PARK_DELAY_MS = 500;

export default function SiteHeader({ overlay = false }: SiteHeaderProps) {
  const router = useRouter();
  const pathname = router.asPath.split("?")[0];
  const [scrolled, setScrolled] = useState(false);
  /** 0 = fully visible, 1 = hidden (driven by how far up the screen the footer has come) */
  const [footerHideT, setFooterHideT] = useState(0);
  /** True once the header has finished sliding away: see `isParked` below */
  const [parked, setParked] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);

      const footer = document.querySelector('[data-testid="site-footer"]');
      if (!footer) {
        setFooterHideT(0);
        return;
      }
      // Measured from the footer's top edge, not from how much of the footer is on screen, so a
      // footer taller than the screen (small or landscape phones) still hides the header fully.
      const viewportH = window.innerHeight;
      const top = footer.getBoundingClientRect().top;
      const t = (HIDE_START * viewportH - top) / ((HIDE_START - HIDE_END) * viewportH);
      setFooterHideT(Math.round(Math.min(1, Math.max(0, t)) * 100) / 100);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    // The footer also moves when the page changes height without a scroll (the project filters)
    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
    resizeObserver?.observe(document.body);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resizeObserver?.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const hidden = footerHideT >= 0.98;

  useEffect(() => {
    if (!hidden) return;
    const id = window.setTimeout(() => setParked(true), PARK_DELAY_MS);
    return () => {
      window.clearTimeout(id);
      setParked(false);
    };
  }, [hidden]);

  /*
   * Parked = hidden and finished animating. iOS Safari paints the zone behind its status bar in
   * the colour of whatever is pinned (sticky or fixed) to the top edge, even when that element is
   * transparent or translated off screen, so a hidden white header leaves a white strip above the
   * black footer. Once hidden, the header stops being pinned: sticky becomes relative and fixed
   * becomes absolute. Both keep the same space in the page flow, so nothing shifts.
   */
  const isParked = hidden && parked;

  /** Floating over the photo: transparent bar, white text, see-through menu, white quote button */
  const overPhoto = overlay && !scrolled;

  return (
    <header
      data-testid="site-header"
      data-parked={isParked ? "" : undefined}
      style={{
        transform: `translate3d(0, ${-footerHideT * 100}%, 0)`,
        opacity: 1 - footerHideT,
      }}
      className={cn(
        // The background runs up behind the status bar; the content stays below it
        "z-50 pt-[env(safe-area-inset-top)] will-change-[transform,opacity]",
        "transition-[transform,opacity,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        overlay
          ? isParked
            ? "absolute inset-x-0 top-0"
            : "fixed inset-x-0 top-0"
          : isParked
            ? "relative"
            : "sticky top-0",
        isParked && "invisible",
        hidden && "pointer-events-none",
        overPhoto
          ? "border-b border-transparent bg-transparent"
          : scrolled
            ? "border-b border-[#e7e5e4]/90 bg-white/92 shadow-sm backdrop-blur-xl"
            : "border-b border-transparent bg-white"
      )}
    >
      <div className="container-final flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link href="/" className="flex min-w-0 items-center gap-3" data-testid="header-logo">
          <Image
            src="/logo/sunmac-solar-icon.png"
            alt="SunMac Solar"
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-full"
          />
          <div className="min-w-0 leading-tight">
            <div
              className={cn(
                "truncate font-display text-base font-semibold tracking-tight transition-colors duration-300 md:text-lg",
                overPhoto ? "text-white" : "text-[#1c1917]"
              )}
            >
              SunMac Solar
            </div>
            <div
              className={cn(
                "hidden text-[10px] tracking-[0.18em] uppercase transition-colors duration-300 sm:block",
                overPhoto ? "text-white/65" : "text-[#78716c]"
              )}
            >
              Ecomac Energy
            </div>
          </div>
        </Link>

        <NavPillMenu
          pathname={pathname}
          variant={overPhoto ? "home" : "site"}
          className={cn("hidden lg:flex", overPhoto && "glass-surface--clear")}
        />

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            data-testid="header-get-quote-btn"
            className={cn(
              "hidden rounded-full px-5 py-2.5 text-sm font-medium transition-colors sm:inline-flex",
              overPhoto
                ? "header-quote-light"
                : "bg-[#1c1917] text-[#fdfbf7] hover:bg-[#d97706]"
            )}
          >
            Get a quote
          </Link>
          <MobileNav
            pathname={pathname}
            variant="site"
            glass={overPhoto}
            closeAt={1024}
            className={cn("lg:hidden", overPhoto && "glass-surface--clear")}
          />
        </div>
      </div>
    </header>
  );
}
