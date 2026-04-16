export const WALLETCONNECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_ID ?? "";
export const APP_URL = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
export const HOST_GRAPHQL_URL =
  process.env.NEXT_PUBLIC_HOST_GRAPHQL_URL ??
  "http://localhost:9181/api/v0/graphql";
export const HOST_GRAPHQL_PROXY_PATH = "/api/host-graphql";
export const SHINZOHUB_CHAIN_ID = Number(
  process.env.NEXT_PUBLIC_SHINZOHUB_CHAIN_ID ?? "91273002"
);
