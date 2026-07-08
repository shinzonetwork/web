import { getPublicClient } from '@/shared/viem/client';
import { shinzoHubTestnet } from '@shinzo/shinzohub';

type ShinzoHubEndpointName = 'cosmosRest' | 'cometRpc';

const testnetRpcUrls =
  shinzoHubTestnet.rpcUrls as typeof shinzoHubTestnet.rpcUrls & {
    cosmosRest: { http: readonly string[] };
    cometRpc: { http: readonly string[] };
  };

function getShinzohubRpcEndpoint(name: ShinzoHubEndpointName): string {
  if (name === 'cosmosRest') {
    return (
      process.env.SHINZOHUB_COSMOS_REST_URL ??
      testnetRpcUrls.cosmosRest.http[0]
    );
  }

  return (
    process.env.SHINZOHUB_COMET_RPC_URL ?? testnetRpcUrls.cometRpc.http[0]
  );
}

export function getShinzohubQueryContext() {
  const client = getPublicClient('shinzohub');

  return {
    client,
    cosmosRestUrl: getShinzohubRpcEndpoint('cosmosRest'),
    cometRpcUrl: getShinzohubRpcEndpoint('cometRpc'),
  };
}
