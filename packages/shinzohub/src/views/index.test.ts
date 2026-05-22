import { afterEach, describe, expect, it, vi } from "vitest";
import { createPublicClient, createWalletClient, http, type Hex } from "viem";
import { shinzoHubDevelop } from "../chains/index.js";
import { createShinzoHubClient } from "../index.js";
import {
  countViews,
  createView,
  getView,
  listViews,
  viewRegistryAddress,
} from "./index.js";

const viewAddress = "0x018a06D78E0802dB5bC055B4527d7B481c3e9932" as const satisfies Hex;
const creatorAddress = "0x1234567890AbcdEF1234567890aBcdef12345678" as const satisfies Hex;
const txHash = `0x${"11".repeat(32)}` as const satisfies Hex;
const chainId = "0x570b72a";
const originalFetch = globalThis.fetch;

interface JsonRpcRequest {
  id?: number | string | null;
  method: string;
  params?: unknown[];
}

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

function parseRequest(init?: RequestInit): JsonRpcRequest {
  if (typeof init?.body !== "string") {
    throw new Error("Expected JSON-RPC body to be a string.");
  }
  return JSON.parse(init.body) as JsonRpcRequest;
}

describe("createView", () => {
  it("sends register(bytes) when no pricing contract is provided", async () => {
    const requests: JsonRpcRequest[] = [];
    const fetch = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const request = parseRequest(init);
      requests.push(request);
      return Response.json({
        jsonrpc: "2.0",
        id: request.id ?? 1,
        result: request.method === "eth_chainId" ? chainId : txHash,
      });
    });

    const client = createWalletClient({
      account: creatorAddress,
      chain: shinzoHubDevelop,
      transport: http("https://evm.example", { fetchFn: fetch }),
    });

    await expect(createView(client, { bundle: "0x6869" })).resolves.toBe(txHash);

    const transaction = requests.find((request) => request.method === "eth_sendTransaction")
      ?.params?.[0] as { data: Hex; to: Hex };
    expect(transaction.to).toBe(viewRegistryAddress);
    expect(transaction.data.startsWith("0x82fbdc9c")).toBe(true);
  });

  it("sends registerWithPricing(bytes,address) when pricing is provided", async () => {
    const requests: JsonRpcRequest[] = [];
    const fetch = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const request = parseRequest(init);
      requests.push(request);
      return Response.json({
        jsonrpc: "2.0",
        id: request.id ?? 1,
        result: request.method === "eth_chainId" ? chainId : txHash,
      });
    });

    const walletClient = createWalletClient({
      account: creatorAddress,
      chain: shinzoHubDevelop,
      transport: http("https://evm.example", { fetchFn: fetch }),
    });
    const client = createShinzoHubClient(walletClient);

    await expect(
      client.createView({
        bundle: new Uint8Array([104, 105]),
        pricing: creatorAddress,
      }),
    ).resolves.toBe(txHash);

    const transaction = requests.find((request) => request.method === "eth_sendTransaction")
      ?.params?.[0] as { data: Hex; to: Hex };
    expect(transaction.to).toBe(viewRegistryAddress);
    expect(transaction.data.startsWith("0x526670b3")).toBe(true);
  });
});

describe("Cosmos REST view actions", () => {
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

  it("lists views with flat pagination parameters", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe(
        "https://rest.example/shinzonetwork/view/v1/views?pagination.limit=1&include_metadata=true",
      );
      return Response.json({
        views: [
          {
            name: "Studio_DecodedLog",
            creator: "shinzo13eys9kz5u6n74az2nrt0resqgy7fnns89wjca9",
            contract_address: viewAddress,
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
    });

    globalThis.fetch = fetchMock as any;

    const client = createShinzoHubClient(viemClient);
    await expect(client.listViews({ limit: 1, includeMetadata: true })).resolves.toEqual({
      views: [
        {
          name: "Studio_DecodedLog",
          creator: "shinzo13eys9kz5u6n74az2nrt0resqgy7fnns89wjca9",
          contractAddress: viewAddress.toLowerCase() as Hex,
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

  it("fetches one view and counts views", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).endsWith("/view_count")) {
        return Response.json({ count: "42" });
      }
      expect(String(input)).toBe(
        "https://rest.example/shinzonetwork/view/v1/views/0x018a06d78e0802db5bc055b4527d7b481c3e9932?include_data=true",
      );
      return Response.json({
        view: {
          name: "EnsPrimaryNameV1",
          creator: "shinzo1creator",
          contract_address: viewAddress,
          height: "11",
        },
      });
    });

    globalThis.fetch = fetchMock as any;

    await expect(getView(viemClient, { address: viewAddress, includeData: true })).resolves.toMatchObject({
      name: "EnsPrimaryNameV1",
      contractAddress: viewAddress.toLowerCase() as Hex,
      data: null,
      height: 11n,
    });
    await expect(countViews(viemClient)).resolves.toBe(42n);
  });

  it("supports an explicit Cosmos REST endpoint", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe("https://override.example/shinzonetwork/view/v1/views");
      return Response.json({ views: [], pagination: {} });
    });

    globalThis.fetch = fetchMock as any;

    await expect(listViews(viemClient, { cosmosRestUrl: "https://override.example" })).resolves.toEqual({
      views: [],
      pagination: { nextKey: null, total: null },
    });
  });
});
