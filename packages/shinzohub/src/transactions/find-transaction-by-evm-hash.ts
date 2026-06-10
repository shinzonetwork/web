import { getFetch } from "../internal/comet";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { normalizeHex } from "../internal/hex";
import {
  searchTransactions,
  toTransactionSummary,
} from "./internal";
import type {
  FindTransactionByEvmHashParameters,
  ShinzoHubTransactionSummary,
} from "./types";

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
