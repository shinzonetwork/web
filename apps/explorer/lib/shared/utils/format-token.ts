import { formatUnits } from "viem";

export const formatTokenValue = (value: string, decimals: number) => {
    return Number(formatUnits(BigInt(value), decimals)).toFixed(6);
};