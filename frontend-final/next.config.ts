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
  async rewrites() {
    return [
      { source: "/projects/:slug", destination: "/project-detail?slug=:slug" },
      { source: "/blog/:slug", destination: "/blog-post?slug=:slug" },
      { source: "/admin/leads", destination: "/admin-leads" },
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
