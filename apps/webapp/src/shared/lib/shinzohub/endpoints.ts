import { shinzoHubTestnet } from "@shinzo/shinzohub";

const testnetRpcUrls =
  shinzoHubTestnet.rpcUrls as typeof shinzoHubTestnet.rpcUrls & {
    cosmosRest: { http: readonly string[] };
    cometRpc: { http: readonly string[] };
  };

/** Resolves the Comet RPC endpoint used by server-side ShinzoHub queries. */
export function getCometRpcUrl(): string {
  return process.env.SHINZOHUB_COMET_RPC_URL ?? testnetRpcUrls.cometRpc.http[0];
}

/** Resolves the Cosmos REST endpoint used by server-side ShinzoHub queries. */
export function getCosmosRestUrl(): string {
  return (
    process.env.SHINZOHUB_COSMOS_REST_URL ?? testnetRpcUrls.cosmosRest.http[0]
  );
}
