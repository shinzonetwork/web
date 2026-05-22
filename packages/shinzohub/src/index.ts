import type { Client } from "viem";
import {
  countViews,
  createView,
  getView,
  listViews,
} from "./views/index.js";

export {
  hexToShinzoAddress,
  normalizeHexAddress,
  normalizeShinzoAddress,
  shinzoAddressToHex,
} from "./addresses/index.js";
export type { HexAddress, ShinzoAddress } from "./addresses/index.js";
export {
  shinzoHubChains,
  shinzoHubDevelop,
  shinzoHubDevnet,
  shinzoHubLocal,
  shinzoHubMainnet,
  shinzoHubTestnet,
} from "./chains/index.js";
export {
  countViews,
  createView,
  getView,
  listViews,
  viewRegistryAbi,
  viewRegistryAddress,
} from "./views/index.js";
export type {
  CreateViewParameters,
  ListViewsParameters,
  ListViewsResult,
  ShinzoHubView,
  ViewMetadata,
} from "./views/index.js";

/**
 * Creates a Viem action bundle for ShinzoHub view workflows.
 *
 * Use this with `client.extend(shinzoHubActions)` when you want the methods to
 * appear directly on an existing Viem public or wallet client.
 *
 * @param client - Existing Viem client. Public clients can call read/query
 * methods such as `listViews`; wallet clients can also call `createView`.
 * @returns ShinzoHub actions bound to the provided Viem client.
 *
 * @example
 * ```ts
 * import { createPublicClient, http } from "viem";
 * import { shinzoHubActions, shinzoHubDevelop } from "@shinzo/shinzohub";
 *
 * const client = createPublicClient({
 *   chain: shinzoHubDevelop,
 *   transport: http(),
 * }).extend(shinzoHubActions);
 *
 * const views = await client.listViews({ limit: 10, includeMetadata: true });
 * ```
 */
export function shinzoHubActions(client: Client) {
  return {
    /** Counts registered ShinzoHub views. */
    countViews: (parameters?: Parameters<typeof countViews>[1]) => countViews(client, parameters),
    /** Creates a ShinzoHub view from raw viewbundle bytes. */
    createView: (parameters: Parameters<typeof createView>[1]) => createView(client, parameters),
    /** Fetches one registered ShinzoHub view by contract address. */
    getView: (parameters: Parameters<typeof getView>[1]) => getView(client, parameters),
    /** Lists registered ShinzoHub views. */
    listViews: (parameters?: Parameters<typeof listViews>[1]) => listViews(client, parameters),
  };
}

/**
 * Decorates an existing Viem client with ShinzoHub methods.
 *
 * This is a small convenience wrapper around `client.extend(shinzoHubActions)`.
 * It does not create transports, accounts, or chain configuration for you, so
 * the result stays predictable for Viem users.
 *
 * @param client - Existing Viem public or wallet client to extend.
 * @returns The same Viem client shape with ShinzoHub methods attached.
 *
 * @example
 * ```ts
 * import { createWalletClient, http } from "viem";
 * import { createShinzoHubClient, shinzoHubDevelop } from "@shinzo/shinzohub";
 *
 * const walletClient = createShinzoHubClient(
 *   createWalletClient({
 *     account: "0x1234567890AbcdEF1234567890aBcdef12345678",
 *     chain: shinzoHubDevelop,
 *     transport: http(),
 *   }),
 * );
 *
 * const hash = await walletClient.createView({ bundle: "0x68656c6c6f" });
 * ```
 */
export function createShinzoHubClient<TClient extends Client>(client: TClient) {
  return client.extend(shinzoHubActions);
}
