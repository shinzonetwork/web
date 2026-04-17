export const WALLETCONNECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_ID ?? "";
export const APP_URL = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

function parseBooleanEnv(
  value: string | undefined,
  defaultValue: boolean
): boolean {
  if (!value) return defaultValue;

  switch (value.trim().toLowerCase()) {
    case "1":
    case "true":
    case "yes":
    case "on":
      return true;
    case "0":
    case "false":
    case "no":
    case "off":
      return false;
    default:
      return defaultValue;
  }
}

export const HOST_GRAPHQL_URL =
  process.env.NEXT_PUBLIC_HOST_GRAPHQL_URL ??
  "http://localhost:9181/api/v0/graphql";
export const HOST_GRAPHQL_PROXY_PATH = "/api/host-graphql";
export const USE_HOST_GRAPHQL_PROXY = parseBooleanEnv(
  process.env.NEXT_PUBLIC_USE_HOST_GRAPHQL_PROXY,
  true
);
export const HOST_GRAPHQL_REQUEST_URL = USE_HOST_GRAPHQL_PROXY
  ? HOST_GRAPHQL_PROXY_PATH
  : HOST_GRAPHQL_URL;
export const SHINZOHUB_CHAIN_ID = Number(
  process.env.NEXT_PUBLIC_SHINZOHUB_CHAIN_ID ?? "91273002"
);
