import Reveal from "@/components/Reveal";
import { Headphones, ShieldCheck, Sun } from "lucide-react";

function SoilChart() {
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

function SolarIllustration() {
  return (
    <div className="relative mx-auto mt-2 h-28 w-36">
      <div className="absolute inset-x-4 bottom-0 h-3 rounded bg-[#e7e5e4]" />
      <div
        className="absolute left-6 right-6 top-4 h-16 rounded-md bg-gradient-to-br from-[#1c1917] to-[#57534e] shadow-md"
        style={{ transform: "perspective(400px) rotateX(12deg) rotateY(-8deg)" }}
      />
      <Sun className="absolute -right-1 top-0 h-8 w-8 text-[#d97706]" strokeWidth={1.5} />
    </div>
  );
}

function ResponseIllustration() {
  return (
    <div className="relative mx-auto mt-2 h-28 w-36">
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
      <Headphones className="absolute -right-0.5 top-0 h-8 w-8 text-[#d97706]" strokeWidth={1.5} />
    </div>
  );
}

export default function MetricsBento() {
  return (
    <section className="container-final pb-20 md:pb-28">
      <Reveal variant="rise">
        <h3 className="mb-10 font-display text-2xl font-light text-[#1c1917] md:text-3xl">
          Five specialisations.{" "}
          <span className="font-normal text-[#a8a29e]">One in-house team.</span>
        </h3>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          <article
            className="card-lift flex min-h-[280px] flex-col justify-between rounded-[var(--radius-card)] bg-[#1c1917] p-6 text-[#fdfbf7] md:min-h-[320px] md:p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-white/85">Installed capacity</p>
                <p className="text-xs text-white/55">Commercial &amp; rural</p>
              </div>
              <ShieldCheck className="h-5 w-5 text-[#d97706]" strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-display text-5xl font-semibold tracking-tight md:text-6xl">
                50+ MW
              </p>
              <SoilChart />
            </div>
          </article>

          <article
            className="card-lift flex min-h-[280px] flex-col justify-between rounded-[var(--radius-card)] bg-[#f5f5f0] p-6 md:min-h-[320px] md:p-8"
          >
            <p className="text-[11px] font-bold tracking-[0.14em] text-[#57534e] uppercase">
              Product warranty
            </p>
            <SolarIllustration />
            <div>
              <p className="font-display text-3xl font-semibold tracking-tight text-[#1c1917] md:text-4xl">
                10 Years
              </p>
            </div>
          </article>

          <article
            className="card-lift flex min-h-[280px] flex-col justify-between rounded-[var(--radius-card)] bg-[#e7e5e4]/60 p-6 md:min-h-[320px] md:p-8"
          >
            <p className="text-[11px] font-bold tracking-[0.14em] text-[#57534e] uppercase">
              Support response
            </p>
            <ResponseIllustration />
            <div>
              <p className="font-display text-3xl font-semibold tracking-tight text-[#1c1917] md:text-4xl">
                48 hr
              </p>
              <p className="mt-1 text-xs text-[#57534e]">
                In-house team — no outsourced installers
              </p>
            </div>
          </article>
        </div>
      </Reveal>
    </section>
  );
}
