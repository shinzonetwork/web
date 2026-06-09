import { getFetch } from "../internal/comet.js";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints.js";
import { normalizeHex } from "../internal/hex.js";
import {
  searchTransactions,
  toTransactionSummary,
} from "./internal.js";
import type {
  FindTransactionByEvmHashParameters,
  ShinzoHubTransactionSummary,
} from "./types.js";

/** Finds the canonical transaction summary associated with an EVM hash. */
export async function findTransactionByEvmHash(
  client: ShinzoHubQueryClient,
  parameters: FindTransactionByEvmHashParameters,
): Promise<ShinzoHubTransactionSummary | null> {
  const hash = normalizeHex(parameters.hash, "hash", 32);
  const response = await searchTransactions(
    getFetch(),
    getRpcEndpoint(client, "cometRpc", parameters.cometRpcUrl),
    {
      query: `ethereum_tx.ethereumTxHash = '${hash}'`,
      page: 1,
      limit: 1,
      order: "desc",
    },
  );
  const transaction = response.txs?.[0];
  return transaction ? toTransactionSummary(transaction) : null;
}
