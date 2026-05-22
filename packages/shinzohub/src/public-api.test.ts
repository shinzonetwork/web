import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import * as shinzohub from "./index.js";

const expectedRootExports = [
  "countViews",
  "createShinzoHubClient",
  "createView",
  "getView",
  "hexToShinzoAddress",
  "listViews",
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
  it("keeps the root export surface intentionally small", () => {
    expect(Object.keys(shinzohub).sort()).toEqual([...expectedRootExports].sort());
  });

  it("does not expose internal or legacy package subpaths", async () => {
    const packageJson = JSON.parse(
      await readFile(new URL("../package.json", import.meta.url), "utf8"),
    ) as {
      exports: Record<string, unknown>;
    };

    expect(Object.keys(packageJson.exports).sort()).toEqual([
      ".",
      "./addresses",
      "./chains",
      "./package.json",
      "./views",
    ]);
  });
});
