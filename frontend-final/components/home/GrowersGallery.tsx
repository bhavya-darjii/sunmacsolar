import Reveal from "@/components/Reveal";
import Image from "next/image";
import Link from "next/link";
import { useInView, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
  type WheelEvent,
} from "react";
import { PROJECTS } from "@/data/site";

const GALLERY = PROJECTS.map((project) => ({
  src: project.image,
  caption: project.title,
  href: `/projects/${project.slug}`,
}));

/**
 * The row holds four copies of the set and is kept scrolled inside the middle of them, so there
 * is always a spare copy on each side and neither end is ever reached, however wide the screen.
 */
const COPIES = 4;
/** The copy that keyboard and screen-reader users get; the others are decorative twins. */
const REAL_COPY = 1;

const LOOP_ITEMS = Array.from({ length: COPIES }, (_, copy) =>
  GALLERY.map((item) => ({ ...item, copy }))
).flat();

/** Speed of the slow automatic drift */
const DRIFT_PX_PER_SEC = 28;
/** How long the drift waits after someone scrolls the row themselves */
const RESUME_AFTER_MS = 2500;
/** Mouse movement before a press counts as a drag, not a click */
const DRAG_THRESHOLD_PX = 5;

type GalleryItem = (typeof GALLERY)[number];

function GalleryCard({ item, decorative }: { item: GalleryItem; decorative?: boolean }) {
  return (
    <Link
      href={item.href}
      draggable={false}
      className="block shrink-0"
      aria-hidden={decorative ? true : undefined}
      tabIndex={decorative ? -1 : undefined}
    >
      <figure className="w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-white shadow-sm ring-1 ring-[#e7e5e4]/80">
          <Image
            src={item.src}
            alt={decorative ? "" : item.caption}
            fill
            draggable={false}
            className="object-cover transition duration-500 hover:scale-105"
            sizes="260px"
          />
        </div>
        <figcaption className="mt-3 line-clamp-2 text-center text-sm font-semibold leading-snug text-[#1c1917] md:mt-4 md:text-base">
          {item.caption}
        </figcaption>
      </figure>
    </Link>
  );
}

