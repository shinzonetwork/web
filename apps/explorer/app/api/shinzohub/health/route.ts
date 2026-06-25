import { NextRequest } from "next/server";
import { fetchHealthLiveData } from "@/shared/health/lib/fetch-health-status";
import { isIPv4 } from "@/shared/health/lib/sslip";

export async function GET(req: NextRequest) {
  const ip = req.nextUrl.searchParams.get("ip")?.trim() ?? "";
  if (!ip) {
    return Response.json({ error: "Missing ip parameter" }, { status: 400 });
  }
  if (!isIPv4(ip)) {
    return Response.json({ error: "ip must be a valid IPv4 address" }, { status: 400 });
  }

  try {
    const data = await fetchHealthLiveData(ip);
    return Response.json(data);
  } catch (error) {
    console.error("Failed to fetch health for ip:", ip, error);
    return Response.json({ error: "Failed to fetch health" }, { status: 502 });
  }
}
