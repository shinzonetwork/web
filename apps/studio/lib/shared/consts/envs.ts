export const HOST_GRAPHQL_PROXY_PATH = "/api/host-graphql";
export const HOST_GRAPHQL_REQUEST_URL = HOST_GRAPHQL_PROXY_PATH;
export const WALLETCONNECT_ID = import.meta.env.VITE_WALLETCONNECT_ID ?? "";
export const APP_URL = import.meta.env.VITE_APP_URL ?? "http://localhost:5173";
export const SHINZOHUB_LCD_URL = import.meta.env.VITE_SHINZOHUB_LCD_URL ?? "";
export const SHINZOHUB_BLOCK_EXPLORER_URL =
  import.meta.env.VITE_SHINZOHUB_BLOCK_EXPLORER_URL ?? "";
export const SHINZOHUB_EVM_RPC = import.meta.env.VITE_SHINZOHUB_EVM_RPC ?? "";
export const SHINZOHUB_CHAIN_ID = Number(
  import.meta.env.VITE_SHINZOHUB_CHAIN_ID ?? "91273002"
);
