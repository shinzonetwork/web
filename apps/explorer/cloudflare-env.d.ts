/// <reference types="@cloudflare/workers-types" />

declare global {
  interface CloudflareEnv {
    /** D1 binding from wrangler.jsonc `d1_databases.binding` */
    shinzohub_explorer: D1Database;
  }
}

export {};
