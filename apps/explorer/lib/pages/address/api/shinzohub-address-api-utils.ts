import {
  normalizeShinzoAddress,
  shinzoAddressToHex,
  type ShinzoHubView,
} from "@shinzo/shinzohub";
import type { ShinzohubAddressView } from "@/shared/shinzohub/types";
import { STUDIO_VIEW_BASE_URL } from "@/shared/utils/consts";

export interface NormalizedShinzohubAddress {
  inputAddress: string;
  shinzoAddress: string;
  hexAddress: string;
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
