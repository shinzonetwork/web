import type { Hex } from "viem";
import { requestCometRpc } from "../internal/comet";
import { normalizeHex } from "../internal/hex";
import type {
  ShinzoHubEvent,
  ShinzoHubTransactionOrder,
  ShinzoHubTransactionSummary,
  ShinzoHubTransfer,
} from "./types";

interface CometAttributeWire {
  key?: string;
  value?: string;
  index?: boolean;
}

/** Comet RPC event response before normalization. */
export interface CometEventWire {
  type?: string;
  attributes?: CometAttributeWire[];
}

/** Comet RPC transaction response before normalization. */
export interface CometTxWire {
  hash?: string;
  height?: string;
  index?: number;
  tx_result?: {
    code?: number;
    codespace?: string;
    gas_wanted?: string;
    gas_used?: string;
    events?: CometEventWire[];
  };
}

/** Comet RPC transaction-search result before normalization. */
export interface TxSearchWire {
  txs?: CometTxWire[];
  total_count?: string;
}

/** Executes an indexed Comet transaction search. */
export async function searchTransactions(
  fetchFn: typeof globalThis.fetch,
  cometRpcUrl: string,
  parameters: {
    query: string;
    page: number;
    limit: number;
    order: ShinzoHubTransactionOrder;
  },
): Promise<TxSearchWire> {
  return requestCometRpc<TxSearchWire>(
    fetchFn,
    cometRpcUrl,
    "tx_search",
    {
      query: parameters.query,
      page: String(parameters.page),
      per_page: String(parameters.limit),
      order_by: parameters.order,
    },
  );
}

/** Normalizes a Comet transaction and its events for consumers. */
export function toTransactionSummary(
  tx: CometTxWire,
): ShinzoHubTransactionSummary {
  if (!tx.hash) {
    throw new Error("ShinzoHub transaction response is missing hash.");
  }
  const events = toEvents(tx.tx_result?.events);
  const summary = eventSummary(events);
  return {
    cosmosHash: normalizeHex(tx.hash, "transaction hash", 32),
    evmHash: summary.evmHash,
    kind: summary.evmHash ? "evm" : "cosmos",
    height: BigInt(tx.height ?? 0),
    index: tx.index ?? summary.transactionIndex,
    success: (tx.tx_result?.code ?? 0) === 0,
    code: tx.tx_result?.code ?? 0,
    codespace: tx.tx_result?.codespace ?? "",
    gasWanted: BigInt(tx.tx_result?.gas_wanted ?? 0),
    gasUsed: BigInt(tx.tx_result?.gas_used ?? 0),
    actions: summary.actions,
    senders: summary.senders,
    recipients: summary.recipients,
    transfers: summary.transfers,
    fee: summary.fee,
    events,
  };
}

/** Normalizes optional Comet events into stable event objects. */
export function toEvents(
  wire: CometEventWire[] | undefined,
): ShinzoHubEvent[] {
  return (wire ?? []).map((event) => ({
    type: event.type ?? "",
    attributes: (event.attributes ?? []).map((attribute) => ({
      key: attribute.key ?? "",
      value: attribute.value ?? "",
      index: attribute.index ?? false,
    })),
  }));
}

/** Derives common explorer fields from normalized transaction events. */
export function eventSummary(events: readonly ShinzoHubEvent[]) {
  const actions: string[] = [];
  const senders: string[] = [];
  const recipients: string[] = [];
  const transfers: ShinzoHubTransfer[] = [];
  let evmHash: Hex | null = null;
  let fee: string | null = null;
  let transactionIndex = 0;

  for (const event of events) {
    const attributes = new Map(
      event.attributes.map((attribute) => [attribute.key, attribute.value]),
    );
    if (event.type === "message") {
      addUnique(actions, attributes.get("action"));
      addUnique(senders, attributes.get("sender"));
    }
    if (event.type === "transfer" && attributes.has("msg_index")) {
      const sender = attributes.get("sender") ?? null;
      const recipient = attributes.get("recipient") ?? null;
      const amount = attributes.get("amount") ?? null;
      transfers.push({ sender, recipient, amount });
      addUnique(senders, sender);
      addUnique(recipients, recipient);
    }
    if (event.type === "tx") {
      fee ??= attributes.get("fee") ?? null;
    }
    if (event.type === "ethereum_tx") {
      const value = attributes.get("ethereumTxHash");
      if (value) {
        evmHash = normalizeHex(value, "ethereumTxHash", 32);
      }
      addUnique(recipients, attributes.get("recipient"));
      const parsedIndex = Number(attributes.get("txIndex"));
      if (Number.isInteger(parsedIndex)) {
        transactionIndex = parsedIndex;
      }
    }
  }

  return {
    actions,
    senders,
    recipients,
    transfers,
    evmHash,
    fee,
    transactionIndex,
  };
}

/** Validates positive integer pagination values and applies a default. */
export function positiveInteger(
  value: number | undefined,
  fallback: number,
  name: string,
): number {
  const result = value ?? fallback;
  if (!Number.isInteger(result) || result < 1) {
    throw new Error(`${name} must be a positive integer.`);
  }
  return result;
}

function addUnique(
  values: string[],
  value: string | null | undefined,
): void {
  if (value && !values.includes(value)) {
    values.push(value);
  }
}
