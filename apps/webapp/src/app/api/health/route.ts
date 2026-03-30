import { NextRequest, NextResponse } from "next/server";
import { isIP } from "node:net";

export const dynamic = "force-dynamic";

const HEALTH_CHECK_TIMEOUT_MS = 5000;

export async function GET(request: NextRequest) {
  const ip = request.nextUrl.searchParams.get("ip")?.trim() ?? "";

  if (!ip) {
    return new Response(JSON.stringify({ error: "Missing ip parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (isIP(ip) === 0) {
    return new Response(JSON.stringify({ error: "ip must be a valid IP" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    HEALTH_CHECK_TIMEOUT_MS
  );

  try {
    const res = await fetch(`http://${ip}:8080/health`, {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
      signal: controller.signal,
    });
    if (!res.ok) {
      return new Response(JSON.stringify({ status: "unhealthy" }), {
        status: res.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to check health:", err);
    }
    return new Response(JSON.stringify({ status: "unhealthy" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
