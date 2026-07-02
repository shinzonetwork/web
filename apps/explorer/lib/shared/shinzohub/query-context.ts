import { getPublicClient } from '@/shared/viem/client';

type ShinzoHubEndpointName = 'cosmosRest' | 'cometRpc';

function getShinzohubRpcEndpoint(
  client: ReturnType<typeof getPublicClient>,
  name: ShinzoHubEndpointName,
): string {
  const url = client.chain?.rpcUrls?.[name]?.http?.[0];
  if (!url) {
    throw new Error(`ShinzoHub ${name} endpoint is not configured.`);
  }
  return url;
}

export function getShinzohubQueryContext() {
  const client = getPublicClient('shinzohub');

  return {
    client,
    cosmosRestUrl: getShinzohubRpcEndpoint(client, 'cosmosRest'),
    cometRpcUrl: getShinzohubRpcEndpoint(client, 'cometRpc'),
  };
}
