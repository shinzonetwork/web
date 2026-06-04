import { cache } from "react";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const getDb = cache(() => {
  const { env } = getCloudflareContext();
  return env.shinzohub_explorer;
});