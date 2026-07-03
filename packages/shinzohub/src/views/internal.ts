import { getAddress, type Hex } from "viem";
import { normalizeHexAddress, shinzoAddressToHex } from "../addresses/index";
import { buildUrl } from "../internal/fetch";
import type { ListViewsParameters } from "./list-views";
import type { ShinzoHubView, ViewMetadata } from "./types";

export interface ViewWire {
  name?: string;
  creator?: string;
  address?: string;
  data?: string | null;
  height?: string | number;
  metadata?: ViewMetadataWire | null;
}

export interface ViewMetadataWire {
  query?: string;
  sdl?: string;
  root_type?: string;
  lenses?: ViewLensMetadataWire[];
  parse_error?: string;
}

export interface ViewLensMetadataWire {
  id?: number | string;
  args?: string;
  hash?: string;
}

export interface PageResponseWire {
  next_key?: string | null;
  total?: string | number | null;
}

export interface ListViewsWireResponse {
  views?: ViewWire[];
  pagination?: PageResponseWire;
}

export interface GetViewWireResponse {
  view?: ViewWire;
}

export function normalizeViewAddress(value: string): Hex {
  const trimmed = value.trim();
  if (/^0x/i.test(trimmed) || /^[0-9a-fA-F]{40}$/.test(trimmed)) {
    return getAddress(normalizeHexAddress(trimmed));
  }
  return getAddress(shinzoAddressToHex(trimmed));
}

export function buildListViewsUrl(
  baseUrl: string,
  parameters: ListViewsParameters,
): URL {
  const url = buildUrl(baseUrl, "/shinzonetwork/view/v1/views");
  setOptional(url, "pagination.key", parameters.pageKey);
  setOptional(url, "pagination.offset", parameters.offset);
  setOptional(url, "pagination.limit", parameters.limit);
  setOptional(url, "pagination.count_total", parameters.countTotal);
  setOptional(url, "pagination.reverse", parameters.reverse);
  setOptional(url, "include_data", parameters.includeData);
  setOptional(url, "since_block", parameters.sinceBlock);
  setOptional(url, "include_metadata", parameters.includeMetadata);
  setOptional(url, "name", parameters.name);
  setOptional(
    url,
    "creator",
    parameters.creator ? normalizeViewAddress(parameters.creator) : undefined,
  );
  setOptional(url, "metadata_root_type", parameters.metadataRootType);
  setOptional(url, "metadata_lens_hash", parameters.metadataLensHash);
  setOptional(url, "metadata_query_contains", parameters.metadataQueryContains);
  setOptional(url, "metadata_sdl_contains", parameters.metadataSdlContains);
  setOptional(
    url,
    "metadata_lens_args_contains",
    parameters.metadataLensArgsContains,
  );
  return url;
}

export function buildGetViewUrl(
  baseUrl: string,
  viewAddress: string,
  parameters: { includeData?: boolean; includeMetadata?: boolean },
): URL {
  const address = normalizeViewAddress(viewAddress);
  const url = buildUrl(
    baseUrl,
    `/shinzonetwork/view/v1/views/${encodeURIComponent(address)}`,
  );
  setOptional(url, "include_data", parameters.includeData);
  setOptional(url, "include_metadata", parameters.includeMetadata);
  return url;
}

export function setOptional(
  url: URL,
  key: string,
  value: string | number | bigint | boolean | undefined,
): void {
  if (value === undefined || value === "") {
    return;
  }
  url.searchParams.set(key, String(value));
}

export function toPageResponse(
  wire: PageResponseWire | null | undefined,
): { nextKey: string | null; total: bigint | null } {
  const total = wire?.total ?? null;
  return {
    nextKey: wire?.next_key ?? null,
    total: total === null ? null : BigInt(total),
  };
}

export function toView(wire: ViewWire): ShinzoHubView {
  if (!wire.name) {
    throw new Error("View response is missing name.");
  }
  if (!wire.address) {
    throw new Error("View response is missing address.");
  }

  return {
    name: wire.name,
    creator: wire.creator
      ? normalizeViewAddress(wire.creator)
      : getAddress("0x0000000000000000000000000000000000000000"),
    viewAddress: normalizeViewAddress(wire.address),
    data: wire.data ?? null,
    height: BigInt(wire.height ?? 0),
    metadata: wire.metadata ? toMetadata(wire.metadata) : null,
  };
}

export function toMetadata(wire: ViewMetadataWire): ViewMetadata {
  return {
    query: wire.query ?? "",
    sdl: wire.sdl ?? "",
    rootType: wire.root_type ?? "",
    lenses: (wire.lenses ?? []).map((lens) => ({
      id: Number(lens.id ?? 0),
      args: lens.args ?? "",
      hash: lens.hash ?? "",
    })),
    parseError: wire.parse_error ?? "",
  };
}
