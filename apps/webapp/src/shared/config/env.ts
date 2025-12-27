/**
 * Environment variable configuration with validation
 * All environment variables should be accessed through the exported functions
 * to ensure proper validation and type safety.
 */

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

  // Default to localhost for development
  return rpcUrl || "http://localhost:8545";
}
