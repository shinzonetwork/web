import { getPublicClient } from '@/shared/viem/client';
import { getShinzoHubChain } from '@/shared/config/shinzohub-chain';

export function getShinzohubQueryContext() {
  const client = getPublicClient('shinzohub');
  const chain = getShinzoHubChain();

  return {
    client,
    cosmosRestUrl: chain.rpcUrls.cosmosRest.http[0],
    cometRpcUrl: chain.rpcUrls.cometRpc.http[0],
  };
}
