import { useEffect, useRef, useState } from "react";

/**
 * Formats a numeric value with optional decimals or standard Australian locale formatting.
 */
function formatNumber(val: number, decimals: number): string {
  if (decimals > 0) {
    return val.toFixed(decimals);
  }
  return Math.round(val).toLocaleString("en-AU");
}

/**
 * Animates a number from 0 → target when `inView` is true.
 * Uses easeInOutQuint so the counter starts slowly, rises through the middle,
 * and decelerates smoothly at the end — subtle and premium-looking.
 *
 * @param target   - The final numeric value to count up to
 * @param duration - Animation duration in ms
 * @param inView   - When true, triggers the counter roll
 * @param decimals - Number of decimal places to display
 */
export function useCountUp(
  target: number,
  duration: number = 3000,
  inView: boolean = false,
  decimals: number = 0
): string {
  // Always initialize to the target value so SSR & initial render always show valid figures
  const [display, setDisplay] = useState(() => formatNumber(target, decimals));
  const hasRunRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only animate once when inView becomes true
    if (!inView || hasRunRef.current) return;
    hasRunRef.current = true;

    // easeInOutQuint — starts slow, gentle rise, decelerates smoothly at the end
    const easeInOutQuint = (t: number) =>
      t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = easeInOutQuint(progress) * target;

      setDisplay(formatNumber(current, decimals));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(formatNumber(target, decimals));
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, target, duration, decimals]);

  return display;
}
