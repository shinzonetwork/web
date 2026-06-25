import { afterEach, describe, expect, it, vi } from "vitest";
import { createPublicClient, http } from "viem";
import { shinzoHubDevelop } from "../chains/index";
import { getHost } from "./index";

const originalFetch = globalThis.fetch;
const hexAddress = "0x000102030405060708090a0b0c0d0e0f10111213";
const shinzoAddress = "shinzo1qqqsyqcyq5rqwzqfpg9scrgwpugpzysngdwwg4";

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("host queries", () => {
  it("normalizes an EVM address and loads a registered host", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe(
        `https://rest.example/shinzonetwork/host/v1/hosts/${shinzoAddress}`,
      );
      return Response.json({
        host: {
          address: shinzoAddress,
          did: "did:key:zQ3host",
          connection_string: "/ip4/127.0.0.1/tcp/9171",
          endpoint_address: "https://host.example/graphql",
        },
      });
    });
    globalThis.fetch = fetchMock as typeof globalThis.fetch;

    const client = createPublicClient({ chain: shinzoHubDevelop, transport: http() });
    await expect(
      getHost(client, { address: hexAddress, cosmosRestUrl: "https://rest.example" }),
    ).resolves.toEqual({
      address: shinzoAddress,
      did: "did:key:zQ3host",
      connectionString: "/ip4/127.0.0.1/tcp/9171",
      endpointAddress: "https://host.example/graphql",
    });
  });
});
