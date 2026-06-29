import { getGeneratorHealth } from "@shinzo/shinzohub";
import { NextRequest } from "next/server";
import { serializeGeneratorHealth } from "../_lib/serialize";

export async function GET(req: NextRequest) {
  const ip = req.nextUrl.searchParams.get("ip")?.trim() ?? "";
  if (!ip) {
    return Response.json({ error: "Missing ip parameter" }, { status: 400 });
  }

  try {
    const data = await getGeneratorHealth({ ip });
    return Response.json(serializeGeneratorHealth(data));
  } catch {
    return Response.json({ error: "Failed to fetch generator health" }, { status: 502 });
  }
}
