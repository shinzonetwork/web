/**
 * Type definitions for environment variables
 * This file extends the ProcessEnv interface to provide type safety
 * for all environment variables used in the application.
 */

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * RPC URL for the Shinzo network
     * Required in production, defaults to http://localhost:8545 in development
     */
    readonly NEXT_PUBLIC_RPC_URL?: string;

    /**
     * Node environment (development, production, test)
     * Automatically set by Next.js
     */
    readonly NODE_ENV: "development" | "production" | "test";
  }
}

