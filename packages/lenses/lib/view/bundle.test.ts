import { Bundler } from "@shinzonetwork/viewbundle";
import { makeBrowserZstd } from "@shinzonetwork/viewbundle/browser";
import { describe, expect, test } from "vitest";
import { TOKEN_ARGS } from "../../erc20-transfers/test-data";
import { loadWasmBytes } from "../testing/internal";
import { bundleView, validateView, type ViewDefinition } from "./index";

const VALID_QUERY =
  "Ethereum__Mainnet__Log { address topics data blockNumber transaction { hash from to } }";
const VALID_SDL = `type ERC20Transfer @materialized(if: false) {
  tokenAddress: String
  hash: String
  from: String
  to: String
  amount: String
  blockNumber: Int
}`;

const createSampleView = (): ViewDefinition => ({
  query: VALID_QUERY,
  sdl: VALID_SDL,
  lenses: [
    {
      wasmBytes: loadWasmBytes("erc20-transfers/lens.wasm"),
      args: TOKEN_ARGS,
    },
  ],
});

describe("bundleView", () => {
  test("accepts the same ViewDefinition shape as validateView", async () => {
    const view = createSampleView();

    const validation = await validateView(view);
    expect(validation.ok).toBe(true);

    const bundle = await bundleView(view);
    expect(bundle).toBeInstanceOf(Uint8Array);
    expect(bundle.byteLength).toBeGreaterThan(0);
  });

  test("produces bytes that can be decoded by viewbundle", async () => {
    const view = createSampleView();
    const bundle = await bundleView(view);
    const decoded = await new Bundler(makeBrowserZstd()).UnbundleView(bundle);

    expect(decoded.Query).toBe(view.query);
    expect(decoded.Sdl).toBe(view.sdl);
    expect(decoded.Transform.Lenses).toHaveLength(1);
    expect(JSON.parse(decoded.Transform.Lenses[0]!.Arguments)).toEqual(TOKEN_ARGS);
  });
});
