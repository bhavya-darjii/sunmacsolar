import Reveal from "@/components/Reveal";
import { Sun } from "lucide-react";
import { MASCOT } from "@/data/site";

export default function DiscoverySection() {
  return (
    <section className="container-final border-t border-[#e7e5e4] py-14 md:py-20">
      <Reveal>
        <div className="grid gap-8 md:grid-cols-[120px_1fr] md:items-start">
          <div className="flex flex-col gap-3">
            <Sun className="h-6 w-6 text-[#78716c]" strokeWidth={1.5} />
            <p className="text-xs font-medium text-[#78716c]">Meet {MASCOT.name}</p>
          </div>
          <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-light leading-snug text-[#1c1917]">
            {MASCOT.name} — our off-grid mate.{" "}
            <span className="font-semibold">
              Rugged, friendly solar guidance from Camellia rooftops to outback stations.
            </span>
          </h2>
        </div>
      </Reveal>
    </section>
  );
}
