import { formatUnits } from "viem";

export const formatGasPrice = (gasPrice: string) => {
    return Number(formatUnits(BigInt(gasPrice), 9)).toFixed(2);
  };