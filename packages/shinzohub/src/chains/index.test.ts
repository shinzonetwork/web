import { describe, expect, it } from "vitest";
import {
  shinzoHubChains,
  shinzoHubDevelop,
  shinzoHubLocal,
} from "./index";

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

  it("maps known chains in shinzoHubChains", () => {
    expect(shinzoHubChains.develop).toBe(shinzoHubDevelop);
    expect(shinzoHubChains.local).toBe(shinzoHubLocal);
  });
});
