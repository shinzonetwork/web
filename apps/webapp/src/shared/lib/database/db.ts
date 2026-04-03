import { cache } from "react";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const getDb = cache(() => {
  const { env } = getCloudflareContext();
  return env.shinzo_indexer_db;
});

// If you ever need async context (ISR/SSG, etc.)
export const getDbAsync = cache(async () => {
  const { env } = await getCloudflareContext({ async: true });
  return env.shinzo_indexer_db;
});
