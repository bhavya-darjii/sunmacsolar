"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Fraction of the element visible before animating (0–1) */
  amount?: number;
  /** "fade" = opacity + slide. "rise" = slide only (keeps cards visible while waiting). */
  variant?: "fade" | "rise";
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Reveal({
  children,
  delay = 0,
  y = 20,
  className = "",
  amount = 0.08,
  variant = "fade",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, {
    once: true,
    amount,
    margin: "0px 0px -4% 0px",
  });

  const riseOnly = variant === "rise";
  const hidden = riseOnly
    ? { opacity: 1, y: Math.min(y, 16) }
    : { opacity: 0, y };
  const shown = { opacity: 1, y: 0 };

  if (reduceMotion) {
    return (
      <div className={className} data-in-view data-reveal-instant>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView ? shown : hidden}
      transition={{ duration: 0.65, delay: inView ? delay : 0, ease }}
      data-in-view={inView ? "" : undefined}
      data-reveal-instant={inView ? "" : undefined}
    >
      {children}
    </motion.div>
  );
}
