import { Bundler, bytesToBase64, type View } from "@shinzonetwork/viewbundle";
import type { ViewDefinition } from "../testing/validate";

interface ZstdImplementation {
  compress(raw: Uint8Array): Uint8Array | Promise<Uint8Array>;
  decompress(compressed: Uint8Array): Uint8Array | Promise<Uint8Array>;
}

const DEFAULT_LENS_ARGS = {};

/**
 * Converts a logical Shinzo view definition into the wire shape expected by
 * `@shinzonetwork/viewbundle`.
 */
export function toBundleView(view: ViewDefinition): View {
  return {
    Query: view.query,
    Sdl: view.sdl,
    Transform: {
      Lenses: view.lenses.map((lens) => ({
        Path: bytesToBase64(lens.wasmBytes),
        Arguments: stringifyLensArgs(lens.args),
      })),
    },
  };
}

function stringifyLensArgs(args: unknown): string {
  const serialized = JSON.stringify(args ?? DEFAULT_LENS_ARGS);
  if (serialized == null) {
    throw new Error("Lens arguments must be JSON-serializable.");
  }
  return serialized;
}

/**
 * Bundles a logical view definition with the provided compression backend.
 */
export async function bundleViewWithZstd(
  view: ViewDefinition,
  zstd: ZstdImplementation
): Promise<Uint8Array> {
  return new Bundler(zstd).BundleView(toBundleView(view));
}
