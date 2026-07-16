import { shinzoChain } from "@/shared/config/shinzohub";

/** Resolves the Comet RPC endpoint used by server-side ShinzoHub queries. */
export function getCometRpcUrl(): string {
  return shinzoChain.rpcUrls.cometRpc.http[0];
}

/** Resolves the Cosmos REST endpoint used by server-side ShinzoHub queries. */
export function getCosmosRestUrl(): string {
  return shinzoChain.rpcUrls.cosmosRest.http[0];
}

/**
 * Get the RPC URL for the Shinzo network
 */
export function getEVMRpcUrl(): string {
  return shinzoChain.rpcUrls.default.http[0];
}
