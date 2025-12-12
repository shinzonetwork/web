// @ts-nocheck
import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";

export default defineCloudflareConfig({
  default: {
    override: {
      // 1) Avoid R2 incremental cache
      incrementalCache: "dummy",

      // 2) Strip Node core deps like "node:fs" etc. from the Worker bundle.
      //    These end up in .open-next/server-functions/default/** and cause
      //    "No such module 'node:fs'" when uploaded to Cloudflare.
      //
      //    The exact options depend a bit on OpenNext version but this pattern
      //    is supported in 1.14.x: you can pass through extra esbuild options.
      esbuild: {
        // Some Next internals import node:fs / node:child_process / node:path / node:process.
        // Mark them as external so they don't get bundled into the Worker.
        external: [
          "node:fs",
          "node:fs/promises",
          "node:path",
          "node:child_process",
          "node:process",

          // In case some deps use non-`node:` specifiers:
          "fs",
          "fs/promises",
          "path",
          "child_process",
          "process",
        ],
      },
    },
  },
});
