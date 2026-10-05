import { RefObject, useEffect, useState } from "react";

type HysteresisInViewOptions = {
  /** Visible ratio required to enter / replay (0–1). */
  amount?: number;
  /** Stay revealed after the first time in view. */
  once?: boolean;
  rootMargin?: string;
  /** Reset only when visibility drops below this (avoids edge flicker). */
  exitAmount?: number;
};

/**
 * Intersection with enter/exit thresholds so scroll reveals can replay without
 * stuttering when a section only peeks into the viewport.
 */
export function useHysteresisInView(
  ref: RefObject<Element | null>,
  {
    amount = 0.12,
    once = false,
    rootMargin = "0px 0px -4% 0px",
    exitAmount = 0.035,
  }: HysteresisInViewOptions = {}
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const enterAt = Math.min(Math.max(amount, 0.06), 0.45);
    const exitAt = Math.min(exitAmount, enterAt * 0.5);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const ratio = entry.intersectionRatio;

        setInView((prev) => {
          if (once && prev) return true;

          if (!entry.isIntersecting || ratio <= exitAt) {
            return once ? prev : false;
          }
          if (ratio >= enterAt) {
            return true;
          }
          return prev;
        });
      },
      {
        threshold: [0, exitAt, enterAt, 0.2, 0.35, 0.5, 0.65, 0.85, 1],
        rootMargin,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [amount, once, rootMargin, exitAmount]);

  return inView;
}
