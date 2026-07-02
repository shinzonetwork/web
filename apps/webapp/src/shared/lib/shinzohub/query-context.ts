import { shinzoHubDevelop } from "@shinzo/shinzohub";
import { getShinzoPublicClient } from "@/shared/lib";

const developRpcUrls =
  shinzoHubDevelop.rpcUrls as typeof shinzoHubDevelop.rpcUrls & {
    cosmosRest: { http: readonly string[] };
    cometRpc: { http: readonly string[] };
  };

export function getShinzohubQueryContext() {
  return {
    client: getShinzoPublicClient(),
    cosmosRestUrl:
      process.env.SHINZOHUB_COSMOS_REST_URL ??
      developRpcUrls.cosmosRest.http[0],
    cometRpcUrl:
      process.env.SHINZOHUB_COMET_RPC_URL ?? developRpcUrls.cometRpc.http[0],
  };
}
