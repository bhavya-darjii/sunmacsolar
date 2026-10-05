import { cn } from "@/lib/utils";
import { BadgeCheck, HardHat, MapPin, Wheat } from "lucide-react";

const TRUST_ITEMS = [
  { id: "cec", title: "CEC-approved retailer" },
  { id: "inhouse", title: "In-house installation team" },
  { id: "mw", title: "50+ MW installed nationwide" },
  { id: "farmers", title: "Trusted by Australian farmers" },
] as const;

type TrustId = (typeof TRUST_ITEMS)[number]["id"];

const CARD_THEMES = [
  {
    card: "bg-black text-white",
    title: "text-white/90",
  },
  {
    card: "bg-[#f5f5f0] text-[#1c1917]",
    title: "text-[#1c1917]",
  },
  {
    card: "bg-[#e7e5e4]/60 text-[#1c1917]",
    title: "text-[#1c1917]",
  },
] as const;

function themeForIndex(index: number) {
  return CARD_THEMES[index % CARD_THEMES.length];
}

const DIAGRAM_ICON_CLASS = "h-8 w-8 shrink-0 text-[#d97706]";
const DIAGRAM_ICON_STROKE = 1.5;

/** Minimal installer figure — faces +x when used on the left, mirror with scale(-1,1) on the right. */
function InstallerFigure({ flip }: { flip?: boolean }) {
  return (
    <g transform={flip ? "scale(-1, 1)" : undefined}>
      <path d="M-8 -22 h16 v5 a8 8 0 0 1 -16 0 Z" fill="#d97706" />
      <circle cx="0" cy="-12" r="5.5" fill="#57534e" />
      <path d="M0 -6.5 v15" stroke="#1c1917" strokeWidth="2.25" strokeLinecap="round" />
      <path
        d="M0 2 L10 8"
        stroke="#1c1917"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M0 2 L-3 10"
        stroke="#1c1917"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M0 8.5 L-4 21 M0 8.5 L4 21"
        stroke="#d97706"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path d="M-4 21 v9 M4 21 v9" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/** Farmer figure for dark cards — light strokes for contrast. */
function FarmerFigure({ flip }: { flip?: boolean }) {
  return (
    <g transform={flip ? "scale(-1, 1)" : undefined}>
      <ellipse cx="0" cy="-18" rx="11" ry="3" fill="#d97706" fillOpacity="0.85" />
      <path d="M-6 -22 h12 v6 a6 6 0 0 1 -12 0 Z" fill="#d97706" />
      <circle cx="0" cy="-12" r="5" fill="rgba(255,255,255,0.85)" />
      <path d="M0 -7 v14" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M-8 4 L0 -2 L8 2"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="1.75"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M0 7 L-4 21 M0 7 L4 21"
        stroke="#d97706"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path d="M-4 21 v8 M4 21 v8" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function CecIllustration() {
  return (
    <div className="relative mx-auto h-28 w-36 shrink-0">
      <div
        className="absolute inset-x-6 top-4 rounded-lg border border-white/20 bg-gradient-to-br from-[#fafaf9] to-[#e7e5e4] px-4 py-5 shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
        style={{ transform: "perspective(400px) rotateX(8deg) rotateY(6deg)" }}
      >
        <div className="mx-auto h-8 w-8 rounded-full border-2 border-[#d97706]/50 bg-[#fdfbf7]" />
        <div className="mt-2 space-y-1">
          <div className="h-1 w-full rounded-full bg-[#d6d3d1]" />
          <div className="h-1 w-4/5 rounded-full bg-[#e7e5e4]" />
        </div>
      </div>
      <BadgeCheck
        className={cn("absolute -right-1 top-0", DIAGRAM_ICON_CLASS)}
        strokeWidth={DIAGRAM_ICON_STROKE}
        aria-hidden
      />
    </div>
  );
}

function InHouseIllustration() {
  return (
    <div className="relative mx-auto h-28 w-36 shrink-0">
      <svg viewBox="0 0 144 100" className="h-full w-full" aria-hidden>
        <path d="M10 86 H134" stroke="#d6d3d1" strokeWidth="2" strokeLinecap="round" />
        <g transform="translate(72, 52)">
          <rect
            x="-24"
            y="-4"
            width="48"
            height="28"
            rx="2"
            fill="#f5f5f0"
            stroke="#78716c"
            strokeWidth="1.25"
          />
          <g stroke="#a8a29e" strokeWidth="0.75">
            <line x1="-18" y1="6" x2="18" y2="6" />
            <line x1="-18" y1="14" x2="18" y2="14" />
            <line x1="-6" y1="-4" x2="-6" y2="24" />
            <line x1="6" y1="-4" x2="6" y2="24" />
          </g>
        </g>
        <g transform="translate(38, 58)">
          <InstallerFigure />
        </g>
        <g transform="translate(106, 58)">
          <InstallerFigure flip />
        </g>
      </svg>
      <HardHat
        className={cn("absolute -right-1 top-0", DIAGRAM_ICON_CLASS)}
        strokeWidth={DIAGRAM_ICON_STROKE}
        aria-hidden
      />
    </div>
  );
}

function MegawattIllustration() {
  return (
    <div className="relative mx-auto h-28 w-36 shrink-0">
      <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-1">
        <div className="h-8 w-2.5 rounded-t-sm bg-[#d6d3d1]" />
        <div className="h-14 w-2.5 rounded-t-sm bg-[#d97706]/55" />
        <div className="h-11 w-2.5 rounded-t-sm bg-[#1c1917]/25" />
        <div className="h-[4.5rem] w-2.5 rounded-t-sm bg-[#d97706]/40" />
        <div className="h-10 w-2.5 rounded-t-sm bg-[#d6d3d1]" />
      </div>
      <div className="absolute inset-x-2 bottom-0 h-1.5 rounded-full bg-[#e7e5e4]" />
      <p
        className="absolute left-2 top-2 font-display text-2xl font-semibold tracking-tight text-[#1c1917]/85"
        aria-hidden
      >
        50<span className="text-[#d97706]">+</span>
      </p>
      <MapPin
        className={cn("absolute right-0 top-0", DIAGRAM_ICON_CLASS)}
        strokeWidth={DIAGRAM_ICON_STROKE}
        aria-hidden
      />
    </div>
  );
}

function FarmersIllustration() {
  return (
    <div className="relative mx-auto h-28 w-36 shrink-0">
      <svg viewBox="0 0 144 100" className="h-full w-full" aria-hidden>
        <path d="M8 86 H136" stroke="rgba(255,255,255,0.22)" strokeWidth="1.75" strokeLinecap="round" />
        <circle cx="72" cy="38" r="7" fill="#d97706" fillOpacity="0.45" />
        <path
          d="M42 86 L54 68 L66 78 L78 54 L90 70 L102 86 Z"
          fill="rgba(255,255,255,0.1)"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <path
          d="M52 86 L72 48 L92 86 Z"
          fill="rgba(255,255,255,0.16)"
          stroke="rgba(255,255,255,0.38)"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <path
          d="M64 86 L72 58 L80 86 Z"
          fill="rgba(255,255,255,0.08)"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <g transform="translate(34, 56)">
          <FarmerFigure />
        </g>
        <g transform="translate(110, 56)">
          <FarmerFigure flip />
        </g>
      </svg>
      <Wheat
        className={cn("absolute -right-1 top-0", DIAGRAM_ICON_CLASS)}
        strokeWidth={DIAGRAM_ICON_STROKE}
        aria-hidden
      />
    </div>
  );
}

function TrustDiagram({ id }: { id: TrustId }) {
  switch (id) {
    case "cec":
      return <CecIllustration />;
    case "inhouse":
      return <InHouseIllustration />;
    case "mw":
      return <MegawattIllustration />;
    case "farmers":
      return <FarmersIllustration />;
    default:
      return null;
  }
}

export default function TrustHighlightsBento() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {TRUST_ITEMS.map((item, index) => {
        const theme = themeForIndex(index);

        return (
          <article
            key={item.id}
            className={cn(
              "card-lift flex min-h-[280px] flex-col justify-between rounded-[var(--radius-card)] p-6 md:min-h-[320px] md:p-8",
              theme.card
            )}
          >
            <h4 className={`font-display text-lg font-semibold leading-snug md:text-xl ${theme.title}`}>
              {item.title}
            </h4>

            <div className="flex flex-1 items-center justify-center py-3 md:py-4">
              <TrustDiagram id={item.id} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
