export const SHINZO_TOKEN = {
  name: 'Shinzo',
  symbol: 'SHN',
  denom: 'ushinzo',
  decimals: 18,
};

export const ETH_TOKEN = {
  name: 'Ethereum',
  symbol: 'ETH',
  decimals: 18,
};

const tokenMap = {
  'shinzohub': SHINZO_TOKEN,
  'ethereum': ETH_TOKEN,
};

export const getToken = (name: string) => {
  return tokenMap[name as keyof typeof tokenMap];
};
