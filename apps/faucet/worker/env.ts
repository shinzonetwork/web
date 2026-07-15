import { getShinzoHubChain } from '@shinzo/shinzohub/chains';
import type { Env } from './types';

let faucetEnv: Env | null = null;

export const configureFaucetEnv = (env: Env) => {
  faucetEnv = env;
};

const getConfiguredEnv = (): Required<Env> => {
  if (!faucetEnv) {
    throw new Error('Faucet environment is not configured.');
  }

  return faucetEnv as Required<Env>;
};

export const getRequiredEnv = (
  key: keyof Env,
): string => {
  const value = getConfiguredEnv()[key]?.trim();

  if (!value) {
    throw new Error(`${key} is not configured.`);
  }

  return value;
};

export const getShinzoRpcUrl = (): string =>
  getShinzoHubChain(getConfiguredEnv().SHINZOHUB_CHAIN).rpcUrls.cometRpc.http[0];

export const getShinzoHubCosmosRpcUrl = (): string =>
  getShinzoHubChain(getConfiguredEnv().SHINZOHUB_CHAIN).rpcUrls.cosmosRest.http[0];
