export interface Env {
  HOST_GRAPHQL_URL?: string;
  SHINZOHUB_EVM_RPC?: string;
  SHINZOHUB_COSMOS_RPC?: string;
}

export type EnvKey = keyof Env;

export type ProxyResponseKind = "raw" | "graphql";

export interface ProxyOptions {
  kind?: ProxyResponseKind;
}

export type ConfiguredUrl = { url: string } | { error: string };
