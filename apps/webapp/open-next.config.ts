// @ts-nocheck
import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";

// Force OpenNext to use a non-R2 incremental cache so we don't need R2 at all.
export default defineCloudflareConfig({
  // `default` here refers to the default Worker (the one you're deploying)
  default: {
    override: {
      // This tells OpenNext not to use R2 for ISR / incremental cache
      incrementalCache: "dummy",
      // or incrementalCache: "in-memory" depending on what your OpenNext version supports
    },
  },
});
