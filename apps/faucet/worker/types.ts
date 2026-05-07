export interface Env {
  FAUCET_PRIVATE_KEY?: string;
  RECAPTCHA_SECRET_KEY?: string;
  SHINZOHUB_COSMOS_RPC?: string;
  VITE_RECAPTCHA_SITE_KEY?: string;
  VITE_SHINZO_RPC?: string;
}

export type FaucetDropResult =
  | { txHash: string; address: string }
  | { error: string };
