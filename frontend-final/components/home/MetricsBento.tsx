import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/data/site";
import { Droplets, Headphones, MountainSnow, Sun } from "lucide-react";

/** Second row: PPA (left), off-grid (right) — cream left, dark right via bentoThemeForIndex. */
const BENTO_SERVICE_ORDER = ["commercial", "residential", "irrigation", "ppa", "offgrid"] as const;

const BENTO_SERVICES = BENTO_SERVICE_ORDER.map((id) => SERVICES.find((s) => s.id === id)).filter(
  (service): service is (typeof SERVICES)[number] => service != null
);

const CARD_THEMES = [
  {
    card: "bg-black text-white",
    title: "text-white/90",
    desc: "text-white/60",
  },
  {
    card: "bg-[#f5f5f0] text-[#1c1917]",
    title: "text-[#1c1917]",
    desc: "text-[#57534e]",
  },
  {
    card: "bg-[#e7e5e4]/60 text-[#1c1917]",
    title: "text-[#1c1917]",
    desc: "text-[#57534e]",
  },
] as const;

function bentoThemeForIndex(index: number) {
  // Bottom row — cream left, dark right (not the default index % 3 cycle).
  if (index === 3) return CARD_THEMES[1];
  if (index === 4) return CARD_THEMES[0];
  return CARD_THEMES[index % CARD_THEMES.length];
}

type DiagramId = "solar" | "response" | "irrigation" | "offgrid" | "farm";

const DIAGRAM_BY_SERVICE: Record<string, DiagramId> = {
  commercial: "solar",
  residential: "response",
  irrigation: "irrigation",
  offgrid: "offgrid",
  ppa: "farm",
};

const DIAGRAM_ICON_CLASS = "h-8 w-8 shrink-0 text-[#d97706]";
const DIAGRAM_ICON_STROKE = 1.5;

function SolarIllustration() {
  return (
    <div className="relative mx-auto h-28 w-36 shrink-0">
      <div className="absolute inset-x-4 bottom-0 h-3 rounded bg-[#a8a29e]/80" />
      <div
        className="absolute left-5 right-5 top-3 h-[4.25rem] overflow-hidden rounded-md border border-white/35 bg-gradient-to-br from-[#e7e5e4] to-[#fafaf9] shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
        style={{ transform: "perspective(400px) rotateX(12deg) rotateY(-8deg)" }}
      >
        <div
          className="absolute inset-1 grid grid-cols-4 grid-rows-3 gap-[2px] opacity-60"
          aria-hidden
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-[1px] border border-[#78716c]/35 bg-[#f5f5f0]/90" />
          ))}
        </div>
      </div>
      <Sun
        className={cn("absolute -right-3 -top-2", DIAGRAM_ICON_CLASS)}
        strokeWidth={DIAGRAM_ICON_STROKE}
        aria-hidden
      />
    </div>
  );
}

function ResponseIllustration() {
  return (
    <div className="relative mx-auto h-28 w-36 shrink-0">
      <div className="absolute inset-x-3 bottom-2 flex items-end justify-between gap-1.5">
        <div className="h-10 w-2 rounded-full bg-[#d6d3d1]" />
        <div className="h-16 w-2 rounded-full bg-[#d97706]/45" />
        <div className="h-12 w-2 rounded-full bg-[#1c1917]/20" />
        <div className="h-7 w-2 rounded-full bg-[#d6d3d1]" />
      </div>
      <div className="absolute inset-x-5 top-6 rounded-xl border border-[#e7e5e4] bg-[#fdfbf7] px-3 py-2 shadow-sm">
        <div className="h-1.5 w-12 rounded-full bg-[#e7e5e4]" />
        <div className="mt-1.5 h-1.5 w-16 rounded-full bg-[#d97706]/35" />
      </div>
      <Headphones
        className={cn("absolute -right-0.5 top-0", DIAGRAM_ICON_CLASS)}
        strokeWidth={DIAGRAM_ICON_STROKE}
        aria-hidden
      />
    </div>
  );
}

function IrrigationIllustration() {
  return (
    <div className="relative mx-auto h-28 w-36 shrink-0">
      <div className="absolute inset-x-4 bottom-0 h-1.5 rounded-full bg-[#d6d3d1]" />
      <div className="absolute bottom-1.5 left-[2.65rem] h-[4.75rem] w-2.5 rounded-sm bg-[#a8a29e] shadow-sm ring-1 ring-[#78716c]/30" />
      <div className="absolute bottom-[4.85rem] left-[2.15rem] h-3.5 w-[3.25rem] rounded-t-full border-2 border-b-0 border-[#78716c]" />
      <div className="absolute bottom-[4.65rem] left-[4.85rem] h-2 w-2 rounded-full bg-[#d97706]" />
      <svg viewBox="0 0 88 52" className="absolute bottom-5 left-10 h-[3.4rem] w-[5.5rem]" aria-hidden>
        <path
          d="M10 42 C 18 14, 28 26, 38 18 S 58 10, 72 6"
          fill="none"
          stroke="#d97706"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M10 46 C 20 24, 30 34, 42 26 S 62 18, 76 14"
          fill="none"
          stroke="#d97706"
          strokeWidth="1.75"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>
      <Droplets
        className={cn("absolute -right-3 -top-2", DIAGRAM_ICON_CLASS)}
        strokeWidth={DIAGRAM_ICON_STROKE}
        aria-hidden
      />
    </div>
  );
}

