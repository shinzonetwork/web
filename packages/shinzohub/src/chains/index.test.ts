import { afterEach, describe, expect, it, vi } from "vitest";
import {
  defaultShinzoHubChainName,
  getChainId,
  getShinzoHubChain,
  shinzoHubChains,
  shinzoHubDevnet,
  shinzoHubInternal,
  shinzoHubLocal,
  shinzoHubTestnet,
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

describe("Viem chain definitions", () => {
  it("defines the internal environment", () => {
    expect(shinzoHubInternal).toMatchObject({
      id: 91273002,
      name: "Shinzo Internal",
      nativeCurrency: {
        name: "Shinzo",
        symbol: "SHN",
        decimals: 18,
      },
    });
    expect(shinzoHubInternal.rpcUrls.default.http).toEqual([
      "http://testnet-internal.shinzo.network:8545",
    ]);
    expect((shinzoHubInternal.rpcUrls as any).cosmosRest.http).toEqual([
      "http://testnet-internal.shinzo.network:1317",
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

  it("defines the shared devnet endpoints", () => {
    expect(shinzoHubDevnet).toMatchObject({
      id: 91273002,
      name: "Shinzo Devnet",
    });
    expect(shinzoHubDevnet.rpcUrls.default.http).toEqual([
      "http://rpc.develop.devnet.shinzo.network:8545",
    ]);
    expect((shinzoHubDevnet.rpcUrls as any).cosmosRest.http).toEqual([
      "http://rpc.develop.devnet.shinzo.network:1317",
    ]);
    expect((shinzoHubDevnet.rpcUrls as any).cometRpc.http).toEqual([
      "http://rpc.develop.devnet.shinzo.network:26657",
    ]);
  });

  it("defines the public Shinzo testnet wallet metadata", () => {
    expect(shinzoHubTestnet).toMatchObject({
      id: 91273001,
      name: "Shinzo",
      nativeCurrency: {
        name: "Shinzo",
        symbol: "SHN",
        decimals: 18,
      },
      testnet: true,
    });
    expect(shinzoHubTestnet.rpcUrls.default.http).toEqual([
      "http://testnet.shinzo.network:8545",
    ]);
  });

  it("maps known chains in shinzoHubChains", () => {
    expect(Object.keys(shinzoHubChains)).toEqual([
      "testnet",
      "internal",
      "devnet",
      "local",
    ]);
    expect(shinzoHubChains.testnet).toBe(shinzoHubTestnet);
    expect(shinzoHubChains.internal).toBe(shinzoHubInternal);
    expect(shinzoHubChains.devnet).toBe(shinzoHubDevnet);
    expect(shinzoHubChains.local).toBe(shinzoHubLocal);
  });

  it("selects a configured chain and defaults to testnet", () => {
    expect(defaultShinzoHubChainName).toBe("testnet");
    expect(getShinzoHubChain()).toBe(shinzoHubTestnet);
    expect(getShinzoHubChain("internal")).toBe(shinzoHubInternal);
    expect(getShinzoHubChain("devnet")).toBe(shinzoHubDevnet);
    expect(getShinzoHubChain("local")).toBe(shinzoHubLocal);
    expect(() => getShinzoHubChain("mainnet")).toThrow(
      'Unsupported ShinzoHub chain "mainnet"',
    );
  });
});
