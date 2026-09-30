"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Droplets,
  Factory,
  Home,
  MountainSnow,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/data/site";

type AccordionId = "commercial" | "residential" | "irrigation" | "offgrid" | "ppa";

const ACCORDION_IDS: AccordionId[] = [
  "commercial",
  "residential",
  "irrigation",
  "offgrid",
  "ppa",
];

const PANEL_META: Record<
  AccordionId,
  { stat: string; statLabel: string; badge: string; icon: LucideIcon }
> = {
  commercial: {
    stat: "72%",
    statLabel: "Typical grid offset",
    badge: "Commercial",
    icon: Factory,
  },
  residential: {
    stat: "10 yr",
    statLabel: "Battery product warranty",
    badge: "Residential",
    icon: Home,
  },
  irrigation: {
    stat: "Farm",
    statLabel: "Bore pumps & pivots",
    badge: "Irrigation",
    icon: Droplets,
  },
  offgrid: {
    stat: "24/7",
    statLabel: "Autonomous remote power",
    badge: "Off-grid",
    icon: MountainSnow,
  },
  ppa: {
    stat: "PPA",
    statLabel: "Finance, build & operate",
    badge: "Solar farms",
    icon: Sun,
  },
};

export default function ServicesAccordion() {
  const [open, setOpen] = useState<AccordionId>("commercial");

  return (
    <section className="container-final pb-20 md:pb-28">
      <div className="divide-y divide-[#e7e5e4] border-y border-[#e7e5e4]">
        {ACCORDION_IDS.map((itemId, index) => {
          const service = SERVICES.find((s) => s.id === itemId);
          if (!service) return null;

          const meta = PANEL_META[itemId];
          const PanelIcon = meta.icon;
          const isOpen = open === itemId;

          return (
            <Reveal key={itemId} delay={index * 0.1}>
              <div className="py-5 md:py-6">
                <button
                  type="button"
                  onClick={() => setOpen(itemId)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn(
                      "font-display text-xl font-medium transition-colors md:text-2xl",
                      isOpen ? "text-[#1c1917]" : "text-[#a8a29e]"
                    )}
                  >
                    {service.title}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-[#1c1917] transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                    strokeWidth={1.75}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 grid gap-6 rounded-[var(--radius-card)] bg-[#f5f5f0] p-5 md:grid-cols-[minmax(0,200px)_1fr_auto] md:items-center md:gap-8 md:p-8">
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                          <div className="flex items-center gap-2 text-[#78716c]">
                            <PanelIcon className="h-4 w-4 text-[#d97706]" />
                            <span className="text-xs font-medium">{meta.badge}</span>
                          </div>
                          <p className="mt-3 font-display text-2xl font-semibold text-[#1c1917]">
                            {meta.stat}
                          </p>
                          <Link
                            href="/products"
                            className="mt-4 inline-block rounded-full bg-[#1c1917] px-4 py-2 text-[11px] font-semibold tracking-wide text-[#fdfbf7] uppercase transition hover:bg-[#d97706]"
                          >
                            Know more
                          </Link>
                        </div>
                        <div>
                          <p className="font-display text-4xl font-semibold text-[#1c1917] md:text-5xl">
                            {meta.stat}
                          </p>
                          <p className="mt-1 text-sm font-medium text-[#57534e]">
                            {meta.statLabel}
                          </p>
                          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#78716c]">
                            {service.desc}
                          </p>
                        </div>
                        <Link
                          href="/contact"
                          className="h-fit rounded-full bg-[#1c1917] px-6 py-3 text-sm font-semibold text-[#fdfbf7] transition hover:bg-[#d97706]"
                        >
                          Request a quote
                        </Link>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
