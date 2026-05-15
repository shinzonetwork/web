export const SHINZO_CHAIN_ID = 91273002;

export const AVAILABLE_CHAINS_MAP: Record<string, number> = {
  ethereum: 1,
  sepolia: 11155111,
  polygon: 137,
};

export const getSourceChainMap = () => {
  return AVAILABLE_CHAINS_MAP;
};

export type SourceChainOptions = {
  value: string;
  label: keyof typeof AVAILABLE_CHAINS_MAP;
};

export const getSourceChainOptions = (): SourceChainOptions[] => {
  const sourceChainMap = getSourceChainMap();
  return Object.entries(sourceChainMap).map(([key, _]) => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  })) as SourceChainOptions[];
};
