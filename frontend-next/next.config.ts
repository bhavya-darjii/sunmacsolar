import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/projects/:slug", destination: "/project-detail?slug=:slug" },
      { source: "/blog/:slug", destination: "/blog-post?slug=:slug" },
      { source: "/admin/leads", destination: "/admin-leads" },
    ];
  },
};

export default nextConfig;
