import { Bundler, bytesToBase64 } from "@shinzonetwork/viewbundle";
import { makeBrowserZstd } from "@shinzonetwork/viewbundle/browser";
import {
  decodeEventLog,
  encodeFunctionData,
  toHex,
  type Hex,
  type TransactionReceipt,
} from "viem";
import {
  VIEW_REGISTRY_ABI,
  VIEW_REGISTRY_ADDRESS,
} from "@/shared/consts/view-config";
import type { LensArgs, ResolvedLensView } from "./lens-catalog";

export async function downloadWasm(url: string): Promise<Uint8Array> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download WASM: ${res.status} ${res.statusText}`);
  }
  return new Uint8Array(await res.arrayBuffer());
}

export async function buildDeployTransaction<TArgs extends LensArgs>(
  view: ResolvedLensView<TArgs>,
  preloadedWasmBytes?: Uint8Array
): Promise<{
  to: typeof VIEW_REGISTRY_ADDRESS;
  data: Hex;
}> {
  const wasmBytes = preloadedWasmBytes ?? (await downloadWasm(view.wasmUrl));

  const bundler = new Bundler(makeBrowserZstd());
  const payloadBytes = await bundler.BundleView({
    Query: view.query,
    Sdl: view.sdl,
    Transform: {
      Lenses: [
        {
          Path: bytesToBase64(wasmBytes),
          Arguments: JSON.stringify(view.deployArgs),
        },
      ],
    },
  });

  const payloadHex = toHex(payloadBytes);
  const data = encodeFunctionData({
    abi: VIEW_REGISTRY_ABI,
    functionName: "register",
    args: [payloadHex],
  });

  return {
    to: VIEW_REGISTRY_ADDRESS,
    data,
  };
}

export function extractDeployedViewContractAddress(
  receipt: TransactionReceipt
): Hex {
  for (const log of receipt.logs) {
    if (log.address.toLowerCase() !== VIEW_REGISTRY_ADDRESS.toLowerCase()) {
      continue;
    }

    try {
      const decoded = decodeEventLog({
        abi: VIEW_REGISTRY_ABI,
        eventName: "ViewCreated",
        topics: log.topics,
        data: log.data,
        strict: false,
      });

      if (decoded.eventName !== "ViewCreated") {
        continue;
      }

      const { viewAddress } = decoded.args;
      if (typeof viewAddress === "string") {
        return viewAddress as Hex;
      }
    } catch {
      // Ignore unrelated logs emitted by the same transaction.
    }
  }

  throw new Error(
    "Deployment transaction succeeded, but no ViewCreated log was found."
  );
}
