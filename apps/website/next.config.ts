import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cpus: 1,
  },
  transpilePackages: ["shiki"],
  images: {
    qualities: [100],
    localPatterns: [
      {
        pathname: "/api/media/file/**",
      },
    ],
    remotePatterns: [
      ...[process.env.NEXT_PUBLIC_URL /* 'https://example.com' */].map(
        (item) => {
          const url = new URL(item);
          return {
            hostname: url.hostname,
            protocol: url.protocol.replace(":", "") as "http" | "https",
          };
        },
      ),
    ],
    loader: "custom",
    loaderFile: "./image-loader.ts",
    // qualities: [25, 50, 75, 100],
  },
  turbopack: {
    resolveAlias: {
      // drizzle-kit/api is a CLI-only tool that leaks into the server bundle via @payloadcms/drizzle.
      // Migrations run via the payload CLI in Node.js — never in the Workers runtime.
      // See issue: 
      // https://github.com/payloadcms/payload/issues/16470
      "drizzle-kit/api": "./lib/shims/drizzle-kit-api.ts",
    },
    rules: {
      "*.svg": {
        condition: { not: { query: "?url" } },
        as: "*.js",
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: ["preset-default", "removeDimensions"],
              },
            },
          },
        ],
      },
    },
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
