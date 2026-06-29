import { afterEach, describe, expect, it, vi } from "vitest";
import { createPublicClient, http } from "viem";
import { shinzoHubDevelop } from "../chains/index";
import { getAssertion } from "./index";

const originalFetch = globalThis.fetch;

const delegateAddress = "shinzo1n97hkw5lqrh62e6644s2nk87uzzyp9u5u9g4pg";

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("getAssertion", () => {
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

  it("loads assertions by delegate address", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe(
        `https://rest.example/shinzonetwork/indexer/v1/assertions/${encodeURIComponent(delegateAddress)}`,
      );
      return Response.json({
        assertions: [
          {
            assertion_id: "assert-yy2569dbyx8",
            consensus_pub_key: "djfsdnknfskdnsdk",
            delegate_address: delegateAddress,
            source_chain: "ethereum",
            source_chain_id: "1",
          },
        ],
      });
    });

    globalThis.fetch = fetchMock as typeof fetch;

    await expect(getAssertion(viemClient, { address: delegateAddress })).resolves.toEqual({
      assertions: [
        {
          assertionId: "assert-yy2569dbyx8",
          consensusPubKey: "djfsdnknfskdnsdk",
          delegateAddress,
          sourceChain: "ethereum",
          sourceChainId: "1",
        },
      ],
    });
  });

  it("returns an empty list when no assertions exist", async () => {
    globalThis.fetch = vi.fn(async () =>
      Response.json({ assertions: [] }),
    ) as typeof fetch;

    await expect(getAssertion(viemClient, { address: delegateAddress })).resolves.toEqual({
      assertions: [],
    });
  });

  it("accepts an explicit Cosmos REST override", async () => {
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe(
        `https://override.example/shinzonetwork/indexer/v1/assertions/${encodeURIComponent(delegateAddress)}`,
      );
      return Response.json({ assertions: [] });
    }) as typeof fetch;

    await expect(
      getAssertion(viemClient, {
        address: delegateAddress,
        cosmosRestUrl: "https://override.example",
      }),
    ).resolves.toEqual({ assertions: [] });
  });
});
