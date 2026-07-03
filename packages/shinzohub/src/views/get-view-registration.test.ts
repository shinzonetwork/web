import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createPublicClient,
  encodeFunctionData,
  encodeFunctionResult,
  http,
  type Hex,
} from "viem";
import { shinzoHubDevelop } from "../chains/index";
import { createShinzoHubClient } from "../index";
import {
  getViewRegistration,
  VIEW_REGISTRY_STATUS_PENDING,
  VIEW_REGISTRY_STATUS_REGISTERED,
  viewRegistryAbi,
  viewRegistryAddress,
} from "./index";

const viewAddress = "0x018a06D78E0802dB5bC055B4527d7B481c3e9932" as const satisfies Hex;
const creatorAddress = "0x1234567890AbcdEF1234567890aBcdef12345678" as const satisfies Hex;
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

describe("getViewRegistration", () => {
  it("reads ViewRegistry lifecycle status for a view address", async () => {
    const requests: JsonRpcRequest[] = [];
    const fetch = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const request = parseRequest(init);
      requests.push(request);
      return Response.json({
        jsonrpc: "2.0",
        id: request.id ?? 1,
        result: request.method === "eth_chainId"
          ? chainId
          : encodeFunctionResult({
              abi: viewRegistryAbi,
              functionName: "getView",
              result: {
                viewAddress,
                name: "Studio_DecodedLog",
                creator: creatorAddress,
                height: 12n,
                status: VIEW_REGISTRY_STATUS_REGISTERED,
              },
            }),
      });
    });

    const client = createPublicClient({
      chain: shinzoHubDevelop,
      transport: http("https://evm.example", { fetchFn: fetch }),
    });

    await expect(getViewRegistration(client, { viewAddress: viewAddress.toLowerCase() })).resolves.toEqual({
      viewAddress,
      name: "Studio_DecodedLog",
      creator: creatorAddress,
      height: 12n,
      status: "registered",
    });

    const call = requests.find((request) => request.method === "eth_call")?.params?.[0] as {
      data: Hex;
      to: Hex;
    };
    expect(call.to).toBe(viewRegistryAddress);
    expect(call.data).toBe(encodeFunctionData({
      abi: viewRegistryAbi,
      functionName: "getView",
      args: [viewAddress],
    }));
  });

  it("is exposed through the root ShinzoHub client actions", async () => {
    const fetch = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const request = parseRequest(init);
      return Response.json({
        jsonrpc: "2.0",
        id: request.id ?? 1,
        result: request.method === "eth_chainId"
          ? chainId
          : encodeFunctionResult({
              abi: viewRegistryAbi,
              functionName: "getView",
              result: {
                viewAddress,
                name: "Studio_DecodedLog",
                creator: creatorAddress,
                height: 13n,
                status: VIEW_REGISTRY_STATUS_PENDING,
              },
            }),
      });
    });

    const client = createShinzoHubClient(createPublicClient({
      chain: shinzoHubDevelop,
      transport: http("https://evm.example", { fetchFn: fetch }),
    }));

    await expect(client.getViewRegistration({ viewAddress })).resolves.toMatchObject({
      height: 13n,
      status: "pending",
    });
  });
});
