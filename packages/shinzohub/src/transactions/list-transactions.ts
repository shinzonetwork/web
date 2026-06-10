import { getFetch } from "../internal/comet";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import {
  positiveInteger,
  searchTransactions,
  toTransactionSummary,
} from "./internal";
import type {
  ListTransactionsParameters,
  ListTransactionsResult,
} from "./types";

const MAX_LIMIT = 100;

/** Lists indexed native and EVM transactions with optional filters. */
export async function listTransactions(
  client: ShinzoHubQueryClient,
  parameters: ListTransactionsParameters = {},
): Promise<ListTransactionsResult> {
  const page = positiveInteger(parameters.page, 1, "page");
  const limit = Math.min(
    MAX_LIMIT,
    positiveInteger(parameters.limit, 20, "limit"),
  );
  const order = parameters.order ?? "desc";
  const kind = parameters.kind ?? "all";
  const baseQuery = transactionQuery(parameters.blockHeight);
  const query =
    kind === "evm"
      ? `${baseQuery} AND ethereum_tx.ethereumTxHash EXISTS`
      : baseQuery;
  const cometRpcUrl = getRpcEndpoint(
    client,
    "cometRpc",
    parameters.cometRpcUrl,
  );
  const fetchFn = getFetch();

  const response = await searchTransactions(fetchFn, cometRpcUrl, {
    query,
    page,
    limit,
    order,
  });

  return {
    transactions: (response.txs ?? []).map(toTransactionSummary),
    total: BigInt(response.total_count ?? 0),
  };
}

function transactionQuery(
  blockHeight: ListTransactionsParameters["blockHeight"],
): string {
  if (blockHeight === undefined) {
    return "tx.height > 0";
  }
  const height = BigInt(blockHeight);
  if (height < 1n) {
    throw new Error("blockHeight must be greater than zero.");
  }
  return `tx.height = ${height}`;
}
