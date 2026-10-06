import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // @ts-ignore - Next.js error message suggests putting it at root, but types might be outdated
  allowedDevOrigins: ['10.251.134.60'],
};

export default nextConfig;
