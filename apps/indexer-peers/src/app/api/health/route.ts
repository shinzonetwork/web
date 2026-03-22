import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const ip = req.nextUrl.searchParams.get("ip")?.trim() ?? "";
  if (!ip) {
    return new Response(JSON.stringify({ error: "ip is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const url = `http://${ip}:8080/health`;
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      redirect: "error",
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));
    const data = await res.json();
    const healthy = data.status;

    return new Response(JSON.stringify({ healthy }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ healthy: "unhealthy" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
