import { getShinzoPublicClient } from "@/shared/lib/viem/client";
import { getCometRpcUrl, getCosmosRestUrl } from "./endpoints";

export async function getShinzohubQueryContext() {
  return {
    client: await getShinzoPublicClient(),
    cosmosRestUrl: getCosmosRestUrl(),
    cometRpcUrl: getCometRpcUrl(),
  };
}