export default function GrowersGallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(scrollerRef, { amount: 0.08, margin: "80px" });
  const reduceMotion = useReducedMotion();

  /** Width of one copy of the set, including its trailing gap */
  const setWidth = useRef(0);
  /** Reasons the drift is on hold */
  const hold = useRef({ hover: false, touch: false, focus: false, drag: false });
  /** Drift stays paused until this time (performance.now()) */
  const resumeAt = useRef(0);
  const drag = useRef<{
    pointerId: number;
    startX: number;
    startLeft: number;
    active: boolean;
  } | null>(null);
  /** A mouse drag that ends on a card must not open it */
  const suppressClick = useRef(false);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.children[0] as HTMLElement | undefined;
    const nextCopy = track.children[GALLERY.length] as HTMLElement | undefined;
    if (!first || !nextCopy) return;
    setWidth.current = nextCopy.offsetLeft - first.offsetLeft;
  }, []);

  // Keep the scroll position between half a set and one-and-a-half sets from the start. Stepping
  // a whole set left or right lands on an identical picture, so the jump can't be seen.
  const wrap = useCallback(() => {
    const el = scrollerRef.current;
    const width = setWidth.current;
    if (!el || width <= 0) return;
    // A card with keyboard focus would be carried off screen by the jump
    if (el.querySelector("a:focus-visible")) return;

    let shift = 0;
    if (el.scrollLeft < width * 0.5) shift = width;
    else if (el.scrollLeft >= width * 1.5) shift = -width;
    if (!shift) return;

    el.scrollLeft += shift;
    if (drag.current) drag.current.startLeft += shift;
  }, []);

  const pauseDrift = useCallback(() => {
    resumeAt.current = performance.now() + RESUME_AFTER_MS;
  }, []);

  useLayoutEffect(() => {
    const el = scrollerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    measure();
    // Start on the second copy: it looks exactly like the server-rendered row at scroll 0
    el.scrollLeft = setWidth.current;

    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      const before = setWidth.current;
      measure();
      // Cards change width at breakpoints: keep the same card at the left edge
      if (before > 0 && setWidth.current !== before) {
        el.scrollLeft = (el.scrollLeft / before) * setWidth.current;
      }
      wrap();
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure, wrap]);

  // The slow drift, only while the row is on screen and nobody is using it
  useEffect(() => {
    if (reduceMotion || !inView) return;
    const el = scrollerRef.current;
    if (!el) return;

    let frame = 0;
    let last = performance.now();
    // Browsers round scroll positions to whole (device) pixels, so the fraction that was not
    // applied this frame is carried into the next one.
    let carry = 0;

    const tick = (now: number) => {
      const elapsed = Math.min(now - last, 50);
      last = now;
      const h = hold.current;
      if (!h.hover && !h.touch && !h.focus && !h.drag && now >= resumeAt.current) {
        carry = Math.min(carry + (DRIFT_PX_PER_SEC * elapsed) / 1000, 4);
        const before = el.scrollLeft;
        el.scrollLeft = before + carry;
        carry -= el.scrollLeft - before;
      } else {
        carry = 0;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion]);

  // Mouse only: press and drag to scroll. Touch and trackpads scroll the row natively.
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startLeft: event.currentTarget.scrollLeft,
      active: false,
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current || event.pointerId !== current.pointerId) return;
    const el = event.currentTarget;
    const deltaX = event.clientX - current.startX;

    if (!current.active) {
      if (Math.abs(deltaX) < DRAG_THRESHOLD_PX) return;
      current.active = true;
      hold.current.drag = true;
      el.setPointerCapture(event.pointerId);
      el.classList.add("is-dragging");
    }
    el.scrollLeft = current.startLeft - deltaX;
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current || event.pointerId !== current.pointerId) return;
    drag.current = null;
    if (!current.active) return;

    hold.current.drag = false;
    event.currentTarget.classList.remove("is-dragging");
    pauseDrift();
    // The click that follows a drag fires before this timer, and is swallowed below
    suppressClick.current = true;
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 0);
  };

  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!suppressClick.current) return;
    event.preventDefault();
    event.stopPropagation();
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    // Sideways trackpad swipes and shift + wheel scroll the row; plain vertical wheel does not
    if (event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) pauseDrift();
  };

  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    // Only keyboard focus holds the row still; a mouse press on a card also focuses it
    if (event.target.matches(":focus-visible")) hold.current.focus = true;
  };

  return (
    <section className="overflow-hidden pb-14 md:pb-18">
      <div className="container-final">
        <Reveal variant="rise">
          <h2 className="display-lead mx-auto max-w-4xl text-center">
            Real systems, delivered across Australia.{" "}
            <span className="font-semibold">
              From commercial rooftops and irrigation pivots to fully off-grid homesteads.
            </span>
          </h2>
        </Reveal>
      </div>

      <div
        ref={scrollerRef}
        className="growers-scroller mt-12 md:mt-14"
        role="group"
        aria-label="Featured project gallery"
        data-testid="home-project-gallery"
        onScroll={wrap}
        onWheel={onWheel}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") hold.current.hover = true;
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") hold.current.hover = false;
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(event) => event.preventDefault()}
        onTouchStart={() => {
          hold.current.touch = true;
        }}
        onTouchEnd={() => {
          hold.current.touch = false;
          pauseDrift();
        }}
        onTouchCancel={() => {
          hold.current.touch = false;
          pauseDrift();
        }}
        onFocus={onFocus}
        onBlur={() => {
          hold.current.focus = false;
        }}
      >
        <div ref={trackRef} className="growers-track flex w-max gap-5 md:gap-6">
          {LOOP_ITEMS.map((item) => (
            <GalleryCard
              key={`${item.copy}-${item.href}`}
              item={item}
              decorative={item.copy !== REAL_COPY}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
