// src/app/api/health/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const ip = request.nextUrl.searchParams.get("ip");

  if (!ip) {
    return NextResponse.json({ error: "Missing ip parameter" }, { status: 400 });
  }

  const host = ip.includes(":") ? `[${ip}]` : ip;

  try {
    const res = await fetch(`http://${host}:8080/health`, {
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Unhealthy" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Unreachable" }, { status: 503 });
  }
}
