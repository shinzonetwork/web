import { isIP } from "node:net";

const PORT = Number(process.env.PORT) || 3001;
const TIMEOUT_MS = 5000;
function isAllowedOrigin(origin: string): boolean {
  try {
    const { hostname } = new URL(origin);
    return (
      hostname === "shinzo.network" ||
      hostname.endsWith(".shinzo.network")
    );
  } catch {
    return false;
  }
}

function corsHeaders(origin: string | null) {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (origin && isAllowedOrigin(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

Bun.serve({
  port: PORT,
  async fetch(req) {
    const origin = req.headers.get("Origin");
    const cors = corsHeaders(origin);

    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(req.url);
    if (url.pathname !== "/health") {
      return Response.json({ error: "Not found" }, { status: 404, headers: cors });
    }

    const ip = url.searchParams.get("ip")?.trim() ?? "";
    if (!ip) {
      return Response.json({ error: "Missing ip parameter" }, { status: 400, headers: cors });
    }
    if (isIP(ip) === 0) {
      return Response.json(
        { error: "ip must be a valid IP" },
        { status: 400, headers: cors }
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch(`http://${ip}:443/health`, {
        signal: controller.signal,
      });

      if (!res.ok) {
        return Response.json({ status: "unhealthy" }, { status: 502, headers: cors });
      }

      const data = await res.json();
      return Response.json(data, { headers: cors });
    } catch {
      return Response.json({ status: "unhealthy" }, { status: 502, headers: cors });
    } finally {
      clearTimeout(timeoutId);
    }
  },
});

console.log(`Health proxy listening on :${PORT}`);
