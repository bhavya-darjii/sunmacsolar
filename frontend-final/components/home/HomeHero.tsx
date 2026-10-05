import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import HomeHeader from "./HomeHeader";
import { heroPanelLinePercent } from "@/lib/heroPanelLine";
import { useHysteresisInView } from "@/hooks/use-hysteresis-in-view";

const HERO_IMAGE = "/hero-section.png";
const ease = [0.22, 1, 0.36, 1] as const;

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const heroInView = useHysteresisInView(sectionRef, {
    amount: 0.25,
    rootMargin: "0px 0px -8% 0px",
  });
  const show = reduceMotion || heroInView;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const sunMacScrollY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 96]);

  const sunMacScrollOpacity = useTransform(scrollYProgress, (progress) => {
    if (reduceMotion) return 1;
    if (progress <= 0.08) return 1;
    if (progress >= 0.58) return 0;
    const t = (progress - 0.08) / 0.5;
    return 1 - t;
  });

  const [panelLinePct, setPanelLinePct] = useState(72);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const update = () => {
      setPanelLinePct(heroPanelLinePercent(el.clientWidth, el.clientHeight));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] w-full min-h-[600px] bg-[#1c1917]"
    >
      <div className="hero-background-shell absolute inset-0 overflow-hidden">
        <div className="hero-background-motion absolute inset-0">
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
      </div>

      <HomeHeader heroInView={show} />

      <div
        className="pointer-events-none absolute inset-x-0 z-[5] px-5 md:px-8"
        style={{ top: `${panelLinePct}%` }}
      >
        <div className="hero-sunmac-anchor w-full">
          <motion.div
            className="w-full"
            style={{ opacity: sunMacScrollOpacity }}
          >
            <motion.div
              initial={false}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.9, delay: show ? 0.15 : 0, ease }}
            >
              <motion.h1
                style={{ y: sunMacScrollY }}
                className="hero-word w-full text-center text-white"
              >
                SunMac
              </motion.h1>
            </motion.div>
          </motion.div>
        </div>
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
