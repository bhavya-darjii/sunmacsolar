import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/savings",
        destination: "/calculator",
        permanent: true,
      },
      // Old numeric project URLs → new slug URLs
      { source: "/projects/0", destination: "/projects/commercial-86kw-rooftop", permanent: true },
      { source: "/projects/1", destination: "/projects/camellia-industrial-park-rooftop", permanent: true },
      { source: "/projects/2", destination: "/projects/riverina-centre-pivot-solar-irrigation", permanent: true },
      { source: "/projects/3", destination: "/projects/outback-station-off-grid-homestead", permanent: true },
      { source: "/projects/4", destination: "/projects/hunter-valley-battery-retrofit", permanent: true },
      { source: "/projects/5", destination: "/projects/commercial-motel-rooftop-solar", permanent: true },
      { source: "/projects/6", destination: "/projects/bush-retreat-hotel-solar-installation", permanent: true },
    ];
  },
  async headers() {
    return [
      // The pictures SunMac's emails load (public/email/). Gmail fetches every email picture
      // through its own image proxy; a day's caching lets the proxy and mail apps keep a copy
      // instead of asking again each time an email opens. Same names, so a new picture shows
      // within a day.
      {
        source: "/email/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/projects/:slug", destination: "/project-detail?slug=:slug" },
      { source: "/blog/:slug", destination: "/blog-post?slug=:slug" },
      { source: "/admin/leads", destination: "/admin-leads" },
      // A mail app's one-click unsubscribe posts here (List-Unsubscribe); the page is
      // pages/unsubscribe.tsx.
      { source: "/unsubscribe/one-click", destination: "/api/unsubscribe/one-click" },
    ];
  },
  images: {
    qualities: [75, 90],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "customer-assets.emergentagent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
