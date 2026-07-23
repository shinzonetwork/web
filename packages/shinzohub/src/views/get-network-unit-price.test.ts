import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createPublicClient,
  encodeFunctionData,
  encodeFunctionResult,
  http,
  type Hex,
} from "viem";
import { shinzoHubDevnet } from "../chains/index";
import {
  getNetworkUnitPrice,
  poolRegistryReadAbi,
  poolRegistryReadAddress,
} from "./get-network-unit-price";

const poolAddress = "0xDbc3bE7CBd8Dc8901E3BbbeA1A740BE490dAe23B";
const viewAddress = "0xEAc245f905e0aAcF3b9Fe27153F2AaF485dc1B48";
const chainId = "0x570b729";

interface JsonRpcRequest {
  id?: number | string | null;
  method: string;
  params?: unknown[];
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("getNetworkUnitPrice", () => {
  it("reads the authoritative unit price from PoolRegistry", async () => {
    const requests: JsonRpcRequest[] = [];
    const fetch = vi.fn(
      async (_input: RequestInfo | URL, init?: RequestInit) => {
        const request = parseRequest(init);
        requests.push(request);
        return Response.json({
          jsonrpc: "2.0",
          id: request.id ?? 1,
          result:
            request.method === "eth_chainId"
              ? chainId
              : encodeFunctionResult({
                  abi: poolRegistryReadAbi,
                  functionName: "getPool",
                  result: {
                    poolAddress,
                    viewAddress,
                    config: { windowSize: 100n },
                    isActive: true,
                    price: 100000000000000n,
                  },
                }),
        });
      },
    );
    const client = createPublicClient({
      chain: shinzoHubDevnet,
      transport: http("https://evm.example", { fetchFn: fetch }),
    });

    await expect(getNetworkUnitPrice(client, { poolAddress })).resolves.toBe(
      100000000000000n,
    );

    const call = requests.find((request) => request.method === "eth_call")
      ?.params?.[0] as { data: Hex; to: Hex };
    expect(call.to).toBe(poolRegistryReadAddress);
    expect(call.data).toBe(
      encodeFunctionData({
        abi: poolRegistryReadAbi,
        functionName: "getPool",
        args: [poolAddress],
      }),
    );
  });
});

function parseRequest(init?: RequestInit): JsonRpcRequest {
  if (typeof init?.body !== "string") {
    throw new Error("Expected JSON-RPC body to be a string.");
  }
  return JSON.parse(init.body) as JsonRpcRequest;
}
