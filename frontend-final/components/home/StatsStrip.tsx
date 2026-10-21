import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp } from "@/hooks/use-count-up";
import Reveal from "@/components/Reveal";

interface StatItem {
  id: string;
  prefix: string;
  value: number;
  suffix: string;
  label: string;
  decimals: number;
  /** Accessible label for screen readers (full sentence) */
  ariaLabel: string;
  /** If true, renders a CO₂ subscript badge after the suffix */
  carbonUnit?: boolean;
}

const STATS: StatItem[] = [
  {
    id: "capacity",
    prefix: "",
    value: 87.4,
    suffix: " MW",
    label: "Total Capacity\nInstalled",
    decimals: 1,
    ariaLabel: "87.4 megawatts of total capacity installed",
  },
  {
    id: "assets",
    prefix: "",
    value: 1240,
    suffix: "+",
    label: "Assets\nInstalled",
    decimals: 0,
    ariaLabel: "Over 1,240 assets installed",
  },
  {
    id: "savings",
    prefix: "$",
    value: 34.2,
    suffix: "M",
    label: "Total Savings\nGenerated",
    decimals: 1,
    ariaLabel: "$34.2 million in total savings generated",
  },
  {
    id: "carbon",
    prefix: "",
    value: 58900,
    suffix: "",
    label: "Carbon Emission\nReduced",
    decimals: 0,
    ariaLabel: "Over 58,900 tonnes of carbon emissions reduced",
    carbonUnit: true,
  },
];

function StatCell({
  stat,
  delay,
  inView,
}: {
  stat: StatItem;
  delay: number;
  inView: boolean;
}) {
  const count = useCountUp(stat.value, 4000, inView, stat.decimals);

  return (
    <div
      className="stats-cell flex flex-col items-center text-center px-2 sm:px-4 lg:px-5 xl:px-8 py-6 lg:py-0"
      style={{
        animation: inView
          ? `stats-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s both`
          : "none",
      }}
      aria-label={stat.ariaLabel}
    >
      <p className="stats-digit" aria-hidden style={{ whiteSpace: "nowrap" }}>
        {stat.prefix}
        {count}
        <span className="stats-suffix">{stat.suffix}</span>
        {stat.carbonUnit && (
          <span className="stats-suffix stats-co2">
            {" "}CO<sub>2</sub>
          </span>
        )}
      </p>
      <p className="stats-label">
        {stat.label.split("\n").map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}

export default function StatsStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.05, margin: "120px 0px", once: true });

  return (
    <section
      ref={sectionRef}
      className="stats-strip-section"
      data-testid="stats-strip"
      aria-label="Impact numbers"
    >
      <div className="container-final max-w-[96rem] px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <Reveal variant="rise">
            <h2 className="display-lead">
              Our impact.{" "}
              <span className="font-semibold">Across Australia.</span>
            </h2>
          </Reveal>
        </div>

        {/* 4-column stat grid */}
        <div className="stats-grid" role="list">
          {STATS.map((stat, index) => (
            <div key={stat.id} role="listitem" className="stats-grid-item">
              <StatCell
                stat={stat}
                delay={index * 0.09}
                inView={inView}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
