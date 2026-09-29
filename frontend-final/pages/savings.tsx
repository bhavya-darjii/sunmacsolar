import { useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  DollarSign,
  TrendingDown,
  Zap,
  Sun,
  Info,
  Check,
  Sparkles,
  Home,
  Building2,
  Battery,
  Wallet,
  ScrollText,
  Snowflake,
  Warehouse,
  UtensilsCrossed,
  Leaf,
  LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";

interface StateData {
  label: string;
  irradiance: number;
  fit: number;
  tariff: number;
}

const STATES: Record<string, StateData> = {
  NSW: { label: "New South Wales", irradiance: 1.00, fit: 0.06, tariff: 0.32 },
  VIC: { label: "Victoria",        irradiance: 0.92, fit: 0.048, tariff: 0.28 },
  QLD: { label: "Queensland",      irradiance: 1.08, fit: 0.08, tariff: 0.29 },
  SA:  { label: "South Australia", irradiance: 1.05, fit: 0.045, tariff: 0.42 },
  WA:  { label: "Western Australia", irradiance: 1.06, fit: 0.10, tariff: 0.30 },
  TAS: { label: "Tasmania",        irradiance: 0.85, fit: 0.088, tariff: 0.30 },
  ACT: { label: "ACT",             irradiance: 0.95, fit: 0.075, tariff: 0.28 },
  NT:  { label: "Northern Territory", irradiance: 1.15, fit: 0.085, tariff: 0.28 },
};

function currency(n: number) {
  return "$" + Math.round(n).toLocaleString("en-AU");
}

function calculate(monthlyBill: number, stateKey: string) {
  const s = STATES[stateKey];
  if (!s || !monthlyBill || monthlyBill <= 0) return null;
  const annualBill = monthlyBill * 12;
  const annualKwh = annualBill / s.tariff;
  const systemKw = Math.max(3, Math.ceil((annualKwh * 0.7) / (365 * 4 * s.irradiance)));
  const generationKwh = systemKw * 365 * 4 * s.irradiance;
  const selfConsRatio = 0.35;
  const savingsFromOffset = generationKwh * selfConsRatio * s.tariff;
  const feedInEarnings = generationKwh * (1 - selfConsRatio) * s.fit;
  const annualSavings = Math.min(annualBill * 0.95, savingsFromOffset + feedInEarnings);
  const systemCost = systemKw * 1200; // post-STC installed
  const paybackYears = systemCost / annualSavings;
  const co2Saved = generationKwh * 0.79; // kg CO2 / kWh grid AU average
  return {
    annualBill,
    annualKwh,
    systemKw,
    generationKwh,
    annualSavings,
    systemCost,
    paybackYears,
    co2Saved,
    twentyYearSavings: annualSavings * 20 - systemCost,
  };
}

interface RebateItem {
  icon: LucideIcon;
  title: string;
  tag: string;
  summary: string;
  who: string;
  how: string;
  value: string;
}

const REBATES: RebateItem[] = [
  {
    icon: Sun,
    title: "STC — Small-scale Technology Certificate",
    tag: "Federal · Applies everywhere",
    summary: "The main federal rebate. Applied automatically as an upfront discount off your system price by any CEC-accredited retailer.",
    who: "Homeowners & small businesses installing solar under 100kW.",
    how: "You do nothing — your solar retailer calculates STCs based on your postcode + system size and deducts them from your quote.",
    value: "Typical value: $2,500 – $5,500 off a 6.6kW home system.",
  },
  {
    icon: Battery,
    title: "Feed-in Tariff (FIT)",
    tag: "State-set, paid by your retailer",
    summary: "A per-kWh credit for solar power you export back to the grid. Rates vary by state and retailer.",
    who: "Anyone with a grid-connected solar system.",
    how: "Automatic — appears as a credit on your electricity bill from your retailer.",
    value: "4c – 10c per kWh exported depending on state and plan.",
  },
  {
    icon: Wallet,
    title: "NSW · Energy Bill Relief & Peak Demand Scheme",
    tag: "New South Wales",
    summary: "NSW offers rebates for battery installation and household energy efficiency upgrades under the Peak Demand Reduction Scheme.",
    who: "NSW households and small businesses installing eligible batteries or solar-hot-water heat pumps.",
    how: "Choose a scheme-accredited installer — the discount is applied at point of sale.",
    value: "Battery: $1,600 – $2,400 upfront + optional VPP bonus.",
  },
  {
    icon: Home,
    title: "VIC · Solar Homes Program",
    tag: "Victoria",
    summary: "Victorian government rebate on eligible solar PV systems and hot water heat pumps, plus an interest-free loan option.",
    who: "Victorian owner-occupiers and rental providers under the income cap.",
    how: "Apply at solar.vic.gov.au, receive an eligibility code, then use it with a Solar Victoria-authorised retailer.",
    value: "Up to $1,400 rebate + $1,400 interest-free loan on solar PV.",
  },
  {
    icon: Battery,
    title: "QLD · Battery Booster",
    tag: "Queensland",
    summary: "Queensland state incentive for adding a battery to a new or existing solar system.",
    who: "Queensland households (income-tested).",
    how: "Apply online, then have an approved installer complete the install and lodge for the rebate.",
    value: "$3,000 – $4,000 off battery installation.",
  },
  {
    icon: Battery,
    title: "SA · Home Battery Scheme",
    tag: "South Australia",
    summary: "Grants and low-interest loans to help SA households install a home battery.",
    who: "SA homeowners installing eligible batteries.",
    how: "Choose an approved system provider — subsidy applied at install.",
    value: "$2,000 – $3,000 subsidy plus optional finance.",
  },
  {
    icon: Sun,
    title: "WA · Distributed Energy Buyback Scheme (DEBS)",
    tag: "Western Australia",
    summary: "Tiered feed-in tariff paying more for exports during peak evening hours.",
    who: "WA households with grid-connected solar under 5kW inverter capacity.",
    how: "Automatic once your solar system is registered with Synergy or Horizon.",
    value: "Peak: ~10c/kWh · Off-peak: ~2.25c/kWh.",
  },
  {
    icon: ScrollText,
    title: "ACT · Sustainable Household Scheme",
    tag: "Australian Capital Territory",
    summary: "Zero-interest loan of up to $15,000 for solar, batteries, heat pumps, EV chargers and more.",
    who: "ACT homeowners meeting eligibility criteria.",
    how: "Apply online via the ACT Government portal, then use with an accredited supplier.",
    value: "0% loan up to $15,000, repayable over 10 years.",
  },
  {
    icon: Building2,
    title: "NT · Home & Business Battery Scheme",
    tag: "Northern Territory",
    summary: "Territory grant to reduce the cost of eligible battery systems.",
    who: "NT homeowners and small businesses.",
    how: "Use an NT Government-approved installer; grant applied at point of sale.",
    value: "Up to $5,000 off battery installation.",
  },
];

interface PdrsVenue {
  label: string;
  icon: LucideIcon;
  perKw: number;
  note: string;
}

const PDRS_VENUES: Record<string, PdrsVenue> = {
  warehouse: {
    label: "Commercial warehouse",
    icon: Warehouse,
    perKw: 35,
    note: "Daytime peak loads — high-efficiency VRF or packaged units score well.",
  },
  coldstorage: {
    label: "Cold storage facility",
    icon: Snowflake,
    perKw: 45,
    note: "24/7 run-hours mean the largest peak demand reduction — and the biggest incentive.",
  },
  restaurant: {
    label: "Restaurant / hospitality",
    icon: UtensilsCrossed,
    perKw: 40,
    note: "Evening peak overlap with the grid makes restaurant HVAC upgrades highly valuable.",
  },
};

function pdrsEstimate(venueKey: string, coolingKw: number) {
  const v = PDRS_VENUES[venueKey];
  if (!v || !coolingKw || coolingKw <= 0) return null;
  const mid = coolingKw * v.perKw;
  return {
    low: mid * 0.7,
    high: mid * 1.3,
    prcs: Math.round(mid / 1.6),
  };
}

export default function Savings() {
  const [monthly, setMonthly] = useState<number | string>(350);
  const [stateKey, setStateKey] = useState("NSW");
  const result = useMemo(() => calculate(Number(monthly), stateKey), [monthly, stateKey]);

  return (
    <>
      <Head>
        <title>Solar Savings Calculator & Rebates | SunMac Solar</title>
        <meta
          name="description"
          content="Estimate your solar power savings and explore Australian government rebates, STCs, and NSW PDRS incentives."
        />
      </Head>
      <div data-testid="savings-page">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#1C1917] text-[#FDFBF7]">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#D97706]/30 blur-3xl" />
          <div className="absolute -left-24 -bottom-24 w-80 h-80 rounded-full bg-[#166534]/25 blur-3xl" />
          <div className="relative container-final py-20 md:py-28 max-w-5xl">
            <Reveal>
              <div className="overline text-[#FBBF24]">Savings & Rebates</div>
              <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl mt-6 leading-[1.05]">
                Estimate your savings. <span className="italic text-[#FBBF24]">Claim your rebates.</span>
              </h1>
              <p className="mt-6 text-lg text-[#D6D3D1] max-w-2xl">
                Punch in your average power bill and we&apos;ll show you what a solar system could save you — plus every Australian government rebate you can stack on top.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Calculator */}
        <section className="section-pad -mt-20 md:-mt-24" data-testid="savings-calculator">
          <div className="container-final">
            <Reveal>
              <div className="grid lg:grid-cols-12 gap-8 bg-[#FDFBF7] border border-[#E7E5E4] rounded-[var(--radius-card)] shadow-xl overflow-hidden">
                {/* Left: form */}
                <div className="lg:col-span-5 p-8 md:p-10 bg-[#F5F5F0] border-b lg:border-b-0 lg:border-r border-[#E7E5E4]">
                  <div className="inline-flex items-center gap-2 text-[#D97706] text-xs tracking-[0.2em] uppercase font-bold">
                    <Calculator className="w-4 h-4" /> Solar savings calculator
                  </div>
                  <h2 className="font-display text-3xl mt-4 font-medium tracking-tight">Your details</h2>
                  <p className="mt-2 text-sm text-[#57534E]">Estimates are indicative — a proper quote requires site inspection.</p>

                  <div className="mt-8 space-y-6">
                    <div>
                      <label className="text-xs tracking-wide uppercase text-[#57534E] font-semibold">Average monthly electricity bill (AUD)</label>
                      <div className="relative mt-2">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#57534E]">$</span>
                        <input
                          type="number"
                          min="50"
                          step="10"
                          value={monthly}
                          onChange={(e) => setMonthly(e.target.value)}
                          placeholder="350"
                          data-testid="savings-monthly-input"
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] text-lg font-medium outline-none focus:border-[#D97706]"
                        />
                      </div>
                      <input
                        type="range"
                        min="80"
                        max="1500"
                        step="10"
                        value={monthly || 0}
                        onChange={(e) => setMonthly(Number(e.target.value))}
                        className="w-full mt-3 accent-[#D97706]"
                        data-testid="savings-monthly-slider"
                      />
                    </div>

                    <div>
                      <label className="text-xs tracking-wide uppercase text-[#57534E] font-semibold">State or territory</label>
                      <select
                        value={stateKey}
                        onChange={(e) => setStateKey(e.target.value)}
                        data-testid="savings-state-select"
                        className="mt-2 w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] text-lg font-medium outline-none focus:border-[#D97706]"
                      >
                        {Object.entries(STATES).map(([k, v]) => (
                          <option key={k} value={k}>{v.label} ({k})</option>
                        ))}
                      </select>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FDFBF7] border border-[#E7E5E4] flex gap-3">
                      <Info className="w-4 h-4 text-[#D97706] mt-0.5 shrink-0" />
                      <p className="text-xs text-[#57534E] leading-relaxed">
                        Numbers use current Australian averages for retail tariffs, feed-in rates and installed cost of tier-1 systems (post-STC).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: results */}
                <div className="lg:col-span-7 p-8 md:p-12 relative">
                  <AnimatePresence mode="wait">
                    {result ? (
                      <motion.div
                        key={`${monthly}-${stateKey}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        data-testid="savings-results"
                      >
                        <div className="overline text-[#D97706]">Your estimate · {stateKey}</div>
                        <h3 className="font-display text-3xl md:text-4xl mt-3 tracking-tight font-medium">
                          Save around <span className="text-[#166534]">{currency(result.annualSavings)}</span> a year
                        </h3>

                        <div className="mt-8 grid sm:grid-cols-2 gap-4">
                          <ResultTile icon={Zap} label="Recommended system" value={`${result.systemKw} kW`} sub={`~${Math.round(result.generationKwh).toLocaleString("en-AU")} kWh/yr generated`} />
                          <ResultTile icon={TrendingDown} label="Estimated payback" value={`${result.paybackYears.toFixed(1)} yrs`} sub="Then it's free power." tone="orange" />
                          <ResultTile icon={DollarSign} label="Installed system cost" value={currency(result.systemCost)} sub="Post-STC federal rebate applied" />
                          <ResultTile icon={Sparkles} label="20-yr net savings" value={currency(Math.max(0, result.twentyYearSavings))} sub={`+ ${Math.round(result.co2Saved / 1000).toLocaleString()} t CO₂ avoided`} tone="green" />
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                          <Link
                            href="/contact"
                            data-testid="savings-cta-quote"
                            className="inline-flex items-center gap-2 rounded-full bg-[#D97706] hover:bg-[#B45309] text-[#FDFBF7] px-6 py-3 text-sm font-medium transition-colors"
                          >
                            Get an accurate quote <ArrowRight className="w-4 h-4" />
                          </Link>
                          <a href="#rebates" className="text-sm font-medium text-[#1C1917] hover:text-[#D97706] inline-flex items-center gap-1.5">
                            See rebates you can claim <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-[#57534E] text-sm">
                        Enter your bill to see your estimate.
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Rebates Guide */}
        <section id="rebates" className="section-pad bg-[#F5F5F0]" data-testid="rebates-guide">
          <div className="container-final">
            <Reveal>
              <div className="overline text-[#D97706]">Australian solar rebates guide</div>
              <h2 className="display-lead mt-4 max-w-3xl">
                <span className="font-semibold">Every rebate you should know about — in plain English.</span>
              </h2>
              <p className="mt-5 text-[#57534E] max-w-2xl">
                You can stack federal rebates on top of state programs. Below is a quick guide to the main ones. Rules and amounts change frequently — we&apos;ll confirm your exact eligibility during a free consultation.
              </p>
            </Reveal>

            {/* Rebate cards */}
            <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {REBATES.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.04}>
                  <div className="bg-[#FDFBF7] border border-[#E7E5E4] rounded-2xl p-7 h-full flex flex-col" data-testid={`rebate-${i}`}>
                    <div className="w-11 h-11 rounded-xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center">
                      <r.icon className="w-5 h-5" />
                    </div>
                    <div className="mt-5">
                      <div className="text-[10px] tracking-[0.2em] uppercase text-[#166534] font-bold">{r.tag}</div>
                      <h3 className="font-display text-lg font-medium mt-2 leading-snug">{r.title}</h3>
                    </div>
                    <p className="mt-3 text-sm text-[#57534E] leading-relaxed">{r.summary}</p>
                    <dl className="mt-5 pt-5 border-t border-[#E7E5E4] space-y-2 text-xs">
                      <div>
                        <dt className="text-[#57534E] font-semibold uppercase tracking-wide">Who qualifies</dt>
                        <dd className="text-[#1C1917] mt-1">{r.who}</dd>
                      </div>
                      <div>
                        <dt className="text-[#57534E] font-semibold uppercase tracking-wide">How to claim</dt>
                        <dd className="text-[#1C1917] mt-1">{r.how}</dd>
                      </div>
                      <div className="pt-2">
                        <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#166534]">
                          <Check className="w-4 h-4" /> {r.value}
                        </div>
                      </div>
                    </dl>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* How to claim — 3 steps */}
            <Reveal>
              <div className="mt-16 grid md:grid-cols-3 gap-6">
                {[
                  { n: "01", title: "Choose a CEC-accredited retailer", body: "That's us — required to unlock the federal STC rebate. We handle all the paperwork." },
                  { n: "02", title: "We calculate every rebate you qualify for", body: "STC upfront, plus any state-specific programs stacked on top of the price we quote." },
                  { n: "03", title: "You pay the discounted price only", body: "We claim the rebates on your behalf and apply them directly to your invoice." },
                ].map((s) => (
                  <div key={s.n} className="bg-[#1C1917] text-[#FDFBF7] rounded-2xl p-8" data-testid={`claim-step-${s.n}`}>
                    <div className="font-display text-4xl text-[#FBBF24] font-light">{s.n}</div>
                    <div className="font-display text-lg font-medium mt-4">{s.title}</div>
                    <div className="text-sm text-[#D6D3D1] mt-2 leading-relaxed">{s.body}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* PDRS HVAC incentives */}
        <section id="pdrs" className="section-pad" data-testid="pdrs-section">
          <div className="container-final">
            <Reveal>
              <div className="overline inline-flex items-center gap-2 text-[#166534]">
                <Leaf className="h-4 w-4" /> NSW Net Zero · Commercial HVAC
              </div>
              <h2 className="display-lead mt-4 max-w-3xl">
                <span className="font-semibold">PDRS incentives for upgrading your HVAC.</span>
              </h2>
              <p className="mt-5 text-[#57534E] max-w-2xl">
                The NSW <strong>Peak Demand Reduction Scheme (PDRS)</strong> — part of the state&apos;s Net Zero plan — pays businesses to install high-efficiency air conditioning. Each 0.1&nbsp;kW of peak demand you cut earns a Peak Reduction Certificate (PRC), which we convert into an upfront discount on your HVAC install.
              </p>
            </Reveal>

            <div className="mt-12 grid lg:grid-cols-12 gap-8">
              {/* Left: how it works */}
              <Reveal className="lg:col-span-5">
                <div className="space-y-4">
                  {[
                    { n: "01", title: "Who qualifies", body: "NSW businesses installing or replacing air conditioning with high-efficiency, GEMS-registered systems — warehouses, cold storage and restaurants are ideal candidates." },
                    { n: "02", title: "How it's paid", body: "No paperwork for you. As part of an accredited pathway, we calculate the PRCs your upgrade earns and apply the value as a point-of-sale discount on your quote." },
                    { n: "03", title: "Why it's generous", body: "PRCs are earned on 12 years of peak demand reduction — so efficient VRF and ducted systems from Mitsubishi Electric, Daikin, ActronAir and Midea can attract thousands off." },
                  ].map((s) => (
                    <div key={s.n} className="bg-[#1C1917] text-[#FDFBF7] rounded-2xl p-7" data-testid={`pdrs-step-${s.n}`}>
                      <div className="flex items-start gap-4">
                        <div className="font-display text-2xl text-[#FBBF24] font-light">{s.n}</div>
                        <div>
                          <div className="font-display text-lg font-medium">{s.title}</div>
                          <div className="text-sm text-[#D6D3D1] mt-1.5 leading-relaxed">{s.body}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Right: estimator */}
              <Reveal delay={0.1} className="lg:col-span-7">
                <PdrsEstimator />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-pad">
          <div className="container-final">
            <div className="rounded-[var(--radius-card)] bg-[#D97706] text-[#FDFBF7] p-10 md:p-16 flex flex-wrap items-center justify-between gap-6">
              <div>
                <div className="overline text-[#1C1917]/70">Ready to save?</div>
                <h2 className="display-lead mt-3 max-w-xl text-[#FDFBF7]">
                  <span className="font-semibold">
                    We&apos;ll do a free site check and confirm every rebate you can claim.
                  </span>
                </h2>
              </div>
              <Link
                href="/contact"
                data-testid="savings-cta-final"
                className="inline-flex items-center gap-2 rounded-full bg-[#1C1917] hover:bg-[#292524] text-[#FDFBF7] px-7 py-3.5 font-medium transition-colors"
              >
                Book my free consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function PdrsEstimator() {
  const [venue, setVenue] = useState("warehouse");
  const [coolingKw, setCoolingKw] = useState<number | string>(100);
  const est = useMemo(() => pdrsEstimate(venue, Number(coolingKw)), [venue, coolingKw]);
  const v = PDRS_VENUES[venue];

  return (
    <div className="bg-[#F5F5F0] border border-[#E7E5E4] rounded-[var(--radius-card)] p-8 md:p-10 h-full" data-testid="pdrs-estimator">
      <div className="inline-flex items-center gap-2 text-[#D97706] text-xs tracking-[0.2em] uppercase font-bold">
        <Calculator className="w-4 h-4" /> PDRS incentive estimator
      </div>

      <div className="mt-7">
        <label className="text-xs tracking-wide uppercase text-[#57534E] font-semibold">Business type</label>
        <div className="mt-3 grid sm:grid-cols-3 gap-3">
          {Object.entries(PDRS_VENUES).map(([k, opt]) => (
            <button
              key={k}
              type="button"
              onClick={() => setVenue(k)}
              data-testid={`pdrs-venue-${k}`}
              className={`rounded-xl border p-4 text-left transition-colors ${venue === k ? "border-[#D97706] bg-[#FDFBF7]" : "border-[#E7E5E4] bg-[#FDFBF7]/60 hover:border-[#D97706]/50"}`}
            >
              <opt.icon className={`w-5 h-5 ${venue === k ? "text-[#D97706]" : "text-[#57534E]"}`} />
              <div className="text-sm font-medium mt-2 leading-snug">{opt.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <label className="text-xs tracking-wide uppercase text-[#57534E] font-semibold">Total cooling capacity (kW)</label>
        <div className="flex items-center gap-4 mt-2">
          <input
            type="number"
            min="30"
            max="500"
            step="10"
            value={coolingKw}
            onChange={(e) => setCoolingKw(e.target.value)}
            data-testid="pdrs-capacity-input"
            className="w-28 px-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] text-lg font-medium outline-none focus:border-[#D97706]"
          />
          <input
            type="range"
            min="30"
            max="500"
            step="10"
            value={coolingKw || 30}
            onChange={(e) => setCoolingKw(Number(e.target.value))}
            className="flex-1 accent-[#D97706]"
            data-testid="pdrs-capacity-slider"
          />
        </div>
        <p className="text-xs text-[#57534E] mt-2">Commercial PDRS HVAC activity applies from 30 kW cooling capacity. A 100 kW system ≈ a mid-size warehouse.</p>
      </div>

      {est && (
        <div className="mt-8 bg-[#FDFBF7] border border-[#E7E5E4] rounded-2xl p-7" data-testid="pdrs-result">
          <div className="overline text-[#166534]">Indicative PDRS incentive</div>
          <div className="font-display text-3xl md:text-4xl font-medium tracking-tight mt-2 text-[#166534]" data-testid="pdrs-result-range">
            {currency(est.low)} – {currency(est.high)}
          </div>
          <div className="text-sm text-[#57534E] mt-2">
            ≈ {est.prcs.toLocaleString("en-AU")} Peak Reduction Certificates · applied as an upfront discount
          </div>
          <div className="text-xs text-[#57534E] mt-3 leading-relaxed">{v.note}</div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              data-testid="pdrs-cta-quote"
              className="inline-flex items-center gap-2 rounded-full bg-[#166534] hover:bg-[#14532D] text-[#FDFBF7] px-6 py-3 text-sm font-medium transition-colors"
            >
              Get my exact PDRS quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      <div className="mt-5 flex gap-2.5">
        <Info className="w-4 h-4 text-[#D97706] mt-0.5 shrink-0" />
        <p className="text-xs text-[#57534E] leading-relaxed">
          Indicative only. Final incentive depends on the GEMS-registered efficiency of the equipment installed, your existing system, and the market price of PRCs at install time — confirmed in your formal quote.
        </p>
      </div>
    </div>
  );
}

interface ResultTileProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  tone?: "neutral" | "orange" | "green";
}

function ResultTile({ icon: Icon, label, value, sub, tone = "neutral" }: ResultTileProps) {
  const toneMap = {
    neutral: "bg-[#F5F5F0] text-[#1C1917]",
    orange:  "bg-[#FFF7ED] text-[#9A3412]",
    green:   "bg-[#F0FDF4] text-[#166534]",
  };
  return (
    <div className={`${toneMap[tone]} rounded-2xl p-5 border border-[#E7E5E4]`}>
      <div className="flex items-center gap-2 text-xs tracking-wide uppercase font-semibold opacity-80">
        <Icon className="w-3.5 h-3.5" /> {label}
      </div>
      <div className="font-display text-2xl md:text-3xl font-medium mt-2 tracking-tight">{value}</div>
      <div className="text-xs opacity-70 mt-1">{sub}</div>
    </div>
  );
}

