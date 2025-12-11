import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        // Prevent Turbopack from trying to bundle `thread-stream`
        "thread-stream": false as any,
      },
    },
  },
};

export default nextConfig;
