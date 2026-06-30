import type { Hex } from "viem";

export type ShinzoHubTransactionKind = "cosmos" | "evm";
export type ShinzoHubTransactionFilter = "all" | "evm";
export type ShinzoHubTransactionOrder = "asc" | "desc";

/** One indexed attribute attached to a transaction event. */
export interface ShinzoHubEventAttribute {
  key: string;
  value: string;
  index: boolean;
}

/** A normalized event emitted while processing a transaction. */
export interface ShinzoHubEvent {
  type: string;
  attributes: readonly ShinzoHubEventAttribute[];
}

/** A Cosmos SDK coin amount and denomination. */
export interface ShinzoHubCoin {
  denom: string;
  amount: string;
}

/** A value transfer inferred from transaction events. */
export interface ShinzoHubTransfer {
  sender: string | null;
  recipient: string | null;
  amount: string | null;
}

/** Explorer-friendly transaction data available from Comet RPC search. */
export interface ShinzoHubTransactionSummary {
  cosmosHash: Hex;
  evmHash: Hex | null;
  kind: ShinzoHubTransactionKind;
  height: bigint;
  index: number;
  success: boolean;
  code: number;
  codespace: string;
  gasWanted: bigint;
  gasUsed: bigint;
  actions: readonly string[];
  senders: readonly string[];
  recipients: readonly string[];
  transfers: readonly ShinzoHubTransfer[];
  fee: string | null;
  events: readonly ShinzoHubEvent[];
}

/** A decoded Cosmos SDK transaction message. */
export interface ShinzoHubMessage {
  typeUrl: string;
  value: Readonly<Record<string, unknown>>;
}

/** Full decoded transaction details returned by Cosmos REST. */
export interface ShinzoHubTransaction extends ShinzoHubTransactionSummary {
  timestamp: string | null;
  memo: string;
  messages: readonly ShinzoHubMessage[];
  feeCoins: readonly ShinzoHubCoin[];
  feePayer: string;
  feeGranter: string;
  gasLimit: bigint;
  signatures: readonly string[];
  rawLog: string;
}

/** Search and pagination options for listing indexed transactions. */
export interface ListTransactionsParameters {
  page?: number;
  limit?: number;
  order?: ShinzoHubTransactionOrder;
  kind?: ShinzoHubTransactionFilter;
  blockHeight?: number | bigint | string;
  /**
   * Restrict the feed to transactions that touch this address as a sender or a
   * recipient. Matched against the chain's `shinzo.address` participant index, so
   * it pages natively. Accepts a bech32 (`shinzo1...`) or hex (`0x...`) address.
   */
  address?: string;
  cometRpcUrl?: string;
}

/** A page of normalized transactions and its indexed total. */
export interface ListTransactionsResult {
  transactions: readonly ShinzoHubTransactionSummary[];
  total: bigint;
}

/** Options for loading a transaction by its canonical Cosmos hash. */
export interface GetTransactionParameters {
  hash: string;
  cosmosRestUrl?: string;
}

/** Options for resolving an EVM hash to its canonical transaction. */
export interface FindTransactionByEvmHashParameters {
  hash: string;
  cometRpcUrl?: string;
}
