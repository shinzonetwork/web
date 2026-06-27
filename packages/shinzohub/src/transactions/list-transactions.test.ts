import { afterEach, describe, expect, it, vi } from "vitest";
import { shinzoHubTestClient } from "../internal/test-utils";
import { listTransactions } from "./index";
import { assertAddressFilter } from "./internal";

describe("assertAddressFilter", () => {
  it("accepts bech32 and hex addresses", () => {
    expect(assertAddressFilter("shinzo1alice0000000000000000000000000abcdef")).toContain(
      "shinzo1",
    );
    expect(assertAddressFilter("0x1234567890abcdefABCDEF1234567890abcdef12")).toContain(
      "0x",
    );
  });

  it("rejects quotes, whitespace, empties, and overlong values", () => {
    for (const bad of [
      "",
      "shinzo1' OR '1'='1",
      "shinzo1 alice",
      "addr';--",
      "a".repeat(129),
    ]) {
      expect(() => assertAddressFilter(bad)).toThrow();
    }
  });
});

describe("listTransactions address filter", () => {
  afterEach(() => vi.restoreAllMocks());

  function captureQueries(): string[] {
    const queries: string[] = [];
    vi.spyOn(globalThis, "fetch").mockImplementation(async (_input, init) => {
      const body = JSON.parse(String(init?.body)) as {
        id?: number;
        params: { query: string };
      };
      queries.push(body.params.query);
      return Response.json({
        jsonrpc: "2.0",
        id: body.id ?? 1,
        result: { txs: [], total_count: "0" },
      });
    });
    return queries;
  }

  it("adds a shinzo.address clause to the query", async () => {
    const queries = captureQueries();

    await listTransactions(shinzoHubTestClient, {
      address: "shinzo1alice",
      limit: 25,
    });

    expect(queries).toHaveLength(1);
    expect(queries[0]).toContain("shinzo.address = 'shinzo1alice'");
    expect(queries[0]).toContain("tx.height > 0");
  });

  it("combines the address clause with the EVM filter", async () => {
    const queries = captureQueries();

    await listTransactions(shinzoHubTestClient, {
      address: "0xabc123",
      kind: "evm",
    });

    expect(queries[0]).toContain("ethereum_tx.ethereumTxHash EXISTS");
    expect(queries[0]).toContain("shinzo.address = '0xabc123'");
  });

  it("rejects an injection attempt before issuing a request", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    await expect(
      listTransactions(shinzoHubTestClient, { address: "x' OR '1'='1" }),
    ).rejects.toThrow();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
