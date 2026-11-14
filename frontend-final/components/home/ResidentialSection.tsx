import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { PROJECTS } from "@/data/site";
import {
  ArrowRight,
  BadgeDollarSign,
  BatteryCharging,
  HardHat,
  PiggyBank,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/**
 * Uses the residential project's photo for now. To swap in a photo of a real SunMac home
 * install, put it in public/images/ and point this at it, e.g. "/images/residential-home.jpg".
 */
const RESIDENTIAL_IMAGE =
  PROJECTS.find((p) => p.category === "Residential")?.image ?? PROJECTS[0].image;

const HOME_FIGURES = [
  { value: "6.6–20 kW", label: "Rooftop solar for homes" },
  { value: "5–48 kWh", label: "LFP battery storage" },
  { value: "48 hours", label: "Design and quote turnaround" },
];

const BENEFITS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: PiggyBank,
    title: "Sized from your bill, not a brochure",
    body: "Send us a recent power bill. We size the system against how your household actually uses energy, so you pay for the panels you need and nothing you don't.",
  },
  {
    icon: BatteryCharging,
    title: "Batteries that carry the evening",
    body: "LFP home batteries from 5 to 48 kWh store your midday surplus for the evening peak, and can keep essential circuits running through a blackout.",
  },
  {
    icon: BadgeDollarSign,
    title: "Rebates taken off up front",
    body: "Federal STCs for solar and the Cheaper Home Batteries discount for eligible batteries come straight off your quote. We lodge the paperwork.",
  },
  {
    icon: HardHat,
    title: "Our own crew on your roof",
    body: "Designed by CEC-accredited designers and installed by licensed electricians from our own team. No sub-contracted labour, on a family home or a 5 MW farm.",
  },
  {
    icon: ShieldCheck,
    title: "Hardware with long warranties",
    body: "Tier-1 panels from Jinko, Trina and Longi with performance warranties of up to 30 years, and batteries with 10-year product warranties.",
  },
  {
    icon: Wallet,
    title: "Pay for it out of the savings",
    body: "$0-upfront payment plans through Brighte and green loans through Plenti, so repayments can be covered by what comes off your power bill.",
  },
];

const STEPS = [
  {
    title: "Send a bill",
    body: "Share a recent power bill and your address. No site visit is needed to start.",
  },
  {
    title: "Design and quote in 48 hours",
    body: "A layout for your roof, expected generation and a clear price with rebates applied.",
  },
  {
    title: "Installed by our team",
    body: "Most homes take one to two days, switchboard and metering included.",
  },
  {
    title: "Switched on and monitored",
    body: "Grid approval, app set-up and a walkthrough, then support from the people who built it.",
  },
];

export default function ResidentialSection() {
  return (
    <section
      className="container-final pb-20 md:pb-28"
      data-testid="home-residential"
      aria-labelledby="home-residential-title"
    >
      <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col justify-center">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#78716c] uppercase">
              For homeowners
            </p>
            <h2 id="home-residential-title" className="display-lead mt-5">
              Solar and batteries for Australian homes.{" "}
              <span className="font-semibold">
                Designed by engineers, installed by our own electricians and sized from your
                actual power bill.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#57534e] md:text-lg">
              The engineers who design our commercial and off-grid systems design our home systems
              too. You get a system matched to your roof, your tariff and your daily routine,
              installed by our own licensed electricians and backed by a team you can call
              directly.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href="/contact" className="btn-dark" data-testid="home-residential-cta">
                Get a free home quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/calculator"
                className="text-sm font-semibold text-[#1c1917] underline decoration-[#d97706] decoration-2 underline-offset-4 transition-colors hover:text-[#d97706]"
                data-testid="home-residential-calculator"
              >
                Estimate my savings
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal variant="rise" className="h-full">
          <div className="relative h-full min-h-[20rem] overflow-hidden rounded-[var(--radius-card)] bg-[#1c1917] sm:min-h-[24rem]">
            <Image
              src={RESIDENTIAL_IMAGE}
              alt="Home battery storage system"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 640px"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/90 via-[#1c1917]/25 to-transparent"
              aria-hidden
            />
            <ul className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-3 p-5 text-white sm:p-7">
              {HOME_FIGURES.map((figure) => (
                <li key={figure.label}>
                  <p className="font-display text-lg font-semibold tracking-tight whitespace-nowrap sm:text-2xl">
                    {figure.value}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-white/75 sm:text-xs">
                    {figure.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-5">
        {BENEFITS.map(({ icon: Icon, title, body }, index) => (
          <li key={title}>
            <Reveal variant="rise" delay={0.05 + index * 0.05} className="h-full">
              <article className="card-lift flex h-full flex-col rounded-[1.25rem] border border-[#e7e5e4] bg-white p-6 shadow-[0_1px_2px_rgba(28,25,23,0.05)] md:p-7">
                <Icon className="h-6 w-6 text-[#d97706]" strokeWidth={1.75} aria-hidden />
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-[#1c1917]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#57534e]">{body}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal variant="rise" className="mt-12 md:mt-16">
        <ol className="grid gap-x-8 gap-y-6 border-t border-[#e7e5e4] pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span
                className="font-display text-2xl leading-none font-semibold text-[#d97706] tabular-nums"
                aria-hidden
              >
                {index + 1}
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-[#1c1917]">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#57534e]">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-xs leading-relaxed text-[#78716c]">
          Rebate eligibility and amounts depend on your location, system and installation date. We
          confirm what you qualify for in your quote.
        </p>
      </Reveal>
    </section>
  );
}
