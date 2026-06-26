import { afterEach, describe, expect, it, vi } from "vitest";
import { createPublicClient, http } from "viem";
import { shinzoHubDevelop } from "../chains/index";
import { createShinzoHubClient } from "../index";
import { getIndexer, getIndexerHealth, listIndexers } from "./index";
import { UNHEALTHY_LIVE_DATA } from "./get-indexer-health";

const originalFetch = globalThis.fetch;

const indexerAddress = "shinzo1n97hkw5lqrh62e6644s2nk87uzzyp9u5u9g4pg";

const indexerWire = {
  address: indexerAddress,
  did: "did:key:zQ3shaXAyH7cPt1SiemqWtwXTt47EUWvCucxXmg1asUPdNk6P",
  connection_string:
    "/ip4/184.147.199.95/tcp/9171/p2p/12D3KooWQn339hGpGpg5AMN1PotxuJtYvhh1i4NqkPivfxdHSBQT",
  source_chain: "ethereum",
  source_chain_id: "1",
};

const indexer = {
  address: indexerAddress,
  did: indexerWire.did,
  connectionString: indexerWire.connection_string,
  sourceChain: indexerWire.source_chain,
  sourceChainId: indexerWire.source_chain_id,
};

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("listIndexers", () => {
  const mockChain = {
    ...shinzoHubDevelop,
    rpcUrls: {
      ...shinzoHubDevelop.rpcUrls,
      cosmosRest: { http: ["https://rest.example"] },
    },
  };

  const viemClient = createPublicClient({
    chain: mockChain,
    transport: http(),
  });

  it("lists registered indexers with pagination options", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe(
        "https://rest.example/shinzonetwork/indexer/v1/indexers?pagination.limit=25&pagination.count_total=true",
      );
      return Response.json({
        indexers: [indexerWire],
        pagination: { next_key: "next", total: "1" },
      });
    });

    globalThis.fetch = fetchMock as typeof fetch;

    const client = createShinzoHubClient(viemClient);
    await expect(
      client.listIndexers({ limit: 25, countTotal: true }),
    ).resolves.toEqual({
      indexers: [indexer],
      pagination: { nextKey: "next", total: 1 },
    });
  });

  it("accepts an explicit Cosmos REST override", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe("https://override.example/shinzonetwork/indexer/v1/indexers");
      return Response.json({ indexers: [], pagination: { next_key: null, total: "0" } });
    });

    globalThis.fetch = fetchMock as typeof fetch;

    await expect(
      listIndexers(viemClient, { cosmosRestUrl: "https://override.example" }),
    ).resolves.toEqual({
      indexers: [],
      pagination: { nextKey: null, total: 0 },
    });
  });
});

describe("getIndexer", () => {
  const mockChain = {
    ...shinzoHubDevelop,
    rpcUrls: {
      ...shinzoHubDevelop.rpcUrls,
      cosmosRest: { http: ["https://rest.example"] },
    },
  };

  const viemClient = createPublicClient({
    chain: mockChain,
    transport: http(),
  });

  it("loads indexer details by address", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe(
        `https://rest.example/shinzonetwork/indexer/v1/indexers/${encodeURIComponent(indexerAddress)}`,
      );
      return Response.json({ indexer: indexerWire });
    });

    globalThis.fetch = fetchMock as typeof fetch;

    const client = createShinzoHubClient(viemClient);
    await expect(client.getIndexer({ address: indexerAddress })).resolves.toEqual(indexer);
  });

  it("accepts an explicit Cosmos REST override", async () => {
    const fetchMock = vi.fn(async () => Response.json({ indexer: indexerWire }));

    globalThis.fetch = fetchMock as typeof fetch;

    await expect(
      getIndexer(viemClient, {
        address: indexerAddress,
        cosmosRestUrl: "https://override.example",
      }),
    ).resolves.toMatchObject({ address: indexerAddress });
  });
});

describe("getIndexerHealth timeout", () => {
  it("returns unhealthy after each candidate port times out", async () => {
    vi.useFakeTimers();

    globalThis.fetch = vi.fn((_url, init?: RequestInit) => {
      return new Promise((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => {
          reject(new DOMException("The operation was aborted.", "AbortError"));
        });
      });
    }) as typeof fetch;

    const promise = getIndexerHealth({ ip: "203.0.113.20", timeoutMs: 50 });
    const expectation = expect(promise).resolves.toEqual(UNHEALTHY_LIVE_DATA);

    await vi.advanceTimersByTimeAsync(50);
    await vi.advanceTimersByTimeAsync(50);
    await expectation;

    expect(globalThis.fetch).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });

  it("does not wait for later ports after the first succeeds", async () => {
    globalThis.fetch = vi.fn(async (url) => {
      if (String(url).includes(":443")) {
        return Response.json({ status: "healthy", uptime: 1, uptime_seconds: 1, last_processed: "", current_block: 1, p2p: null });
      }
      throw new Error("should not reach port 8080");
    }) as typeof fetch;

    await expect(getIndexerHealth({ ip: "203.0.113.20", timeoutMs: 50 })).resolves.toMatchObject({
      status: "healthy",
    });

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });
});