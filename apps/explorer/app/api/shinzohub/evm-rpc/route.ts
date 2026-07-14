import { getShinzoHubChain } from '@/shared/config/shinzohub-chain';

/** Proxies browser EVM requests to the selected chain's HTTP RPC without mixed-content errors. */
export async function POST(request: Request) {
  try {
    const response = await fetch(
      getShinzoHubChain().rpcUrls.default.http[0],
      {
        method: 'POST',
        headers: {
          'content-type':
            request.headers.get('content-type') ?? 'application/json',
        },
        body: await request.arrayBuffer(),
        cache: 'no-store',
      },
    );

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'content-type':
          response.headers.get('content-type') ?? 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to proxy ShinzoHub EVM RPC:', error);
    return Response.json(
      { error: 'ShinzoHub EVM RPC is unavailable.' },
      { status: 502 },
    );
  }
}
