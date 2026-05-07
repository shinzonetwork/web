import type { Env } from './types';

const DEFAULT_SHINZO_RPC = 'http://rpc.devnet.shinzo.network:26657';
const DEFAULT_SHINZOHUB_COSMOS_RPC = 'http://rpc.devnet.shinzo.network:1317';

let faucetEnv: Env | null = null;

export const configureFaucetEnv = (env: Env) => {
  faucetEnv = env;
};

const getConfiguredEnv = (): Env => {
  if (!faucetEnv) {
    throw new Error('Faucet environment is not configured.');
  }

  return faucetEnv;
};

export const getRequiredEnv = (
  key: 'FAUCET_PRIVATE_KEY' | 'RECAPTCHA_SECRET_KEY',
): string => {
  const value = getConfiguredEnv()[key]?.trim();

  if (!value) {
    throw new Error(`${key} is not configured.`);
  }

  return value;
};

export const getShinzoRpcUrl = (): string =>
  getConfiguredEnv().VITE_SHINZO_RPC?.trim() || DEFAULT_SHINZO_RPC;

export const getShinzoHubCosmosRpcUrl = (): string =>
  getConfiguredEnv().SHINZOHUB_COSMOS_RPC?.trim() || DEFAULT_SHINZOHUB_COSMOS_RPC;
