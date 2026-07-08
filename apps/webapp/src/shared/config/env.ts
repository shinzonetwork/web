/**
 * Environment variable configuration with validation
 * All environment variables should be accessed through the exported functions
 * to ensure proper validation and type safety.
 */

import { shinzoHubTestnet } from "@shinzo/shinzohub";

const testnetDefaultRpcUrl = shinzoHubTestnet.rpcUrls.default.http[0];

/**
 * Get the RPC URL for the Shinzo network
 * @throws Error if NEXT_PUBLIC_RPC_URL is not configured in production
 */
export function getRpcUrl(): string {
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;

  // In production, require the RPC URL to be explicitly set
  if (process.env.NODE_ENV === "production" && !rpcUrl) {
    throw new Error(
      "NEXT_PUBLIC_RPC_URL environment variable is required in production. Please configure it in your environment."
    );
  }

  // Default to testnet for development
  return rpcUrl || testnetDefaultRpcUrl;
}
