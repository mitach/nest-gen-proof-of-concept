import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This skips *all* ESLint checks on build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
