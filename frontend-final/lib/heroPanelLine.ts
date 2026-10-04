/** hero-section.png intrinsic size */
const HERO_IMAGE_WIDTH = 1491;
const HERO_IMAGE_HEIGHT = 1055;

/** Matches `.hero-cover-image { object-position: center 90% }` */
const OBJECT_POSITION_Y = 0.9;

/** Optical shift: positive moves SunMac down on the hero */
const PANEL_LINE_OFFSET_PCT = 7;

/**
 * Horizon in the source image (0–1 from top). Interpolated by viewport aspect ratio
 * so the panel edge stays aligned with SunMac from phone → desktop.
 */
function horizonFraction(viewportWidth: number, viewportHeight: number): number {
  const aspect = viewportWidth / viewportHeight;
  const aspectNarrow = 0.46;
  const aspectWide = 1.78;
  const horizonNarrow = 0.506;
  const horizonWide = 0.631;
  const t = Math.min(
    1,
    Math.max(0, (aspect - aspectNarrow) / (aspectWide - aspectNarrow))
  );
  return horizonNarrow + t * (horizonWide - horizonNarrow);
}

/**
 * Where the panel top edge sits as % of hero height, for object-fit: cover
 * and a fixed object-position Y — stays in sync with the photo on resize.
 */
export function heroPanelLinePercent(
  viewportWidth: number,
  viewportHeight: number
): number {
  if (viewportWidth <= 0 || viewportHeight <= 0) return 52;

  const horizonY = horizonFraction(viewportWidth, viewportHeight);

  const scale = Math.max(
    viewportWidth / HERO_IMAGE_WIDTH,
    viewportHeight / HERO_IMAGE_HEIGHT
  );

  const linePx =
    OBJECT_POSITION_Y * viewportHeight +
    scale * HERO_IMAGE_HEIGHT * (horizonY - OBJECT_POSITION_Y);

  return (linePx / viewportHeight) * 100 + PANEL_LINE_OFFSET_PCT;
}
