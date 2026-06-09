import { afterEach, describe, expect, it } from "vitest";
import {
  hashFixture,
  mockShinzoHubApi,
  restoreShinzoHubApiMock,
  shinzoHubTestClient,
  transactionDetailsFixture,
  transactionFixture,
} from "../internal/test-utils.js";
import {
  findTransactionByEvmHash,
  getTransaction,
  listTransactions,
} from "./index.js";

const cosmosHashA = hashFixture("11");
const cosmosHashB = hashFixture("22");
const evmHash = hashFixture("aa");

afterEach(restoreShinzoHubApiMock);

describe("transaction queries", () => {
  it("supports combined feeds, EVM feeds, and block-scoped activity", async () => {
    const api = mockShinzoHubApi({
      transactions: [
        transactionFixture({ hash: cosmosHashA, height: 30 }),
        transactionFixture({
          hash: cosmosHashB,
          height: 29,
          kind: "evm",
          evmHash,
        }),
      ],
    });

    const all = await listTransactions(shinzoHubTestClient, {
      kind: "all",
      limit: 1,
    });
    const evm = await listTransactions(shinzoHubTestClient, { kind: "evm" });
    const byBlock = await listTransactions(shinzoHubTestClient, {
      blockHeight: 30,
    });

    expect(all).toMatchObject({
      total: 2n,
      transactions: [{ cosmosHash: cosmosHashA }],
    });
    expect(evm).toMatchObject({
      total: 1n,
      transactions: [{ cosmosHash: cosmosHashB, evmHash, kind: "evm" }],
    });
    expect(byBlock).toMatchObject({
      total: 1n,
      transactions: [{ cosmosHash: cosmosHashA, height: 30n }],
    });
    api.expectRequestCount(3);
  });

  it("presents native and EVM activity in one normalized model", async () => {
    const api = mockShinzoHubApi({
      transactions: [
        transactionFixture({ hash: cosmosHashA, height: 30 }),
        transactionFixture({
          hash: cosmosHashB,
          height: 29,
          kind: "evm",
          evmHash,
          code: 9,
        }),
      ],
    });

    const result = await listTransactions(shinzoHubTestClient, { limit: 2 });

    expect(result.transactions[0]).toMatchObject({
      cosmosHash: cosmosHashA,
      kind: "cosmos",
      success: true,
      actions: ["/cosmos.bank.v1beta1.MsgSend"],
      senders: ["shinzo1sender"],
      recipients: ["shinzo1recipient"],
      fee: "7ushinzo",
    });
    expect(result.transactions[1]).toMatchObject({
      evmHash,
      kind: "evm",
      success: false,
      code: 9,
    });
    api.expectRequestCount(1);
  });

  it("resolves legacy EVM links to canonical Cosmos transaction details", async () => {
    const transaction = transactionFixture({
      hash: cosmosHashA,
      height: 30,
      kind: "evm",
      evmHash,
    });
    const api = mockShinzoHubApi({
      transactions: [transaction],
      transactionDetails: [
        transactionDetailsFixture(transaction, { memo: "hello" }),
      ],
    });

    const resolved = await findTransactionByEvmHash(shinzoHubTestClient, {
      hash: evmHash,
    });
    const details = await getTransaction(shinzoHubTestClient, {
      hash: resolved?.cosmosHash ?? "",
    });

    expect(resolved).toMatchObject({ cosmosHash: cosmosHashA, evmHash });
    expect(details).toMatchObject({
      cosmosHash: cosmosHashA,
      evmHash,
      timestamp: "2026-06-09T12:00:00Z",
      memo: "hello",
      messages: [{ typeUrl: "/cosmos.bank.v1beta1.MsgSend" }],
      feeCoins: [{ denom: "ushinzo", amount: "7" }],
    });
    api.expectRequestCount(2);
  });

  it("preserves actionable node errors when transaction search fails", async () => {
    const api = mockShinzoHubApi({
      rpcErrors: {
        tx_search: {
          code: -32603,
          message: "Internal error",
          data: "transaction indexing is disabled",
        },
      },
    });

    await expect(listTransactions(shinzoHubTestClient)).rejects.toThrow(
      "ShinzoHub tx_search RPC failed: Internal error",
    );
    api.expectRequestCount(1);
  });
});
