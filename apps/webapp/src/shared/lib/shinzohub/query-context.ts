import { getShinzoPublicClient } from "@/shared/lib/viem/client";
import { getCometRpcUrl, getCosmosRestUrl } from "../utils/endpoints";

export function getShinzohubQueryContext() {
  return {
    client: getShinzoPublicClient(),
    cosmosRestUrl: getCosmosRestUrl(),
    cometRpcUrl: getCometRpcUrl(),
  };
}
