import { formatUnits } from "viem";

  
export const formatTokenValue = (value: string, decimals: number) => {
    return formatUnits(BigInt(value), decimals);
  };

export const formatGasPrice = (gasPrice: string) => {
    return formatUnits(BigInt(gasPrice), 9);
  };
