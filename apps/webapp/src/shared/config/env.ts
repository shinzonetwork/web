/**
 * Environment variable configuration with validation
 * All environment variables should be accessed through the exported functions
 * to ensure proper validation and type safety.
 */

import { shinzoChain } from "./shinzohub";

/**
 * Get the RPC URL for the Shinzo network
 */
export function getRpcUrl(): string {
  return shinzoChain.rpcUrls.default.http[0];
}
