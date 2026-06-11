import type { Hex } from "viem";

/** A normalized ShinzoHub consensus block. */
export interface ShinzoHubBlock {
  hash: Hex;
  parentHash: Hex | null;
  height: bigint;
  timestamp: string;
  chainId: string;
  proposerAddress: string;
  transactionCount: number;
  size: bigint | null;
  lastCommitHash: Hex | null;
  dataHash: Hex | null;
  validatorsHash: Hex | null;
  nextValidatorsHash: Hex | null;
  consensusHash: Hex | null;
  appHash: Hex | null;
  lastResultsHash: Hex | null;
  evidenceHash: Hex | null;
}

/** Inclusive height range options for listing blocks. */
export interface ListBlocksParameters {
  minHeight?: number | bigint | string;
  maxHeight?: number | bigint | string;
  cometRpcUrl?: string;
}

/** Blocks in the requested range plus the chain's latest height. */
export interface ListBlocksResult {
  blocks: readonly ShinzoHubBlock[];
  latestHeight: bigint;
}

/** Options for loading a block by height or hash. */
export interface GetBlockParameters {
  height?: number | bigint | string;
  hash?: string;
  cometRpcUrl?: string;
}

/** Options for loading a block timestamp by height. */
export interface GetBlockTimestampParameters {
  height: number | bigint | string;
  cometRpcUrl?: string;
}

/** Options for reading the chain's latest block height. */
export interface GetLatestBlockHeightParameters {
  cometRpcUrl?: string;
}
