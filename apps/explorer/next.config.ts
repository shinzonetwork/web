import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SHINZOHUB_CHAIN: process.env.SHINZOHUB_CHAIN ?? "testnet",
  },
  turbopack: {
    rules: {
      '*.svg': {
        as: '*.js',
        loaders: [{
          loader: '@svgr/webpack',
          options: {
            svgo: false,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        }],
      },
    }
  },
};

export default nextConfig;
