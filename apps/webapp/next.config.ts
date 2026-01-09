import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'viem', 'wagmi', '@tanstack/react-query'],
  },
};

export default nextConfig;
