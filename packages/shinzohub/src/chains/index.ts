import { defineChain } from "viem";

const currency = {
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
  nativeCurrency: currency,
  rpcUrls: {
    default: { http: ["http://localhost:8545"] },
    cosmosRest: { http: ["http://localhost:1317"] },
    cometRpc: { http: ["http://localhost:26657"] },
  },
});

/**
 * Internal develop ShinzoHub Viem chain definition.
 *
 * This is the most useful default for development against the shared
 * ShinzoHub develop environment because it includes both EVM RPC and Cosmos
 * REST endpoints.
 *
 * @example
 * ```ts
 * import { createPublicClient, http } from "viem";
 * import { shinzoHubDevelop } from "@shinzo/shinzohub";
 *
 * const client = createPublicClient({
 *   chain: shinzoHubDevelop,
 *   transport: http(),
 * });
 * ```
 */
export const shinzoHubDevelop = defineChain({
  id: 91273002,
  name: "ShinzoHub Develop",
  nativeCurrency: currency,
  rpcUrls: {
    default: { http: ["http://rpc.develop.devnet.shinzo.network:8545"] },
    cosmosRest: { http: ["http://rpc.develop.devnet.shinzo.network:1317"] },
    cometRpc: { http: ["http://rpc.develop.devnet.shinzo.network:26657"] },
  },
});

/**
 * Public testnet ShinzoHub Viem chain definition.
 *
 * This chain currently exposes EVM and Comet RPC endpoints. Pass
 * `cosmosRestUrl` explicitly to REST-backed SDK actions when the chain
 * definition does not include a Cosmos REST endpoint.
 */
export const shinzoHubDevnet = defineChain({
  id: 91273002,
  name: "ShinzoHub Devnet",
  nativeCurrency: currency,
  rpcUrls: {
    default: { http: ["http://rpc.devnet.shinzo.network:8545"] },
    cometRpc: { http: ["http://rpc.devnet.shinzo.network:26657"] },
  },
});

/** Testnet ShinzoHub Viem chain definition. */
export const shinzoHubTestnet = defineChain({
  id: 91273001,
  name: "ShinzoHub Testnet",
  nativeCurrency: currency,
  rpcUrls: {
    default: { http: [] },
  },
});

/** Mainnet ShinzoHub Viem chain definition. */
export const shinzoHubMainnet = defineChain({
  id: 91273000,
  name: "ShinzoHub Mainnet",
  nativeCurrency: currency,
  rpcUrls: {
    default: { http: [] },
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
 * const chain = shinzoHubChains.develop;
 * ```
 */
export const shinzoHubChains = {
  local: shinzoHubLocal,
  develop: shinzoHubDevelop,
  devnet: shinzoHubDevnet,
  testnet: shinzoHubTestnet,
  mainnet: shinzoHubMainnet,
} as const;
