/// <reference types="@cloudflare/workers-types" />

declare global {
  type CloudflareEnv = Record<string, never>;
}

export {};
