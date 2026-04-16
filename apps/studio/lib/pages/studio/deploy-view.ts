import { Bundler, bytesToBase64 } from "@shinzonetwork/viewbundle";
import { makeBrowserZstd } from "@shinzonetwork/viewbundle/browser";
import {
  keccak256,
  concat,
  toBytes,
  toHex,
  encodeFunctionData,
  type Hex,
} from "viem";
import {
  VIEW_REGISTRY_ADDRESS,
  VIEW_REGISTRY_ABI,
} from "@/shared/consts/view-config";
import type { LensArgs, LensDefinition } from "./lens-catalog";

function extractRootTypeName(sdl: string): string {
  const m = sdl.match(/type\s+([A-Za-z0-9_]+)/);
  if (!m?.[1]) {
    throw new Error("Invalid SDL: could not find a type declaration");
  }
  return m[1];
}

async function downloadWasm(url: string): Promise<Uint8Array> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download WASM: ${res.status} ${res.statusText}`);
  }
  return new Uint8Array(await res.arrayBuffer());
}

export async function buildDeployTransaction<TArgs extends LensArgs>(
  senderAddress: string,
  lens: LensDefinition<TArgs>,
  args: TArgs
): Promise<{
  to: typeof VIEW_REGISTRY_ADDRESS;
  data: Hex;
  viewName: string;
  viewHash: Hex;
}> {
  // 1. Download and base64-encode the WASM lens
  const wasmBytes = await downloadWasm(lens.wasmUrl);

  // 2. Bundle the view (protobuf + zstd)
  const bundler = new Bundler(makeBrowserZstd());
  const payloadBytes = await bundler.BundleView({
    Query: lens.query,
    Sdl: lens.sdl,
    Transform: {
      Lenses: [
        {
          Path: bytesToBase64(wasmBytes),
          Arguments: JSON.stringify(lens.buildDeployArgs(args)),
        },
      ],
    },
  });

  // 3. Compute view hash: keccak256(senderAddressBytes + payloadBytes)
  const viewHash = keccak256(
    concat([toBytes(senderAddress as Hex), payloadBytes])
  );

  // 4. Build view ID: {RootTypeName}_{viewHash}
  const rootType = extractRootTypeName(lens.sdl);
  const viewName = `${rootType}_${viewHash}`;

  // 5. Encode the register(bytes) calldata
  const payloadHex = toHex(payloadBytes);
  const data = encodeFunctionData({
    abi: VIEW_REGISTRY_ABI,
    functionName: "register",
    args: [payloadHex],
  });

  return {
    to: VIEW_REGISTRY_ADDRESS,
    data,
    viewName,
    viewHash,
  };
}
