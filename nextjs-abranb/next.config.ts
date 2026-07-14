import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "dist",
  /* config options here */
  images: {
    domains: ["cdn.sanity.io"],
  },
};

export default nextConfig;

