export interface Env {
  FAUCET_PRIVATE_KEY?: string;
  RECAPTCHA_SECRET_KEY?: string;
  SHINZOHUB_CHAIN?: string;
  VITE_RECAPTCHA_SITE_KEY?: string;
}

export type FaucetDropResult =
  | { txHash: string; address: string }
  | { error: string };
