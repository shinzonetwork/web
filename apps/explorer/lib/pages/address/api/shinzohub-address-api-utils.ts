import {
  normalizeShinzoAddress,
  shinzoAddressToHex,
  type ListViewsResult,
  type ShinzoHubView,
} from "@shinzo/shinzohub";
import type { ShinzohubAddressView } from "@/shared/shinzohub/types";
import { STUDIO_VIEW_BASE_URL } from "@/shared/utils/consts";

export interface NormalizedShinzohubAddress {
  inputAddress: string;
  shinzoAddress: string;
  hexAddress: string;
}

export interface ToFilteredViewsTotalParameters {
  limit: number;
  offset?: number;
}

export function normalizeAddressParam(rawAddress: string): NormalizedShinzohubAddress {
  const inputAddress = decodeURIComponent(rawAddress).trim();
  const shinzoAddress = normalizeShinzoAddress(inputAddress);
  const hexAddress = shinzoAddressToHex(shinzoAddress);

  return {
    inputAddress,
    shinzoAddress,
    hexAddress,
  };
}

export function toViewAddressResult(view: ShinzoHubView): ShinzohubAddressView {
  return {
    name: view.name,
    contractAddress: view.contractAddress,
    creator: view.creator,
    height: view.height.toString(),
    externalUrl: `${STUDIO_VIEW_BASE_URL}/${encodeURIComponent(view.name)}`,
  };
}

export function toFilteredViewsTotal(
  result: ListViewsResult,
  { limit, offset = 0 }: ToFilteredViewsTotalParameters,
): string | null {
  const returnedCount = result.views.length;
  if (returnedCount === 0) {
    return "0";
  }

  const observedTotal = offset + returnedCount;
  if (returnedCount < limit) {
    return observedTotal.toString();
  }

  const rpcTotal = result.pagination.total;
  if (rpcTotal !== null && rpcTotal > BigInt(observedTotal)) {
    return rpcTotal.toString();
  }

  return rpcTotal?.toString() ?? observedTotal.toString();
}
