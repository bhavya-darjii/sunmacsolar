import Reveal from "@/components/Reveal";
import { Settings2 } from "lucide-react";

export default function DiscoverySection() {
  return (
    <section className="container-final border-t border-[#e7e5e4] py-14 md:py-20">
      <Reveal>
        <div className="grid gap-8 md:grid-cols-[120px_1fr] md:items-start">
          <div className="flex flex-col gap-3">
            <Settings2 className="h-6 w-6 text-[#78716c]" strokeWidth={1.5} />
            <p className="text-xs font-medium text-[#78716c]">2025 — Present</p>
          </div>
          <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-light leading-snug text-[#1c1917]">
            Discover more about our{" "}
            <span className="font-semibold">offerings, expertise and mission.</span>
          </h2>
        </div>
      </Reveal>
    </section>
  );
}
