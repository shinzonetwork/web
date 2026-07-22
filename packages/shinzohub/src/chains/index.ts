import { defineChain } from "viem";
import { getChainId } from "./get-chain-id";
import type { ShinzoHubChainParameters } from "./types";

export { getChainId } from "./get-chain-id";
export type { GetChainIdParameters, ShinzoHubChainParameters } from "./types";

const currency = {
  name: "Shinzo",
  symbol: "SHN",
  decimals: 18,
} as const;

const localCurrency = {
  name: "Shinzo",
  symbol: "SHNZ",
  decimals: 18,
} as const;

/**
 * Local ShinzoHub Viem chain definition.
 *
 * Use this when running a local ShinzoHub node with EVM RPC on port `8545` and
 * Cosmos REST on port `1317`.
 */
export const shinzoHubLocal = defineChain({
  id: 91273002,
  name: "ShinzoHub Local",
  nativeCurrency: localCurrency,
  rpcUrls: {
    default: { http: ["http://localhost:8545"] },
    cosmosRest: { http: ["http://localhost:1317"] },
    cometRpc: { http: ["http://localhost:26657"] },
  },
});

/** Internal ShinzoHub Viem chain definition. */
export const shinzoHubInternal = defineChain({
  id: 91273002,
  name: "Shinzo Internal",
  nativeCurrency: currency,
  rpcUrls: {
    default: { http: ["http://testnet-internal.shinzo.network:8545"] },
    cosmosRest: { http: ["http://testnet-internal.shinzo.network:1317"] },
    cometRpc: { http: ["http://testnet-internal.shinzo.network:26657"] },
  },
});

/** Shared development ShinzoHub Viem chain definition. */
export const shinzoHubDevnet = defineChain({
  id: 91273002,
  name: "Shinzo Devnet",
  nativeCurrency: currency,
  rpcUrls: {
    default: { http: ["http://rpc.develop.devnet.shinzo.network:8545"] },
    cosmosRest: { http: ["http://rpc.develop.devnet.shinzo.network:1317"] },
    cometRpc: { http: ["http://rpc.develop.devnet.shinzo.network:26657"] },
  },
});

/** Testnet ShinzoHub Viem chain definition. */
export const shinzoHubTestnet = defineChain({
  id: 91273001,
  name: "Shinzo",
  nativeCurrency: currency,
  testnet: true,
  rpcUrls: {
    default: { http: ["http://testnet.shinzo.network:8545"] },
    cosmosRest: { http: ["http://testnet.shinzo.network:1317"] },
    cometRpc: { http: ["http://testnet.shinzo.network:26657"] },
  },
});

/**
 * Named ShinzoHub chain definitions keyed by environment.
 *
 * Useful for CLI tools or apps that choose the environment from config.
 *
 * @example
 * ```ts
 * import { shinzoHubChains } from "@shinzo/shinzohub";
 *
 * const chain = shinzoHubChains.devnet;
 * ```
 */
export const shinzoHubChains = {
  testnet: shinzoHubTestnet,
  internal: shinzoHubInternal,
  devnet: shinzoHubDevnet,
  local: shinzoHubLocal,
} as const;

export type ShinzoHubChainName = keyof typeof shinzoHubChains;

export const defaultShinzoHubChainName: ShinzoHubChainName = "testnet";

/** Resolves a named ShinzoHub chain, defaulting to public testnet. */
export function getShinzoHubChain(
  name: string | null | undefined = defaultShinzoHubChainName,
) {
  const resolvedName = name ?? defaultShinzoHubChainName;

  if (Object.prototype.hasOwnProperty.call(shinzoHubChains, resolvedName)) {
    return shinzoHubChains[resolvedName as ShinzoHubChainName];
  }

  throw new Error(
    `Unsupported ShinzoHub chain "${resolvedName}". Expected one of: ${Object.keys(shinzoHubChains).join(", ")}.`,
  );
}
