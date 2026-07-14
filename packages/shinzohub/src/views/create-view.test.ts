import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createWalletClient,
  http,
  type Hex,
} from "viem";
import { shinzoHubDevnet } from "../chains/index";
import { createShinzoHubClient } from "../index";
import {
  createView,
  viewRegistryAddress,
} from "./index";

const creatorAddress = "0x1234567890AbcdEF1234567890aBcdef12345678" as const satisfies Hex;
const txHash = `0x${"11".repeat(32)}` as const satisfies Hex;
const chainId = "0x570b72a";

interface JsonRpcRequest {
  id?: number | string | null;
  method: string;
  params?: unknown[];
}

afterEach(() => {
  vi.restoreAllMocks();
});

function parseRequest(init?: RequestInit): JsonRpcRequest {
  if (typeof init?.body !== "string") {
    throw new Error("Expected JSON-RPC body to be a string.");
  }
  return JSON.parse(init.body) as JsonRpcRequest;
}

describe("createView", () => {
  it("registers a view with ViewRegistry register(bytes)", async () => {
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
      chain: shinzoHubDevnet,
      transport: http("https://evm.example", { fetchFn: fetch }),
    });

    await expect(createView(client, { bundle: "0x6869" })).resolves.toBe(txHash);

    const transaction = requests.find((request) => request.method === "eth_sendTransaction")
      ?.params?.[0] as { data: Hex; to: Hex };
    expect(transaction.to).toBe(viewRegistryAddress);
    expect(transaction.data.startsWith("0x82fbdc9c")).toBe(true);
  });

  it("is exposed through the root ShinzoHub client actions", async () => {
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
        chain: shinzoHubDevnet,
      transport: http("https://evm.example", { fetchFn: fetch }),
    });
    const client = createShinzoHubClient(walletClient);

    await expect(client.createView({ bundle: new Uint8Array([104, 105]) })).resolves.toBe(txHash);

    const transaction = requests.find((request) => request.method === "eth_sendTransaction")
      ?.params?.[0] as { data: Hex; to: Hex };
    expect(transaction.to).toBe(viewRegistryAddress);
    expect(transaction.data.startsWith("0x82fbdc9c")).toBe(true);
  });
});
