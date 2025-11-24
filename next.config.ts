import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Support for TypeScript
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  // Allow importing images from attached_assets
  images: {
    remotePatterns: [],
    unoptimized: true, // For local development with non-standard paths
  },
  // Turbopack configuration (Next.js 16+ default)
  turbopack: {
    resolveAlias: {
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  // Webpack configuration (fallback for --webpack flag)
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@assets": path.resolve(__dirname, "attached_assets"),
    };
    return config;
  },
};

export default nextConfig;

