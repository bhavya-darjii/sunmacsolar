"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { NAV } from "@/data/site";
import { cn } from "@/lib/utils";

type NavPillMenuProps = {
  pathname: string;
  variant: "home" | "site";
  className?: string;
};

type BlobRect = {
  left: number;
  width: number;
  height: number;
  visible: boolean;
};

const BLOB_SPRING = {
  type: "spring" as const,
  stiffness: 480,
  damping: 32,
  mass: 0.78,
};

/** Blob must cover this much of the target link before text inverts */
const BLOB_COVER_RATIO = 0.5;
/** Blob center must be within this fraction of link half-width */
const BLOB_CENTER_TOLERANCE = 0.38;
/** Keep dark text until overlap falls below this (hysteresis) */
const BLOB_UNCOVER_RATIO = 0.28;

function navLabel(label: string) {
  return label === "PPA Contracts" ? "PPA" : label;
}

function isNavActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

export default function NavPillMenu({
  pathname,
  variant,
  className,
}: NavPillMenuProps) {
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>());
  const indicatorHrefRef = useRef<string | null>(null);
  const blobPosRef = useRef({ left: 0, width: 0 });
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [textHighlightHref, setTextHighlightHref] = useState<string | null>(
    null
  );
  const [blob, setBlob] = useState<BlobRect>({
    left: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  const activeHref =
    NAV.find((item) => isNavActive(pathname, item.href))?.href ?? null;
  const indicatorHref = hoveredHref ?? activeHref;
  indicatorHrefRef.current = indicatorHref;
  const isHome = variant === "home";

  const syncTextHighlight = useCallback((left: number, width: number) => {
    const target = indicatorHrefRef.current;
    if (!target || width <= 0) {
      setTextHighlightHref(null);
      return;
    }

    const nav = navRef.current;
    const link = itemRefs.current.get(target);
    if (!nav || !link) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const linkLeft = linkRect.left - navRect.left;
    const linkWidth = linkRect.width;
    if (linkWidth <= 0) return;

    const blobRight = left + width;
    const linkRight = linkLeft + linkWidth;
    const overlap =
      Math.max(0, Math.min(blobRight, linkRight) - Math.max(left, linkLeft)) /
      linkWidth;

    const blobCenter = left + width / 2;
    const centerDelta = Math.abs(blobCenter - (linkLeft + linkWidth / 2));
    const centerAligned =
      centerDelta <= linkWidth * BLOB_CENTER_TOLERANCE;
    const centerInLink =
      blobCenter >= linkLeft && blobCenter <= linkRight;

    const covered =
      centerInLink &&
      ((overlap >= BLOB_COVER_RATIO && centerAligned) || overlap >= 0.38);
    const uncovered = overlap < BLOB_UNCOVER_RATIO;

    setTextHighlightHref((current) => {
      if (covered) return target;
      if (uncovered) return null;
      return current;
    });
  }, []);

  const onBlobUpdate = (latest: Record<string, unknown>) => {
    const left = typeof latest.left === "number" ? latest.left : 0;
    const width = typeof latest.width === "number" ? latest.width : 0;
    blobPosRef.current = { left, width };
    syncTextHighlight(left, width);
  };

  const onBlobMotionComplete = () => {
    const { left, width } = blobPosRef.current;
    syncTextHighlight(left, width);
  };

  const measureBlob = useCallback(() => {
    const nav = navRef.current;
    if (!nav || !indicatorHref) {
      setBlob((prev) => ({ ...prev, visible: false }));
      setTextHighlightHref(null);
      return;
    }
    const link = itemRefs.current.get(indicatorHref);
    if (!link) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const next = {
      left: linkRect.left - navRect.left,
      width: linkRect.width,
      height: linkRect.height,
      visible: true,
    };
    setBlob(next);
    blobPosRef.current = { left: next.left, width: next.width };
    syncTextHighlight(next.left, next.width);
  }, [indicatorHref, syncTextHighlight]);

  useLayoutEffect(() => {
    measureBlob();
  }, [measureBlob, pathname]);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => measureBlob());
    ro.observe(nav);
    return () => ro.disconnect();
  }, [measureBlob]);

  useLayoutEffect(() => {
    window.addEventListener("resize", measureBlob);
    return () => window.removeEventListener("resize", measureBlob);
  }, [measureBlob]);

  const onItemEnter = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    setHoveredHref(href);
    const nav = navRef.current;
    const link = event.currentTarget;
    if (!nav) return;
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const next = {
      left: linkRect.left - navRect.left,
      width: linkRect.width,
      height: linkRect.height,
      visible: true,
    };
    setBlob(next);
    blobPosRef.current = { left: next.left, width: next.width };
    syncTextHighlight(next.left, next.width);
  };

  const onNavLeave = () => {
    setHoveredHref(null);
    measureBlob();
  };

  const blobClass = isHome ? "bg-white shadow-sm" : "bg-[#1c1917] shadow-sm";

  const linkTextClass = (underBlob: boolean) => {
    if (isHome) {
      return underBlob ? "text-[#1c1917]" : "text-white";
    }
    return underBlob ? "text-[#fdfbf7]" : "text-[#57534e]";
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "relative flex items-center gap-0.5 rounded-full px-2 py-2",
        isHome
          ? "glass-surface nav-pill-shadow"
          : "border border-[#e7e5e4] bg-white/70",
        className
      )}
      aria-label="Primary"
      onMouseLeave={onNavLeave}
    >
      <motion.span
        className={cn(
          "nav-blob-indicator pointer-events-none absolute top-1/2 z-0 -translate-y-1/2",
          blobClass
        )}
        initial={false}
        animate={{
          left: blob.left,
          width: blob.width,
          height: blob.height,
          opacity: blob.visible ? 1 : 0,
        }}
        transition={BLOB_SPRING}
        onUpdate={onBlobUpdate}
        onAnimationComplete={onBlobMotionComplete}
        aria-hidden
      />

      {NAV.map((item) => {
        const underBlob = textHighlightHref === item.href;
        const label = navLabel(item.label);

        return (
          <Link
            key={item.href}
            ref={(node) => {
              if (node) itemRefs.current.set(item.href, node);
              else itemRefs.current.delete(item.href);
            }}
            href={item.href}
            data-testid={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
            onMouseEnter={onItemEnter(item.href)}
            className={cn(
              "nav-pill-link relative z-10 rounded-full px-2.5 py-1.5 text-[13px] whitespace-nowrap transition-colors duration-100 ease-out lg:px-3 lg:text-sm",
              linkTextClass(underBlob)
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
