import { shinzoHubTestnet } from "@shinzo/shinzohub";
import { createConfig, http, type Config } from "wagmi";
import type { Chain } from "viem";

/** Creates the wagmi config for the public Shinzo testnet. */
export function createWagmiConfig(): Config {
  const chain = shinzoHubTestnet as Chain;

  return createConfig({
    ssr: true,
    chains: [chain],
    transports: {
      [chain.id]: http(),
    },
  });
}
