// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 🔹 keep any existing config you already had here
  // e.g. experimental, images, etc.

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve ??= {};
      config.resolve.alias ??= {};

      Object.assign(config.resolve.alias, {
        // Prevent Node fs from ever ending up in the server bundle
        fs: false,
        'fs/promises': false,
        'node:fs': false,
        'node:fs/promises': false,
      });
    }

    return config;
  },
};

export default nextConfig;
