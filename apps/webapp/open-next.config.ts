import { defineCloudflareConfig } from '@opennextjs/cloudflare';

export default {
  buildCommand: "pnpm build:next",
  ...defineCloudflareConfig(),
};
