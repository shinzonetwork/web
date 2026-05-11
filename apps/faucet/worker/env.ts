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
  getRequiredEnv('SHINZOHUB_RPC');

export const getShinzoHubCosmosRpcUrl = (): string =>
  getRequiredEnv('SHINZOHUB_COSMOS_RPC');
