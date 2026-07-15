import { getShinzoHubChain } from "@shinzo/shinzohub";
import { Hono } from "hono";
import { proxyToConfiguredUrl, proxyToPath, proxyToUrl } from "./proxy";
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
    proxyToUrl(
      "SHINZOHUB_CHAIN EVM RPC",
      c.req.raw,
      getShinzoHubChain(c.env.SHINZOHUB_CHAIN).rpcUrls.default.http[0],
      "raw"
    )
  );

  app.all(`${SHINZOHUB_COSMOS_RPC_PROXY_PATH}/*`, async (c) =>
    proxyToPath(
      "SHINZOHUB_CHAIN Cosmos REST",
      c.req.raw,
      SHINZOHUB_COSMOS_RPC_PROXY_PATH,
      getShinzoHubChain(c.env.SHINZOHUB_CHAIN).rpcUrls.cosmosRest.http[0]
    )
  );

  return app;
};
