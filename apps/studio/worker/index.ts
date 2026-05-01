import { Hono } from "hono";

interface Env {
  HOST_GRAPHQL_URL?: string;
}

const app = new Hono<{ Bindings: Env }>();

const createHeaders = (contentType: string | undefined): Headers => {
  const headers = new Headers();
  headers.set("content-type", contentType ?? "application/json");
  return headers;
};

app.post("/api/host-graphql", async (c) => {
  const hostGraphqlUrl = c.env.HOST_GRAPHQL_URL?.trim();

  if (!hostGraphqlUrl) {
    return c.json({ error: "HOST_GRAPHQL_URL is not configured." }, 500);
  }

  try {
    const response = await fetch(hostGraphqlUrl, {
      method: "POST",
      headers: createHeaders(c.req.header("content-type")),
      body: await c.req.text(),
      cache: "no-store",
    });

    return new Response(await response.text(), {
      status: response.status,
      statusText: response.statusText,
      headers: createHeaders(response.headers.get("content-type") ?? undefined),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown proxy error";

    return c.json(
      { error: `Failed to reach host GraphQL endpoint: ${message}` },
      502
    );
  }
});

export default app;
