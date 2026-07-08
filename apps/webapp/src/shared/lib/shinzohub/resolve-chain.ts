import { shinzoHubChain, type ShinzoHubChainParameters } from "@shinzo/shinzohub";
import type { Chain } from "viem";
import { getRpcUrl } from "@/shared/config/env";
import { getCometRpcUrl, getCosmosRestUrl } from "./endpoints";

/** Resolves ShinzoHub RPC endpoints from webapp env and package defaults. */
export function getShinzoHubChainParameters(): ShinzoHubChainParameters {
  return {
    defaultRpcUrl: getRpcUrl(),
    cometRpcUrl: getCometRpcUrl(),
    cosmosRestUrl: getCosmosRestUrl(),
  };
}

/** Builds the live ShinzoHub viem chain definition via `@shinzo/shinzohub`. */
export async function resolveShinzoHubChain(): Promise<Chain> {
  return (await shinzoHubChain(getShinzoHubChainParameters())) as Chain;
}

/** Fetches the live ShinzoHub chain definition through the webapp API proxy. */
export async function fetchShinzoHubChain(signal?: AbortSignal): Promise<Chain> {
  const response = await fetch("/api/shinzohub/chain", { signal });
  if (!response.ok) {
    throw new Error("Failed to fetch ShinzoHub chain definition.");
  }

  const { chain } = (await response.json()) as { chain?: Chain };
  if (!chain?.id) {
    throw new Error("ShinzoHub chain response was invalid.");
  }

  return chain;
}
