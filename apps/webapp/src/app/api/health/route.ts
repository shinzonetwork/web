import { NextRequest, NextResponse } from "next/server";
import { isIP } from "node:net";

export const dynamic = "force-dynamic";

const HEALTH_CHECK_TIMEOUT_MS = 5000;

export async function GET(request: NextRequest) {
  const ip = request.nextUrl.searchParams.get("ip")?.trim() ?? "";

  if (!ip) {
    return NextResponse.json(
      { error: "Missing ip parameter" },
      { status: 400 }
    );
  }
  if (isIP(ip) === 0) {
    return NextResponse.json(
      { error: "ip must be a valid IP" },
      { status: 400 }
    );
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
      return NextResponse.json({ status: "unhealthy" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, {
      status: res.status,
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to check health:", err);
    }
    return NextResponse.json({ status: "unhealthy" }, { status: 502 });
  } finally {
    clearTimeout(timeoutId);
  }
}