function OffGridIllustration() {
  return (
    <div className="relative mx-auto h-28 w-36 shrink-0">
      <svg viewBox="0 0 144 56" className="absolute inset-x-0 bottom-2 h-14 w-full" aria-hidden>
        <path
          d="M0 48 L24 28 L48 40 L72 18 L96 32 L120 14 L144 36 L144 56 L0 56 Z"
          fill="#e7e5e4"
        />
        <path d="M0 48 L24 28 L48 40 L72 18 L96 32 L120 14 L144 36" fill="none" stroke="#d6d3d1" strokeWidth="1.5" />
      </svg>
      <div className="absolute bottom-6 left-10 h-8 w-10 rounded-sm border border-[#d6d3d1] bg-[#fdfbf7] shadow-sm" />
      <div
        className="absolute bottom-9 right-8 h-6 w-9 rounded-sm border border-white/25 bg-gradient-to-br from-[#e7e5e4] to-[#fafaf9] shadow-sm"
        style={{ transform: "perspective(300px) rotateX(18deg)" }}
      />
      <MountainSnow
        className={cn("absolute -right-0.5 top-0", DIAGRAM_ICON_CLASS)}
        strokeWidth={DIAGRAM_ICON_STROKE}
        aria-hidden
      />
    </div>
  );
}

function FarmIllustration() {
  return (
    <div className="relative mx-auto h-28 w-36 shrink-0">
      <div className="absolute inset-x-2 bottom-3 flex flex-col gap-1.5">
        <div className="h-2 rounded-sm bg-gradient-to-r from-[#1c1917] to-[#57534e] opacity-90" />
        <div className="ml-3 h-2 rounded-sm bg-gradient-to-r from-[#1c1917] to-[#57534e] opacity-75" />
        <div className="ml-1 h-2 rounded-sm bg-gradient-to-r from-[#1c1917] to-[#57534e] opacity-85" />
        <div className="ml-4 h-2 rounded-sm bg-gradient-to-r from-[#1c1917] to-[#57534e] opacity-70" />
      </div>
      <div className="absolute inset-x-3 bottom-0 h-2 rounded bg-[#e7e5e4]" />
      <Sun
        className={cn("absolute right-0 top-0", DIAGRAM_ICON_CLASS)}
        strokeWidth={DIAGRAM_ICON_STROKE}
        aria-hidden
      />
    </div>
  );
}

function ServiceDiagram({ id }: { id: DiagramId }) {
  switch (id) {
    case "solar":
      return <SolarIllustration />;
    case "response":
      return <ResponseIllustration />;
    case "irrigation":
      return <IrrigationIllustration />;
    case "offgrid":
      return <OffGridIllustration />;
    case "farm":
      return <FarmIllustration />;
    default:
      return null;
  }
}

export default function MetricsBento() {
  return (
    <section className="container-final pb-20 md:pb-28">
      <Reveal variant="rise">
        <h3 className="mb-10 font-display text-2xl font-light text-[#1c1917] md:text-3xl">
          Five specialisations.{" "}
          <span className="font-normal text-[#a8a29e]">One in-house team.</span>
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {BENTO_SERVICES.map((service, index) => {
            const theme = bentoThemeForIndex(index);
            const diagram = DIAGRAM_BY_SERVICE[service.id] ?? "solar";

            return (
              <article
                key={service.id}
                className={cn(
                  "card-lift flex min-h-[280px] flex-col justify-between rounded-[var(--radius-card)] p-6 md:min-h-[320px] md:p-8 lg:col-span-2",
                  index === 3 && "lg:col-start-2",
                  index === 4 && "lg:col-start-4",
                  index === 4 && "sm:col-span-2 sm:max-w-md sm:justify-self-center",
                  theme.card
                )}
              >
                <h4 className={`font-display text-lg font-semibold leading-snug md:text-xl ${theme.title}`}>
                  {service.title}
                </h4>

                <div className="flex flex-1 items-center justify-center py-3 md:py-4">
                  <ServiceDiagram id={diagram} />
                </div>

                <p className={`text-sm leading-relaxed ${theme.desc}`}>{service.desc}</p>
              </article>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
