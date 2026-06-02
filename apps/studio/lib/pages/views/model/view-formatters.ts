import { normalizeHexAddress, shinzoAddressToHex } from "@shinzo/shinzohub";
import type { ViewsAddressLink } from "./types";

const BLOCKSCOUT_BASE_URL = "http://blockscout.shinzo.network";

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

export const createBlockscoutAddressLink = (
  address: string
): ViewsAddressLink => {
  const evmAddress = toEvmAddress(address);

  return {
    address: evmAddress,
    shortAddress: shortenAddress(evmAddress),
    href: `${BLOCKSCOUT_BASE_URL}/address/${evmAddress}`,
  };
};

export const createViewHref = (name: string): string =>
  `/views/${encodeURIComponent(name)}`;

export const formatHeight = (height: bigint): string => height.toString();

export const toHeightNumber = (height: bigint): number => {
  const parsed = Number(height);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const normalizeSearchValue = (value: string): string =>
  value.trim().toLowerCase();
