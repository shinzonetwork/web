import decodeLogMetadata from "@shinzo/lenses/decode-log/metadata.json";
import ensDomainProjectorMetadata from "@shinzo/lenses/ens/domain-projector/metadata.json";
import ensEventProjectorMetadata from "@shinzo/lenses/ens/event-projector/metadata.json";
import ensPrimaryNameProjectorMetadata from "@shinzo/lenses/ens/primary-name-projector/metadata.json";
import ensRegistrationProjectorMetadata from "@shinzo/lenses/ens/registration-projector/metadata.json";
import ensResolverRecordProjectorMetadata from "@shinzo/lenses/ens/resolver-record-projector/metadata.json";
import ensWrappedDomainProjectorMetadata from "@shinzo/lenses/ens/wrapped-domain-projector/metadata.json";
import erc20AccountBalancesMetadata from "@shinzo/lenses/erc20-account-balances/metadata.json";
import erc20TransfersMetadata from "@shinzo/lenses/erc20-transfers/metadata.json";
import { STUDIO_LENS_CATALOG } from "@/entities/lens";
import type { ViewsLensStatus, ViewsMetadataState } from "./types";

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
  { lensKey: "ens-domain-v1", hash: ensDomainProjectorMetadata.hash },
  {
    lensKey: "ens-registration-v1",
    hash: ensRegistrationProjectorMetadata.hash,
  },
  {
    lensKey: "ens-wrapped-domain-v1",
    hash: ensWrappedDomainProjectorMetadata.hash,
  },
  {
    lensKey: "ens-resolver-record-v1",
    hash: ensResolverRecordProjectorMetadata.hash,
  },
  {
    lensKey: "ens-primary-name-v1",
    hash: ensPrimaryNameProjectorMetadata.hash,
  },
  { lensKey: "ens-event-v1", hash: ensEventProjectorMetadata.hash },
] as const satisfies readonly LocalLensHashEntry[];

const studioLensByKey = new Map(
  STUDIO_LENS_CATALOG.map((lens) => [lens.lensKey, lens] as const)
);

const normalizeHash = (hash: string): string => hash.trim().toLowerCase();

const localLensByHash = new Map(
  LOCAL_LENS_HASHES.map((entry) => [normalizeHash(entry.hash), entry] as const)
);

export const getVerifiedLensOptions = () =>
  LOCAL_LENS_HASHES.map((entry) => {
    const lens = studioLensByKey.get(entry.lensKey);

    return {
      key: entry.lensKey,
      label: lens?.title ?? entry.lensKey,
    };
  });

export const matchLensStatus = (
  metadata: ViewsMetadataState
): ViewsLensStatus => {
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
