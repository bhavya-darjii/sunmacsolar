/**
 * Local copies of photos that used to be loaded from Unsplash. Blog posts come from the API with
 * the Unsplash links in their cover_image, so the blog swaps in the local copy when there is one:
 * fetching a full-size original from Unsplash took several seconds on each first view.
 */
const LOCAL_COPIES: [unsplashId: string, localPath: string][] = [
  ["photo-1724041875334-0a6397111c7e", "/images/photos/commercial-rooftop-solar.webp"],
  ["photo-1717702576954-c07131c54169", "/images/photos/farm-field-sunset.webp"],
  ["photo-1566838616631-f2618f74a6a2", "/images/photos/off-grid-solar-house.webp"],
  ["photo-1780445392417-68b9dccc45f2", "/images/photos/home-battery-system.webp"],
  ["photo-1497435334941-8c899ee9e8e9", "/images/photos/solar-inverters.webp"],
  ["photo-1774290331891-5d759056c68d", "/images/photos/commercial-hvac.webp"],
];

export function localImage(src: string): string {
  if (!src.includes("images.unsplash.com")) return src;
  return LOCAL_COPIES.find(([id]) => src.includes(id))?.[1] ?? src;
}
