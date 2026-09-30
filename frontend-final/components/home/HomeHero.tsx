"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import HomeHeader from "./HomeHeader";

const HERO_IMAGE = "/hero-section.png";
const ease = [0.22, 1, 0.36, 1] as const;

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const heroInView = useInView(sectionRef, {
    once: false,
    amount: 0.25,
    margin: "0px 0px -8% 0px",
  });
  const show = reduceMotion || heroInView;

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] w-full min-h-[600px] bg-[#1c1917]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Commercial solar installation across an Australian rooftop"
          fill
          priority
          className="hero-cover-image"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#1c1917]/35 via-black/10 to-[#1c1917]/55"
          aria-hidden
        />
      </div>

      <HomeHeader heroInView={show} />

      <div className="relative flex h-full flex-col items-center justify-center px-5 md:px-8">
        <motion.h1
          initial={false}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.9, delay: show ? 0.15 : 0, ease }}
          className="hero-word w-full max-w-[100vw] -translate-y-9 text-center uppercase text-white md:-translate-y-12"
        >
          SunMac
        </motion.h1>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 pb-8 md:pb-10">
        <div className="flex w-full flex-col items-stretch gap-3 px-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:px-8">
          <p className="glass-surface-light hero-glass-pill w-fit max-w-full text-left text-sm font-medium leading-snug text-white/90 md:text-[15px]">
            Power your business, farm or remote home{" "}
            <span className="text-sunmac-amber">with the sun.</span>
          </p>

          <Link href="/contact" className="glass-surface-light hero-quote-cta shrink-0">
            Request a free quote
          </Link>
        </div>
      </div>
    </section>
  );
}
