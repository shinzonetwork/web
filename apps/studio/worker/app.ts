import { Hono } from "hono";
import { proxyToConfiguredPath, proxyToConfiguredUrl } from "./proxy";
import type { Env } from "./types";

const SHINZOHUB_COSMOS_RPC_PROXY_PATH = "/api/shinzohub-cosmos-rpc";

export const createStudioWorkerApp = (): Hono<{ Bindings: Env }> => {
  const app = new Hono<{ Bindings: Env }>();

  app.post("/api/host-graphql", async (c) =>
    proxyToConfiguredUrl(c.env, "HOST_GRAPHQL_URL", c.req.raw, {
      kind: "graphql",
    })
  );

  app.post("/api/shinzohub-evm-rpc", async (c) =>
    proxyToConfiguredUrl(c.env, "SHINZOHUB_EVM_RPC", c.req.raw)
  );

  app.all(`${SHINZOHUB_COSMOS_RPC_PROXY_PATH}/*`, async (c) =>
    proxyToConfiguredPath(
      c.env,
      "SHINZOHUB_COSMOS_RPC",
      c.req.raw,
      SHINZOHUB_COSMOS_RPC_PROXY_PATH
    )
  );

  return app;
};
