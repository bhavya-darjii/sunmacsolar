import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
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

type ServiceId = "commercial" | "residential" | "irrigation" | "offgrid" | "ppa";

const SERVICE_IDS: ServiceId[] = ["commercial", "residential", "irrigation", "offgrid", "ppa"];

const ROTATE_MS = 7000;

const PANEL_META: Record<
  ServiceId,
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
  const [active, setActive] = useState<ServiceId>("commercial");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;

    const timer = window.setInterval(() => {
      setActive((current) => {
        const index = SERVICE_IDS.indexOf(current);
        return SERVICE_IDS[(index + 1) % SERVICE_IDS.length];
      });
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [paused]);

  const service = SERVICES.find((s) => s.id === active);
  const meta = PANEL_META[active];
  const PanelIcon = meta.icon;

  if (!service) return null;

  return (
    <section
      className="container-final border-t border-[#e7e5e4] pt-14 pb-20 md:pt-20 md:pb-28"
      data-testid="services-showcase"
    >
      <Reveal variant="rise" className="overflow-visible">
        <h2 className="display-lead mb-10 md:mb-12">
          Five specialisations.{" "}
          <span className="font-semibold">One in-house team.</span>
        </h2>
      </Reveal>

      <div className="-mx-4 flex justify-center overflow-x-auto overflow-y-visible px-4 md:mx-0 md:overflow-visible md:px-0">
        <div
          className="services-tab-strip flex w-max max-w-full gap-4 pb-2 md:gap-5"
          role="tablist"
          aria-label="Solar services"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
        {SERVICE_IDS.map((itemId) => {
          const item = SERVICES.find((s) => s.id === itemId);
          if (!item) return null;

          const itemMeta = PANEL_META[itemId];
          const TabIcon = itemMeta.icon;
          const isActive = active === itemId;

          return (
            <button
              key={itemId}
              type="button"
              role="tab"
              id={`service-tab-${itemId}`}
              aria-selected={isActive}
              aria-controls="service-panel"
              onClick={() => setActive(itemId)}
              className={cn(
                "group flex shrink-0 snap-start flex-col items-center transition-opacity",
                isActive ? "opacity-100" : "opacity-55 hover:opacity-85"
              )}
            >
              <div
                className={cn(
                  "flex h-[88px] w-[88px] items-center justify-center rounded-[var(--radius-card)] bg-[#f5f5f0] shadow-sm ring-1 transition md:h-[100px] md:w-[100px]",
                  isActive
                    ? "ring-[#d97706] ring-2"
                    : "ring-[#e7e5e4]/80 group-hover:ring-[#d6d3d1]"
                )}
              >
                <TabIcon className="h-7 w-7 text-[#1c1917]" strokeWidth={1.5} />
              </div>
              <p className="mt-2.5 max-w-[100px] text-center text-xs font-semibold leading-snug text-[#1c1917] md:text-sm">
                {itemMeta.badge}
              </p>
            </button>
          );
        })}
        </div>
      </div>

      <div
        id="service-panel"
        role="tabpanel"
        aria-labelledby={`service-tab-${active}`}
        className="mt-8 md:mt-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-[var(--radius-card)] bg-[#f5f5f0]"
          >
            <div className="grid gap-6 p-5 md:grid-cols-[minmax(0,200px)_1fr_auto] md:items-center md:gap-8 md:p-8">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-[#78716c]">
                  <PanelIcon className="h-4 w-4 text-[#d97706]" />
                  <span className="text-xs font-medium">{meta.badge}</span>
                </div>
                <p className="mt-3 font-display text-2xl font-semibold text-[#1c1917]">
                  {meta.stat}
                </p>
                <p className="mt-1 text-xs text-[#78716c]">{meta.statLabel}</p>
                <Link
                  href="/products"
                  className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#1c1917] px-4 py-2 text-[11px] font-semibold tracking-wide text-[#fdfbf7] uppercase transition hover:bg-[#d97706]"
                >
                  Know more
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>

              <div>
                <h3 className="font-display text-2xl font-semibold text-[#1c1917] md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#57534e] md:text-base">
                  {service.desc}
                </p>
              </div>

              <Link
                href="/contact"
                className="h-fit rounded-full bg-[#1c1917] px-6 py-3 text-center text-sm font-semibold text-[#fdfbf7] transition hover:bg-[#d97706]"
              >
                Request a quote
              </Link>
            </div>

            <div
              className="flex h-1 border-t border-[#e7e5e4]/80 bg-[#fdfbf7]"
              aria-hidden
            >
              {SERVICE_IDS.map((itemId) => (
                <span
                  key={itemId}
                  className={cn(
                    "h-full flex-1 transition-colors duration-300",
                    itemId === active ? "bg-[#d97706]" : "bg-transparent"
                  )}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
