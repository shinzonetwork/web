import type { Client } from "viem";
import {
  countViews,
  createView,
  getCreatedViewAddress,
  getView,
  listViews,
} from "./views/index";
import {
  findTransactionByEvmHash,
  getTransaction,
  listTransactions,
} from "./transactions/index";
import {
  getBlock,
  getBlockTimestamp,
  getLatestBlock,
  getLatestBlockHeight,
  listBlocks,
} from "./blocks/index";

export {
  hexToShinzoAddress,
  normalizeHexAddress,
  normalizeShinzoAddress,
  shinzoAddressToHex,
} from "./addresses/index";
export type { HexAddress, ShinzoAddress } from "./addresses/index";
export {
  shinzoHubChains,
  shinzoHubDevelop,
  shinzoHubDevnet,
  shinzoHubLocal,
  shinzoHubMainnet,
  shinzoHubTestnet,
} from "./chains/index";
export {
  countViews,
  createView,
  getCreatedViewAddress,
  getView,
  listViews,
  viewRegistryAbi,
  viewRegistryAddress,
} from "./views/index";
export type {
  CreateViewParameters,
  ListViewsParameters,
  ListViewsResult,
  ShinzoHubView,
  ViewMetadata,
} from "./views/index";
export {
  findTransactionByEvmHash,
  getTransaction,
  listTransactions,
} from "./transactions/index";
export type {
  FindTransactionByEvmHashParameters,
  GetTransactionParameters,
  ListTransactionsParameters,
  ListTransactionsResult,
  ShinzoHubCoin,
  ShinzoHubEvent,
  ShinzoHubEventAttribute,
  ShinzoHubMessage,
  ShinzoHubTransaction,
  ShinzoHubTransactionFilter,
  ShinzoHubTransactionKind,
  ShinzoHubTransactionOrder,
  ShinzoHubTransactionSummary,
  ShinzoHubTransfer,
} from "./transactions/index";
export {
  getBlock,
  getBlockTimestamp,
  getLatestBlock,
  getLatestBlockHeight,
  listBlocks,
} from "./blocks/index";
export type {
  GetBlockParameters,
  GetBlockTimestampParameters,
  GetLatestBlockHeightParameters,
  ListBlocksParameters,
  ListBlocksResult,
  ShinzoHubBlock,
} from "./blocks/index";

/** Creates ShinzoHub actions bound to an existing Viem client. */
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
    /** Lists native Cosmos and EVM transactions. */
    listTransactions: (parameters?: Parameters<typeof listTransactions>[1]) =>
      listTransactions(client, parameters),
    /** Fetches decoded transaction details by Cosmos hash. */
    getShinzoHubTransaction: (parameters: Parameters<typeof getTransaction>[1]) =>
      getTransaction(client, parameters),
    /** Finds a transaction summary by EVM hash. */
    findShinzoHubTransactionByEvmHash: (
      parameters: Parameters<typeof findTransactionByEvmHash>[1]
    ) => findTransactionByEvmHash(client, parameters),
    /** Lists consensus blocks. */
    listBlocks: (parameters?: Parameters<typeof listBlocks>[1]) =>
      listBlocks(client, parameters),
    /** Fetches the latest ShinzoHub consensus block. */
    getLatestShinzoHubBlock: (parameters?: Parameters<typeof getLatestBlock>[1]) =>
      getLatestBlock(client, parameters),
    /** Fetches the latest ShinzoHub consensus height. */
    getLatestShinzoHubBlockHeight: (
      parameters?: Parameters<typeof getLatestBlockHeight>[1]
    ) => getLatestBlockHeight(client, parameters),
    /** Fetches one ShinzoHub consensus block by height or hash. */
    getShinzoHubBlock: (parameters: Parameters<typeof getBlock>[1]) =>
      getBlock(client, parameters),
    /** Fetches a block timestamp by height. */
    getShinzoHubBlockTimestamp: (
      parameters: Parameters<typeof getBlockTimestamp>[1]
    ) => getBlockTimestamp(client, parameters),
  };
}

/** Extends a Viem client with the complete ShinzoHub action bundle. */
export function createShinzoHubClient<TClient extends Client>(client: TClient) {
  return client.extend(shinzoHubActions);
}
