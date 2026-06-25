import { afterEach, describe, expect, it, vi } from "vitest";
import { createPublicClient, http } from "viem";
import { shinzoHubDevelop } from "../chains/index";
import { getIndexer } from "./index";

const originalFetch = globalThis.fetch;
const shinzoAddress = "shinzo1qqqsyqcyq5rqwzqfpg9scrgwpugpzysngdwwg4";

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("indexer queries", () => {
  it("loads and normalizes a registered indexer", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe(
        `https://rest.example/shinzonetwork/indexer/v1/indexers/${shinzoAddress}`,
      );
      return Response.json({
        indexer: {
          address: shinzoAddress,
          did: "did:key:zQ3indexer",
          connection_string: "/ip4/127.0.0.1/tcp/9172",
          source_chain: "ethereum",
          source_chain_id: "1",
        },
      });
    });
    globalThis.fetch = fetchMock as typeof globalThis.fetch;

    const client = createPublicClient({ chain: shinzoHubDevelop, transport: http() });
    await expect(
      getIndexer(client, { address: shinzoAddress, cosmosRestUrl: "https://rest.example" }),
    ).resolves.toEqual({
      address: shinzoAddress,
      did: "did:key:zQ3indexer",
      connectionString: "/ip4/127.0.0.1/tcp/9172",
      sourceChain: "ethereum",
      sourceChainId: 1n,
    });
  });
});
