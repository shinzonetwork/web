import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getChainId,
  shinzoHubChain,
  shinzoHubChains,
  shinzoHubDevelop,
  shinzoHubDevnet,
  shinzoHubLocal,
} from "./index";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("getChainId", () => {
  it("fetches the chain ID from a Comet status endpoint", async () => {
    globalThis.fetch = vi.fn(async (input) => {
      expect(String(input)).toBe("http://rpc.example.com:26657/status");
      return Response.json({
        result: {
          node_info: {
            network: " shinzo-devnet ",
          },
        },
      });
    }) as typeof fetch;

    await expect(
      getChainId({ cometRpcUrl: "http://rpc.example.com:26657/" }),
    ).resolves.toBe("shinzo-devnet");
  });

  it("normalizes the common /:port typo before querying status", async () => {
    globalThis.fetch = vi.fn(async (input) => {
      expect(String(input)).toBe("http://rpc.example.com:26657/status");
      return Response.json({
        result: {
          node_info: {
            network: "shinzo-devnet",
          },
        },
      });
    }) as typeof fetch;

    await expect(
      getChainId({ cometRpcUrl: "http://rpc.example.com/:26657" }),
    ).resolves.toBe("shinzo-devnet");
  });

  it("throws when the status response does not include a chain ID", async () => {
    globalThis.fetch = vi.fn(async () =>
      Response.json({ result: { node_info: {} } }),
    ) as typeof fetch;

    await expect(
      getChainId({ cometRpcUrl: "http://rpc.example.com:26657" }),
    ).rejects.toThrow("Comet status query did not return a chain ID.");
  });
});

describe("shinzoHubChain", () => {
  it("builds a chain definition with live endpoints and numeric chain ID", async () => {
    globalThis.fetch = vi.fn(async () =>
      Response.json({
        result: {
          node_info: {
            network: "91273002",
          },
        },
      }),
    ) as typeof fetch;

    await expect(
      shinzoHubChain({
        defaultRpcUrl: "http://rpc.example.com:8545",
        cometRpcUrl: "http://rpc.example.com:26657",
        cosmosRestUrl: "http://rpc.example.com:1317",
      }),
    ).resolves.toMatchObject({
      id: 91273002,
      name: "ShinzoHub",
      rpcUrls: {
        default: { http: ["http://rpc.example.com:8545"] },
        cosmosRest: { http: ["http://rpc.example.com:1317"] },
        cometRpc: { http: ["http://rpc.example.com:26657"] },
      },
    });
  });
});

describe("Viem chain definitions", () => {
  it("defines standard chain metadata for develop environment", () => {
    expect(shinzoHubDevelop).toMatchObject({
      id: 91273002,
      name: "ShinzoHub Develop",
      nativeCurrency: {
        name: "Shinzo",
        symbol: "SHNZ",
        decimals: 18,
      },
    });
    expect(shinzoHubDevelop.rpcUrls.default.http).toEqual([
      "http://rpc.develop.devnet.shinzo.network:8545",
    ]);
    expect((shinzoHubDevelop.rpcUrls as any).cosmosRest.http).toEqual([
      "http://rpc.develop.devnet.shinzo.network:1317",
    ]);
  });

  it("defines standard chain metadata for local environment", () => {
    expect(shinzoHubLocal).toMatchObject({
      id: 91273002,
      name: "ShinzoHub Local",
    });
    expect(shinzoHubLocal.rpcUrls.default.http).toEqual(["http://localhost:8545"]);
    expect((shinzoHubLocal.rpcUrls as any).cosmosRest.http).toEqual([
      "http://localhost:1317",
    ]);
  });

  it("defines the public devnet Comet RPC endpoint", () => {
    expect(shinzoHubDevnet).toMatchObject({
      id: 91273002,
      name: "ShinzoHub Devnet",
    });
    expect(shinzoHubDevnet.rpcUrls.default.http).toEqual([
      "http://rpc.devnet.shinzo.network:8545",
    ]);
    expect((shinzoHubDevnet.rpcUrls as any).cometRpc.http).toEqual([
      "http://rpc.devnet.shinzo.network:26657",
    ]);
  });

  it("maps known chains in shinzoHubChains", () => {
    expect(shinzoHubChains.develop).toBe(shinzoHubDevelop);
    expect(shinzoHubChains.local).toBe(shinzoHubLocal);
    expect(shinzoHubChains.devnet).toBe(shinzoHubDevnet);
  });
});
