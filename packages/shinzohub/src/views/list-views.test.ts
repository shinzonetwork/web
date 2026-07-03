import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createPublicClient,
  http,
  type Hex,
} from "viem";
import { shinzoHubDevelop } from "../chains/index";
import { createShinzoHubClient } from "../index";
import { listViews } from "./index";

const originalFetch = globalThis.fetch;
const viewAddress = "0x018a06D78E0802dB5bC055B4527d7B481c3e9932" as const satisfies Hex;
const creatorAddress = "0x1234567890AbcdEF1234567890aBcdef12345678" as const satisfies Hex;

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

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("listViews", () => {
  it("lists registered views using REST address fields and checksum creator filters", async () => {
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe(
        `https://rest.example/shinzonetwork/view/v1/views?pagination.limit=1&include_metadata=true&creator=${creatorAddress}`,
      );
      return Response.json({
        views: [
          {
            name: "Studio_DecodedLog",
            creator: creatorAddress.toLowerCase(),
            address: viewAddress.toLowerCase(),
            data: null,
            height: "72059",
            metadata: {
              query: "Log { address }",
              sdl: "type LogView { address: String }",
              root_type: "LogView",
              lenses: [{ id: "1", args: "{}", hash: "0xabc" }],
            },
          },
        ],
        pagination: { next_key: "next", total: "0" },
      });
    }) as typeof fetch;

    const client = createShinzoHubClient(viemClient);
    await expect(
      client.listViews({
        limit: 1,
        includeMetadata: true,
        creator: creatorAddress.toLowerCase(),
      }),
    ).resolves.toEqual({
      views: [
        {
          name: "Studio_DecodedLog",
          creator: creatorAddress,
          viewAddress,
          data: null,
          height: 72059n,
          metadata: {
            query: "Log { address }",
            sdl: "type LogView { address: String }",
            rootType: "LogView",
            lenses: [{ id: 1, args: "{}", hash: "0xabc" }],
            parseError: "",
          },
        },
      ],
      pagination: { nextKey: "next", total: 0n },
    });
  });

  it("queries a custom Cosmos REST deployment", async () => {
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe("https://override.example/shinzonetwork/view/v1/views");
      return Response.json({ views: [], pagination: {} });
    }) as typeof fetch;

    await expect(listViews(viemClient, { cosmosRestUrl: "https://override.example" })).resolves.toEqual({
      views: [],
      pagination: { nextKey: null, total: null },
    });
  });
});
