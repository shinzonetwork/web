import { createConfig, http, type Config } from "wagmi";
import type { Chain } from "viem";
import { shinzoChain } from "./shinzohub";

/** Creates the wagmi config for the selected ShinzoHub environment. */
export function createWagmiConfig(): Config {
  const chain = shinzoChain as Chain;

  return createConfig({
    ssr: true,
    chains: [chain],
    transports: {
      [chain.id]: http(),
    },
  });
}
