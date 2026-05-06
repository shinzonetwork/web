import type { ConfiguredUrl, Env, EnvKey } from "./types";

export const getConfiguredUrl = (env: Env, key: EnvKey): ConfiguredUrl => {
  const url = env[key]?.trim();

  if (!url) {
    return { error: `${key} is not configured.` };
  }

  return { url };
};
