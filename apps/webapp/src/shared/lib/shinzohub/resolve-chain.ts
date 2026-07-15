import type { Chain } from "viem";
import { shinzoChain } from "@/shared/config/shinzohub";

/** Resolves the configured ShinzoHub chain via `@shinzo/shinzohub`. */
export async function resolveShinzoHubChain(): Promise<Chain> {
  return shinzoChain as Chain;
}

/** Fetches the live ShinzoHub chain definition through the webapp API proxy. */
export async function fetchShinzoHubChain(
  signal?: AbortSignal
): Promise<Chain> {
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
