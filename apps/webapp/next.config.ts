import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'viem', 'wagmi', '@tanstack/react-query', '@radix-ui/react-tooltip', '@radix-ui/react-label', '@radix-ui/react-radio-group'],
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
