import {
  normalizeHexAddress,
  shinzoAddressToHex,
  type ShinzoHubView,
} from "@shinzo/shinzohub";
import { SHINZOHUB_BLOCK_EXPLORER_URL } from "@/shared/consts/envs";
import { matchLensStatus } from "./lens-status";
import type {
  ViewAddressLink,
  ViewDetails,
  ViewMetadataState,
  ViewSummary,
} from "./types";

export const shortenAddress = (value: string, visible = 14): string => {
  if (value.length <= visible) return value;
  return `${value.slice(0, 8)}...${value.slice(-4)}`;
};

const toEvmAddress = (value: string): string => {
  const trimmed = value.trim();

  try {
    if (/^0x/i.test(trimmed) || /^[0-9a-fA-F]{40}$/.test(trimmed)) {
      return normalizeHexAddress(trimmed);
    }

    return shinzoAddressToHex(trimmed);
  } catch {
    return trimmed;
  }
};

export const createExplorerAddressLink = (
  address: string
): ViewAddressLink => {
  const evmAddress = toEvmAddress(address);
  const explorerUrl = SHINZOHUB_BLOCK_EXPLORER_URL.replace(/\/+$/, "");

  return {
    address: evmAddress,
    shortAddress: shortenAddress(evmAddress),
    href: explorerUrl ? `${explorerUrl}/address/${evmAddress}` : null,
  };
};

export const createViewHref = (name: string): string =>
  `/views/${encodeURIComponent(name)}`;

export const decodeViewRouteIdentifier = (pathname: string): string => {
  const rawIdentifier = pathname.replace(/^\/views\/?/, "").split("/")[0] ?? "";

  try {
    return decodeURIComponent(rawIdentifier);
  } catch {
    return rawIdentifier;
  }
};

export const toViewAddress = (value: string | null | undefined): string | null => {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  try {
    if (
      /^0x[0-9a-fA-F]{40}$/.test(trimmed) ||
      /^[0-9a-fA-F]{40}$/.test(trimmed)
    ) {
      return normalizeHexAddress(trimmed);
    }

    return shinzoAddressToHex(trimmed);
  } catch {
    return null;
  }
};

export const formatHeight = (height: bigint): string => height.toString();

export const toHeightNumber = (height: bigint): number => {
  const parsed = Number(height);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const normalizeSearchValue = (value: string): string =>
  value.trim().toLowerCase();

export const getViewMetadataState = (
  view: ShinzoHubView
): ViewMetadataState => {
  const { metadata } = view;

  if (!metadata) {
    return {
      status: "missing",
    };
  }

  const lensHashes = metadata.lenses
    .map((lens) => lens.hash.trim())
    .filter((hash) => hash.length > 0);

  if (metadata.parseError.trim()) {
    return {
      status: "parse-error",
      rootType: metadata.rootType,
      lensHashes,
      parseError: metadata.parseError,
    };
  }

  return {
    status: "parsed",
    rootType: metadata.rootType,
    lensHashes,
  };
};

export const assertParsedViewMetadata = (
  view: ShinzoHubView
): NonNullable<ShinzoHubView["metadata"]> => {
  const metadata = view.metadata;

  if (!metadata) {
    throw new Error(
      `View "${view.name || view.contractAddress}" does not include metadata.`
    );
  }

  if (metadata.parseError.trim()) {
    throw new Error(
      `View "${view.name || view.contractAddress}" metadata failed to parse: ${metadata.parseError}`
    );
  }

  return metadata;
};

const createSummarySearchText = (
  item: Omit<ViewSummary, "searchText">
): string => {
  const metadataText =
    item.metadata.status === "missing"
      ? ""
      : `${item.metadata.rootType} ${item.metadata.lensHashes.join(" ")}`;
  const lensText =
    item.lens.status === "verified"
      ? `${item.lens.title} ${item.lens.lensKey}`
      : item.lens.status;

  return normalizeSearchValue(
    [
      item.name,
      item.creator.address,
      item.contract.address,
      item.height,
      metadataText,
      lensText,
    ].join(" ")
  );
};

export const toViewSummary = (view: ShinzoHubView): ViewSummary | null => {
  if (!view.name || !view.contractAddress) {
    return null;
  }

  const metadata = getViewMetadataState(view);
  if (metadata.status !== "parsed") {
    return null;
  }

  const itemWithoutSearchText = {
    id: view.contractAddress,
    href: createViewHref(view.name),
    name: view.name,
    creator: createExplorerAddressLink(view.creator || "unknown"),
    contract: createExplorerAddressLink(view.contractAddress),
    height: formatHeight(view.height),
    heightNumber: toHeightNumber(view.height),
    metadata,
    lens: matchLensStatus(metadata),
  } satisfies Omit<ViewSummary, "searchText">;

  return {
    ...itemWithoutSearchText,
    searchText: createSummarySearchText(itemWithoutSearchText),
  };
};

export const toViewDetails = (view: ShinzoHubView): ViewDetails => {
  const metadata = assertParsedViewMetadata(view);
  const metadataState = getViewMetadataState(view);
  const lensHashes = metadata.lenses
    .map((lens) => lens.hash.trim())
    .filter((hash) => hash.length > 0);

  return {
    id: view.contractAddress,
    name: view.name,
    creator: createExplorerAddressLink(view.creator || "unknown"),
    contract: createExplorerAddressLink(view.contractAddress),
    height: formatHeight(view.height),
    heightNumber: toHeightNumber(view.height),
    rootType: metadata.rootType,
    sdl: metadata.sdl,
    query: metadata.query,
    lens: matchLensStatus(metadataState),
    lensHashes,
  };
};
