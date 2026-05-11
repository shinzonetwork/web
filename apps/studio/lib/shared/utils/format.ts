import { formatUnits } from "viem";

export const formatTimestamp = (timestamp: number): string =>
  new Date(timestamp).toLocaleString();

export const truncateHex = (value: string, visible = 12): string => {
  if (value.length <= visible) return value;
  return `${value.slice(0, 8)}...${value.slice(-4)}`;
};

const MAX_DISPLAY_DECIMALS = 6;

export const formatTokenAmount = (
  rawAmount: string,
  decimals?: number
): string => {
  if (decimals === undefined) return rawAmount;

  try {
    const scaled = formatUnits(BigInt(rawAmount), decimals);
    const [whole, fraction = ""] = scaled.split(".");
    if (!fraction) return whole;

    const trimmed = fraction
      .slice(0, MAX_DISPLAY_DECIMALS)
      .replace(/0+$/, "");
    return trimmed ? `${whole}.${trimmed}` : whole;
  } catch {
    return rawAmount;
  }
};
