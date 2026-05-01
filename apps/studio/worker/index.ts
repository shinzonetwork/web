import { Hono } from "hono";

interface Env {
  HOST_GRAPHQL_URL?: string;
  SHINZOHUB_EVM_RPC?: string;
  SHINZOHUB_COSMOS_RPC?: string;
}

const app = new Hono<{ Bindings: Env }>();

const SHINZOHUB_COSMOS_RPC_PROXY_PATH = "/api/shinzohub-cosmos-rpc";

const createProxyRequestHeaders = (request: Request): Headers => {
  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const accept = request.headers.get("accept");

  if (contentType) {
    headers.set("content-type", contentType);
  }
  if (accept) {
    headers.set("accept", accept);
  }

  return headers;
};

const createProxyResponseHeaders = (response: Response): Headers => {
  const headers = new Headers();
  const contentType = response.headers.get("content-type");

  if (contentType) {
    headers.set("content-type", contentType);
  }
  headers.set("cache-control", "no-store");

  return headers;
};

const getConfiguredUrl = (
  env: Env,
  key: keyof Env
): { url: string } | { error: string } => {
  const url = env[key]?.trim();

  if (!url) {
    return { error: `${key} is not configured.` };
  }

  return { url };
};

const appendTrailingSlash = (url: string): string =>
  url.endsWith("/") ? url : `${url}/`;

const buildProxyInit = async (request: Request): Promise<RequestInit> => {
  const method = request.method;
  const hasBody = method !== "GET" && method !== "HEAD";

  return {
    method,
    headers: createProxyRequestHeaders(request),
    body: hasBody ? await request.arrayBuffer() : undefined,
    cache: "no-store",
  };
};

const proxyToConfiguredUrl = async (
  env: Env,
  key: keyof Env,
  request: Request,
  targetUrl?: string
): Promise<Response> => {
  const configuredUrl = getConfiguredUrl(env, key);

  if ("error" in configuredUrl) {
    return Response.json({ error: configuredUrl.error }, { status: 500 });
  }

  try {
    const response = await fetch(
      targetUrl ?? configuredUrl.url,
      await buildProxyInit(request)
    );

    return new Response(await response.text(), {
      status: response.status,
      statusText: response.statusText,
      headers: createProxyResponseHeaders(response),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown proxy error";

    return Response.json(
      { error: `Failed to reach upstream ${key}: ${message}` },
      { status: 502 }
    );
  }
};

app.post("/api/host-graphql", async (c) => {
  return proxyToConfiguredUrl(c.env, "HOST_GRAPHQL_URL", c.req.raw);
});

app.post("/api/shinzohub-evm-rpc", async (c) => {
  return proxyToConfiguredUrl(c.env, "SHINZOHUB_EVM_RPC", c.req.raw);
});

app.all(`${SHINZOHUB_COSMOS_RPC_PROXY_PATH}/*`, async (c) => {
  const configuredUrl = getConfiguredUrl(c.env, "SHINZOHUB_COSMOS_RPC");

  if ("error" in configuredUrl) {
    return c.json({ error: configuredUrl.error }, 500);
  }

  const requestUrl = new URL(c.req.url);
  const upstreamPath = c.req.path
    .slice(SHINZOHUB_COSMOS_RPC_PROXY_PATH.length)
    .replace(/^\/+/, "");
  let targetUrl: URL;

  try {
    targetUrl = new URL(upstreamPath, appendTrailingSlash(configuredUrl.url));
  } catch {
    return c.json({ error: "SHINZOHUB_COSMOS_RPC is not a valid URL." }, 500);
  }

  targetUrl.search = requestUrl.search;

  return proxyToConfiguredUrl(
    c.env,
    "SHINZOHUB_COSMOS_RPC",
    c.req.raw,
    targetUrl.toString()
  );
});

export default app;
