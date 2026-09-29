"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=85";

export default function EnergyTransition() {
  return (
    <section className="container-final pb-20 md:pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[var(--radius-card)]">
          <div className="relative aspect-[16/7] min-h-[240px] md:aspect-[21/9] md:min-h-[320px]">
            <Image
              src={BANNER_IMAGE}
              alt="Solar panels in a field"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/55 via-[#1c1917]/15 to-transparent" />

            <p className="absolute inset-x-6 bottom-[18%] max-w-2xl text-center font-display text-lg font-medium leading-snug text-white md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:text-2xl md:leading-snug">
              To transition to a more stable, reliable and sustainable energy supply.
            </p>
          </div>

          <div className="segment-bar flex h-1.5 gap-1 bg-[#1c1917]/10">
            <span className="flex-[3] bg-[#1c1917]" />
            <span className="flex-[2] bg-[#d97706]" />
            <span className="flex-[2] bg-[#166534]" />
            <span className="flex-[1] bg-[#e7e5e4]" />
            <span className="flex-[2] bg-[#57534e]" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
