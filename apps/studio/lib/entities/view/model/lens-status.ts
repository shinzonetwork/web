import decodeLogMetadata from "@shinzo/lenses/decode-log/metadata.json";
import erc20AccountBalancesMetadata from "@shinzo/lenses/erc20-account-balances/metadata.json";
import erc20TransfersMetadata from "@shinzo/lenses/erc20-transfers/metadata.json";
import { STUDIO_LENS_CATALOG } from "@/entities/lens";
import type { ViewLensStatus, ViewMetadataState } from "./types";

interface LocalLensHashEntry {
  readonly lensKey: string;
  readonly hash: string;
}

const LOCAL_LENS_HASHES = [
  { lensKey: "decode-log", hash: decodeLogMetadata.hash },
  { lensKey: "erc20-transfers", hash: erc20TransfersMetadata.hash },
  {
    lensKey: "erc20-account-balances",
    hash: erc20AccountBalancesMetadata.hash,
  },
] as const satisfies readonly LocalLensHashEntry[];

const studioLensByKey = new Map(
  STUDIO_LENS_CATALOG.map((lens) => [lens.lensKey, lens] as const)
);

const normalizeHash = (hash: string): string => hash.trim().toLowerCase();

const localLensByHash = new Map(
  LOCAL_LENS_HASHES.map((entry) => [normalizeHash(entry.hash), entry] as const)
);

export const matchLensStatus = (
  metadata: ViewMetadataState
): ViewLensStatus => {
  if (metadata.status === "missing") {
    return {
      status: "unknown",
      reason: "missing-metadata",
    };
  }

  if (metadata.status === "parse-error") {
    return {
      status: "unknown",
      reason: "parse-error",
    };
  }

  if (metadata.lensHashes.length === 0) {
    return {
      status: "unknown",
      reason: "no-lens-hashes",
    };
  }

  for (const hash of metadata.lensHashes) {
    const localLens = localLensByHash.get(normalizeHash(hash));
    if (!localLens) continue;

    const lens = studioLensByKey.get(localLens.lensKey);
    if (!lens) continue;

    return {
      status: "verified",
      lensKey: lens.lensKey,
      title: lens.title,
      description: lens.description,
      hash,
    };
  }

  return {
    status: "not-verified",
    hashes: metadata.lensHashes,
  };
};
