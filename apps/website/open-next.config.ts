import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";

export default defineCloudflareConfig({
  // https://opennext.js.org/cloudflare/known-issues
  queue: doQueue,

  // Disable this if you want to use PPR
  enableCacheInterception: true,
});
