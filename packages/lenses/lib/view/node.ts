import { makeNodeZstd } from "@shinzonetwork/viewbundle/node";
import { bundleViewWithZstd } from "./bundle";
import { validateView } from "../testing/validate";
import type {
  LensEntry,
  ValidationIssue,
  ViewDefinition,
  ViewValidationResult,
} from "../testing/validate";

export { validateView };
export type { LensEntry, ValidationIssue, ViewDefinition, ViewValidationResult };

/**
 * Bundles a Shinzo view definition into registerable viewbundle bytes using the
 * Node.js compression backend.
 *
 * Use this entry point in tests, scripts, and build pipelines. Browser apps
 * should import `bundleView` from `@shinzo/lenses/view` instead.
 *
 * @param view - Complete logical view definition: source query, output SDL, and
 * ordered WASM lenses with their runtime arguments.
 * @returns Binary viewbundle bytes suitable for `createView(client, { bundle })`
 * from `@shinzo/shinzohub`.
 *
 * @example
 * ```ts
 * import { readFile } from "node:fs/promises";
 * import { bundleView, validateView } from "@shinzo/lenses/view/node";
 *
 * const view = {
 *   query: "Ethereum__Mainnet__Log { address topics data blockNumber transaction { hash from to } }",
 *   sdl: "type TransferView { tokenAddress: String hash: String amount: String }",
 *   lenses: [{ wasmBytes: new Uint8Array(await readFile("erc20-transfers/lens.wasm")) }],
 * };
 *
 * const validation = await validateView(view);
 * if (!validation.ok) throw new Error(validation.issues[0]?.message);
 *
 * const bundle = await bundleView(view);
 * ```
 */
export async function bundleView(view: ViewDefinition): Promise<Uint8Array> {
  return bundleViewWithZstd(view, makeNodeZstd());
}
