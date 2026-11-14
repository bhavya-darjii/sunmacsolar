import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import { COMPANY, NAV } from "@/data/site";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  pathname: string;
  /** "home" sits on the dark hero photo; "site" sits on the white sticky header. */
  variant: "home" | "site";
  /** Frosted-glass trigger with a white icon, for a "site" header floating over a photo. */
  glass?: boolean;
  /** Viewport width (px) at which the desktop pill nav takes over and this menu closes. */
  closeAt: number;
  className?: string;
  "data-testid"?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

const noopSubscribe = () => () => {};

/** True after hydration (portals need document.body), without a setState-in-effect. */
function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

/**
 * Hamburger button + full-screen menu for phones and small tablets.
 * The sheet is portalled to <body> because both headers use transforms, which
 * would otherwise turn `position: fixed` into "fixed to the header".
 */
export default function MobileNav({
  pathname,
  variant,
  glass = false,
  closeAt,
  className,
  "data-testid": testId = "mobile-menu-toggle",
}: MobileNavProps) {
  // Remember which page the menu was opened on: any navigation (link tap,
  // back/forward) changes the path, which closes the menu with no extra effect.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  if (openOnPath !== null && openOnPath !== pathname) {
    // Drop the stale path so Back-then-Forward doesn't reopen the menu.
    setOpenOnPath(null);
  }
  const open = openOnPath === pathname;
  const isClient = useIsClient();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const panelId = useId();

  const close = useCallback(() => setOpenOnPath(null), []);

  // Rotating a tablet to landscape can reveal the desktop nav: close the sheet.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia(`(min-width: ${closeAt}px)`);
    const onChange = () => {
      if (mq.matches) setOpenOnPath(null);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open, closeAt]);

  // While open: lock page scroll, close on Escape, keep Tab focus inside the sheet.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const trigger = triggerRef.current;
    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenOnPath(null);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  const telHref = `tel:${COMPANY.phone.replace(/\s/g, "")}`;
  const isHome = variant === "home";

  const sheet = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-nav-sheet"
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-testid="mobile-menu"
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto overscroll-contain bg-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] text-[#1c1917]"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -12 }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease }}
        >
          {/* Top row mirrors the header that opened it, so the close button lands where the hamburger was. */}
          <div
            className={cn(
              "container-final flex shrink-0 items-center justify-between gap-4",
              isHome ? "pt-6 pb-2 md:pt-8" : "h-16 md:h-[4.5rem]"
            )}
          >
            <Link href="/" onClick={close} className="flex min-w-0 items-center gap-3">
              <Image
                src="/logo/sunmac-solar-icon.png"
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 shrink-0 rounded-full"
              />
              <span className="truncate font-display text-base font-semibold tracking-tight">
                SunMac Solar
              </span>
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close menu"
              data-testid="mobile-menu-close"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e7e5e4] bg-white transition-colors hover:border-[#d6d3d1]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Primary" className="container-final flex flex-1 flex-col pt-4 pb-8">
            <ul className="border-t border-[#e7e5e4]">
              {NAV.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <motion.li
                    key={item.href}
                    className="border-b border-[#e7e5e4]"
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: reduceMotion ? 0 : 0.04 + i * 0.03, ease }}
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                      className={cn(
                        "flex min-h-14 items-center justify-between gap-4 py-2 font-display text-[1.625rem] font-medium tracking-tight transition-colors",
                        active ? "text-[#d97706]" : "text-[#1c1917] hover:text-[#d97706]"
                      )}
                    >
                      {item.label}
                      {active && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-[#d97706]" aria-hidden />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-auto space-y-5 pt-8">
              <Link
                href="/contact"
                onClick={close}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#d97706] px-7 py-4 text-base font-medium text-[#fdfbf7] transition-colors hover:bg-[#b45309]"
                data-testid="mobile-get-quote-btn"
              >
                Request a free quote <ArrowUpRight className="h-4 w-4" />
              </Link>
              <div className="flex flex-col gap-1 text-sm text-[#57534e]">
                <a href={telHref} className="inline-flex min-h-10 items-center gap-2.5 hover:text-[#d97706]">
                  <Phone className="h-4 w-4 shrink-0 text-[#d97706]" /> {COMPANY.phone}
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="inline-flex min-h-10 items-center gap-2.5 hover:text-[#d97706]"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#d97706]" /> {COMPANY.email}
                </a>
              </div>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpenOnPath(pathname)}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        data-testid={testId}
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors",
          isHome || glass
            ? "glass-surface nav-pill-shadow text-white"
            : "border border-[#e7e5e4] bg-white text-[#1c1917] hover:border-[#d6d3d1]",
          className
        )}
      >
        <Menu className="h-5 w-5" />
      </button>
      {isClient && createPortal(sheet, document.body)}
    </>
  );
}
