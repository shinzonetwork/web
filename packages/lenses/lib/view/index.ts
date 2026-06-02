import { makeBrowserZstd } from "@shinzonetwork/viewbundle/browser";
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
 * Bundles a validated or unvalidated Shinzo view definition into registerable
 * viewbundle bytes using the browser-safe compression backend.
 *
 * `bundleView` intentionally does not call `validateView` for you. Applications
 * can decide whether validation warnings should block deployment, then bundle
 * the same `ViewDefinition` shape once they are ready to register it.
 *
 * @param view - Complete logical view definition: source query, output SDL, and
 * ordered WASM lenses with their runtime arguments.
 * @returns Binary viewbundle bytes suitable for `createView(client, { bundle })`
 * from `@shinzo/shinzohub`.
 *
 * @example
 * ```ts
 * import { bundleView, validateView } from "@shinzo/lenses/view";
 * import { createView } from "@shinzo/shinzohub";
 *
 * const view = {
 *   query: "Ethereum__Mainnet__Log { address topics data blockNumber transaction { hash from to } }",
 *   sdl: "type TransferView { tokenAddress: String hash: String amount: String }",
 *   lenses: [{ wasmBytes, args: { tokenAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7" } }],
 * };
 *
 * const validation = await validateView(view);
 * if (!validation.ok) throw new Error(validation.issues[0]?.message);
 *
 * const bundle = await bundleView(view);
 * const hash = await createView(walletClient, { bundle });
 * ```
 */
export async function bundleView(view: ViewDefinition): Promise<Uint8Array> {
  return bundleViewWithZstd(view, makeBrowserZstd());
}
