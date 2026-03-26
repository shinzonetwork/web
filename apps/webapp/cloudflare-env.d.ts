/// <reference types="@cloudflare/workers-types" />

declare global {
  interface CloudflareEnv {
    /** D1 binding from wrangler.jsonc `d1_databases.binding` */
    shinzo_indexer_db: D1Database;
  }
}

export {};
