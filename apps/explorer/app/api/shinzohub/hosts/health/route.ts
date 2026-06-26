import { getHostHealth } from "@shinzo/shinzohub";
import { NextRequest } from "next/server";
import { serializeHostHealth } from "../_lib/serialize";

export async function GET(req: NextRequest) {
  const ip = req.nextUrl.searchParams.get("ip")?.trim() ?? "";
  if (!ip) {
    return Response.json({ error: "Missing ip parameter" }, { status: 400 });
  }

  try {
    const data = await getHostHealth({ ip });
    return Response.json(serializeHostHealth(data));
  } catch{
    return Response.json({ error: "Failed to fetch host health" }, { status: 502 });
  }
}
