import { getIndexerHealth } from "@shinzo/shinzohub";
import { NextRequest } from "next/server";
import { serializeIndexerHealth } from "../_lib/serialize";

export async function GET(req: NextRequest) {
  const ip = req.nextUrl.searchParams.get("ip")?.trim() ?? "";
  if (!ip) {
    return Response.json({ error: "Missing ip parameter" }, { status: 400 });
  }

  try {
    const data = await getIndexerHealth({ ip });
    return Response.json(serializeIndexerHealth(data));
  } catch {
    return Response.json({ error: "Failed to fetch indexer health" }, { status: 502 });
  }
}
