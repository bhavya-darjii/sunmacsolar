import Reveal from "@/components/Reveal";
import { COMPANY } from "@/data/site";
import { Globe, Mail, MapPin } from "lucide-react";

function clockHandStyle(angleDeg: number) {
  return { transform: `translate(-50%, -100%) rotate(${angleDeg}deg)` };
}

function clockAngles(hours: number, minutes: number) {
  const minuteAngle = minutes * 6;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  return { minuteAngle, hourAngle };
}

function AnalogClockFace({
  hours,
  minutes,
  size = "lg",
  className = "",
}: {
  hours: number;
  minutes: number;
  size?: "sm" | "lg";
  className?: string;
}) {
  const { minuteAngle, hourAngle } = clockAngles(hours, minutes);
  const isSmall = size === "sm";

  return (
    <div
      className={`relative shrink-0 rounded-full border-2 border-[#d6d3d1] bg-white shadow-sm ${
        isSmall ? "h-7 w-7 md:h-8 md:w-8" : "h-20 w-20"
      } ${className}`}
      aria-hidden
    >
      <div
        className={`absolute left-1/2 top-1/2 origin-bottom rounded-full bg-black/70 ${
          isSmall ? "h-2.5 w-[1.5px]" : "h-7 w-0.5"
        }`}
        style={clockHandStyle(minuteAngle)}
      />
      <div
        className={`absolute left-1/2 top-1/2 origin-bottom rounded-full bg-[#d97706] ${
          isSmall ? "h-2 w-[1.5px]" : "h-5 w-0.5"
        }`}
        style={clockHandStyle(hourAngle)}
      />
    </div>
  );
}

function HoursIllustration() {
  return (
    <div className="relative flex h-28 w-36 shrink-0 items-start justify-center pt-2">
      <AnalogClockFace hours={8} minutes={0} size="lg" />
    </div>
  );
}

function OfficeMapIllustration() {
  return (
    <svg viewBox="0 0 200 48" className="mt-4 h-12 w-full opacity-90" aria-hidden>
      <path
        d="M0 38 Q 30 34, 50 28 T 100 22 T 150 18 T 200 12"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2"
      />
      <path
        d="M0 42 Q 35 38, 55 32 T 105 26 T 155 20 T 200 16"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const linkClass =
  "flex items-center gap-2.5 text-sm text-white/75 transition-colors hover:text-[#d97706]";

const cardBase =
  "card-lift flex h-full min-h-[280px] flex-col rounded-[var(--radius-card)] p-6 md:min-h-[320px] md:p-8";

export default function ContactOfficeHoursBento() {
  const telHref = `tel:${COMPANY.phone.replace(/\s/g, "")}`;

  return (
    <Reveal variant="rise" className="pt-12 md:pt-16">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        <article
          className={`${cardBase} bg-black text-white`}
          data-testid="contact-office-bento"
        >
          <div className="flex items-start justify-between gap-4 pb-4">
            <div>
              <p className="text-sm font-medium text-white/85">Office</p>
              <p className="mt-1 text-xs text-white/55">Camellia, NSW</p>
            </div>
            <MapPin className="h-5 w-5 shrink-0 text-[#d97706]" strokeWidth={1.75} />
          </div>

          <div className="space-y-6">
            <div className="space-y-2.5">
              <a href={`mailto:${COMPANY.email}`} className={linkClass} data-testid="contact-email-link">
                <Mail className="h-4 w-4 shrink-0" />
                {COMPANY.email}
              </a>
              <a
                href={`https://${COMPANY.website}`}
                target="_blank"
                rel="noreferrer"
                className={linkClass}
                data-testid="contact-website-link"
              >
                <Globe className="h-4 w-4 shrink-0" />
                {COMPANY.website}
              </a>
            </div>

            <a
              href={telHref}
              className="font-display text-4xl font-semibold tracking-tight transition-colors hover:text-[#d97706] md:text-5xl"
              data-testid="contact-phone-link"
            >
              {COMPANY.phone}
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">{COMPANY.address}</p>
            <p className="mt-2 text-xs text-white/45">
              {COMPANY.parent} · ABN {COMPANY.abn}
            </p>
            <OfficeMapIllustration />
          </div>
        </article>

        <article
          className={`${cardBase} justify-between bg-[#e7e5e4]`}
          data-testid="contact-hours-bento"
        >
          <div className="flex items-start justify-between gap-4">
            <p className="text-[11px] font-bold tracking-[0.14em] text-[#57534e] uppercase">Hours</p>
            <AnalogClockFace
              hours={10}
              minutes={10}
              size="sm"
              className="-translate-y-1.5 border-[#d97706]/35 md:-translate-y-2"
            />
          </div>

          <div className="flex min-h-[7rem] flex-1 items-center justify-center">
            <HoursIllustration />
          </div>

          <div className="mt-auto">
            <p className="font-display text-3xl font-semibold tracking-tight text-black md:text-4xl">
              8:00 a.m. — 5:30 p.m.
            </p>
            <p className="mt-1 text-xs text-[#57534e]">Mon — Fri</p>
            <p className="mt-3 text-sm leading-relaxed text-[#57534e]">
              Sat by appointment · Sun closed
            </p>
          </div>
        </article>
      </div>
    </Reveal>
  );
}
