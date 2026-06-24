import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import * as shinzohub from "./index";

const expectedRootExports = [
  "countViews",
  "createShinzoHubClient",
  "createView",
  "findTransactionByEvmHash",
  "getBlock",
  "getBlockTimestamp",
  "getCreatedViewAddress",
  "getHost",
  "getIndexer",
  "getLatestBlock",
  "getLatestBlockHeight",
  "getTransaction",
  "getView",
  "hexToShinzoAddress",
  "listViews",
  "listBlocks",
  "listHosts",
  "listIndexers",
  "listTransactions",
  "normalizeHexAddress",
  "normalizeShinzoAddress",
  "shinzoAddressToHex",
  "shinzoHubActions",
  "shinzoHubChains",
  "shinzoHubDevelop",
  "shinzoHubDevnet",
  "shinzoHubLocal",
  "shinzoHubMainnet",
  "shinzoHubTestnet",
  "viewRegistryAbi",
  "viewRegistryAddress",
] as const;

describe("public API", () => {
  it("exports the supported SDK capabilities from the package root", () => {
    expect(Object.keys(shinzohub).sort()).toEqual([...expectedRootExports].sort());
  });

  it("limits subpath imports to supported feature modules", async () => {
    const packageJson = JSON.parse(
      await readFile(new URL("../package.json", import.meta.url), "utf8"),
    ) as {
      exports: Record<string, unknown>;
    };

    expect(Object.keys(packageJson.exports).sort()).toEqual([
      ".",
      "./addresses",
      "./blocks",
      "./chains",
      "./hosts",
      "./indexers",
      "./package.json",
      "./transactions",
      "./views",
    ]);
  });
});
