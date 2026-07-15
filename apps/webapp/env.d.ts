/**
 * Type definitions for environment variables
 * This file extends the ProcessEnv interface to provide type safety
 * for all environment variables used in the application.
 */

declare namespace NodeJS {
  interface ProcessEnv {
    readonly SHINZOHUB_CHAIN?: "testnet" | "internal" | "devnet" | "local";

    /**
     * Node environment (development, production, test)
     * Automatically set by Next.js
     */
    readonly NODE_ENV: "development" | "production" | "test";
  }
}
