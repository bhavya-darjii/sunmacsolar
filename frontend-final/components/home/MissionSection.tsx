import Reveal from "@/components/Reveal";
import Image from "next/image";
import { MASCOT } from "@/data/site";

const AVATARS = [
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
];

export default function MissionSection() {
  return (
    <section className="container-final py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-[minmax(0,200px)_1fr] md:gap-16">
        <Reveal>
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#78716c] uppercase">
              Who we are
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-sm">
                <Image
                  src={MASCOT.url}
                  alt={MASCOT.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex -space-x-2">
                {AVATARS.map((src, i) => (
                  <div
                    key={src}
                    className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white"
                    style={{ zIndex: 3 - i }}
                  >
                    <Image src={src} alt="" fill className="object-cover" sizes="36px" />
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[#78716c]">
              CEC-approved retailer with an in-house installation team — 50+ MW installed
              nationwide and trusted by Australian farmers.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.15] text-[#1c1917]">
            A specialist solar partner — from a single rooftop to a 5MW farm,{" "}
            <span className="font-normal text-[#a8a29e]">
              engineered in-house and installed without sub-contracted labour.
            </span>
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
