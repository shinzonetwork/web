import { createPublicClient, http, type PublicClient } from "viem";
import { getRpcUrl } from "@/shared/config/env";
import { resolveShinzoHubChain } from "@/shared/lib/shinzohub/resolve-chain";

let publicClientPromise: Promise<PublicClient> | null = null;

async function createShinzoPublicClient(): Promise<PublicClient> {
  const chain = await resolveShinzoHubChain();
  return createPublicClient({
    chain,
    transport: http(getRpcUrl()),
  });
}

/** Public read-only viem client for ShinzoHub server-side queries. */
export function getShinzoPublicClient(): Promise<PublicClient> {
  publicClientPromise ??= createShinzoPublicClient();
  return publicClientPromise;
}
