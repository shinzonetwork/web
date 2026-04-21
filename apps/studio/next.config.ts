import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": [
        {
          condition: { not: { query: /(^|[?&])url(&|$)/ } },
          as: "*.js",
          loaders: [
            {
              loader: "@svgr/webpack",
              options: {
                svgo: false,
                svgoConfig: {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          condition: { query: /(^|[?&])url(&|$)/ },
          type: "asset",
        },
      ],
    },
  },
};

export default nextConfig;
