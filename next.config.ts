import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // 90 keeps text in project screenshots crisp.
    qualities: [75, 90],
  },
};

export default nextConfig;
