import { shinzoChain } from "@/shared/config/shinzohub";

/** Resolves the Comet RPC endpoint used by server-side ShinzoHub queries. */
export function getCometRpcUrl(): string {
  return shinzoChain.rpcUrls.cometRpc.http[0];
}

/** Resolves the Cosmos REST endpoint used by server-side ShinzoHub queries. */
export function getCosmosRestUrl(): string {
  return shinzoChain.rpcUrls.cosmosRest.http[0];
}
