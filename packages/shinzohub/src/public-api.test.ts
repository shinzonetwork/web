import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import * as shinzohub from "./index";
import * as views from "./views/index";

const expectedRootExports = [
  "countViews",
  "createShinzoHubClient",
  "createView",
  "defaultShinzoHubChainName",
  "findTransactionByEvmHash",
  "getAccount",
  "getAccountBalance",
  "getBlock",
  "getBlockTimestamp",
  "getCreatedViewAddress",
  "getEvmAccount",
  "getHost",
  "getHostHealth",
  "getGenerator",
  "getChainId",
  "getGeneratorHealth",
  "getGeneratorAssertion",
  "getGeneratorAssertionFromTransaction",
  "getShinzoHubChain",
  "getLatestBlock",
  "getLatestBlockHeight",
  "getNetworkUnitPrice",
  "getTransaction",
  "getView",
  "getViewRegistration",
  "hexToShinzoAddress",
  "isShinzoAddress",
  "listViews",
  "listBlocks",
  "listHosts",
  "listGenerators",
  "listTransactions",
  "listValidators",
  "listViewPools",
  "normalizeHexAddress",
  "normalizeShinzoAddress",
  "parseGeneratorAssertionFromTransaction",
  "shinzoAddressToHex",
  "shinzoHubActions",
  "shinzoHubChain",
  "shinzoHubChains",
  "shinzoHubDevnet",
  "shinzoHubInternal",
  "shinzoHubLocal",
  "shinzoHubTestnet",
  "submitGeneratorAssertion",
  "VIEW_REGISTRY_STATUS_NONE",
  "VIEW_REGISTRY_STATUS_PENDING",
  "VIEW_REGISTRY_STATUS_REGISTERED",
  "viewRegistryAbi",
  "viewRegistryAddress",
] as const;

describe("public API", () => {
  it("exports the supported SDK capabilities from the package root", () => {
    expect(Object.keys(shinzohub).sort()).toEqual(
      [...expectedRootExports].sort(),
    );
  });

  it("limits subpath imports to supported feature modules", async () => {
    const packageJson = JSON.parse(
      await readFile(new URL("../package.json", import.meta.url), "utf8"),
    ) as {
      exports: Record<string, unknown>;
    };

    expect(Object.keys(packageJson.exports).sort()).toEqual([
      ".",
      "./accounts",
      "./addresses",
      "./blocks",
      "./chains",
      "./generators",
      "./hosts",
      "./package.json",
      "./transactions",
      "./validators",
      "./views",
    ]);
  });

  it("keeps view pool reads in the existing views module", () => {
    expect(views).toMatchObject({
      getNetworkUnitPrice: expect.any(Function),
      listViewPools: expect.any(Function),
    });
  });
});
