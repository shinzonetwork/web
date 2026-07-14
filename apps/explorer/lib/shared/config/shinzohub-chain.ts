import { getShinzoHubChain as selectShinzoHubChain } from '@shinzo/shinzohub';
import type { Chain } from 'viem';

type ExplorerShinzoHubChain = Chain & {
  rpcUrls: Chain['rpcUrls'] & {
    cosmosRest: { http: readonly string[] };
    cometRpc: { http: readonly string[] };
  };
};

export function createShinzoHubChain(): ExplorerShinzoHubChain {
  return selectShinzoHubChain(
    process.env.SHINZOHUB_CHAIN,
  ) as unknown as ExplorerShinzoHubChain;
}

let shinzohubChain: ReturnType<typeof createShinzoHubChain> | null = null;

export function getShinzoHubChain() {
  if (!shinzohubChain) {
    shinzohubChain = createShinzoHubChain();
  }
  return shinzohubChain;
}
