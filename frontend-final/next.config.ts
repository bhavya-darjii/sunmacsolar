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
