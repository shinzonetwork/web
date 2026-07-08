import { createConfig, http, type Config } from "wagmi";
import type { Chain } from "viem";
import { getRpcUrl } from "./env";

/** Creates a wagmi config bound to the resolved ShinzoHub chain. */
export function createWagmiConfig(chain: Chain): Config {
  return createConfig({
    ssr: true,
    chains: [chain],
    transports: {
      [chain.id]: http(getRpcUrl()),
    },
  });
}
