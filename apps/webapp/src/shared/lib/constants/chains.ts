export const SHINZO_CHAIN_ID = 91273002;

export const AVAILABLE_CHAINS_MAP: Record<string, number> = {
  ethereum: 1,
  sepolia: 11155111,
  polygon: 137,
};

export const getSourceChainMap = () => {
  return AVAILABLE_CHAINS_MAP;
};

export type SourceChainOption = {
  value: string;
  label: string;
};

export const getSourceChainOptions = (): SourceChainOption[] => {
  const sourceChainMap = getSourceChainMap();
  const chainOptions = Object.entries(sourceChainMap).map(([key]) => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }));

  return [{ value: "", label: "Select the chain" }, ...chainOptions];
};
