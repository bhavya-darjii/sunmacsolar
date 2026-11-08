import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useHysteresisInView } from "@/hooks/use-hysteresis-in-view";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Fraction of the element visible before animating (0–1) */
  amount?: number;
  /** "fade" = opacity + slide. "rise" = slide only (keeps cards visible while waiting). */
  variant?: "fade" | "rise";
  /** When true, reveal only the first time (no reset on scroll away). */
  once?: boolean;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Reveal({
  children,
  delay = 0,
  y = 36,
  className = "",
  amount = 0.12,
  variant = "fade",
  once = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useHysteresisInView(ref, { amount, once });

  const riseOnly = variant === "rise";
  const hidden = riseOnly
    ? { opacity: 1, y: Math.min(y, 28) }
    : { opacity: 0, y };
  const shown = { opacity: 1, y: 0 };

  // Reduced motion still renders the same motion.div as the server did. Swapping
  // to a plain <div> here caused a hydration mismatch that React never patches,
  // leaving the server's `opacity: 0` in place, so content stayed invisible for
  // anyone with "Reduce Motion" turned on (common on phones).
  return (
    <motion.div
      ref={ref}
      className={`overflow-visible ${className}`.trim()}
      initial={hidden}
      animate={reduceMotion || inView ? shown : hidden}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.75, delay: inView ? delay : 0, ease }
      }
      data-in-view={inView ? "" : undefined}
      data-reveal-instant={inView ? "" : undefined}
    >
      {children}
    </motion.div>
  );
}
