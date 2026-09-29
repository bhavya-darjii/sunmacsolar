"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import HomeHeader from "./HomeHeader";

const HERO_IMAGE = "/hero-section.png";

export default function HomeHero() {
  return (
    <section className="relative h-[100dvh] w-full min-h-[600px] bg-[#1c1917]">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Agricultural silo against blue sky"
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

      <HomeHeader />

      <div className="relative flex h-full flex-col items-center justify-center px-5 md:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="hero-word w-full max-w-[100vw] -translate-y-8 text-center uppercase text-white md:-translate-y-12"
        >
          SunMac
        </motion.h1>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 pb-8 md:pb-10">
        <div className="flex w-full flex-col items-stretch gap-3 px-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-fit max-w-full"
          >
            <p className="glass-surface-light hero-glass-pill text-left text-sm font-medium leading-snug text-white/90 md:text-[15px]">
              Power your business, farm or remote home{" "}
              <span className="text-sunmac-amber">with the sun.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0"
          >
            <Link href="/contact" className="glass-surface-light hero-quote-cta">
              Get a Quote
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
