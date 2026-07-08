import { NextRequest } from "next/server";
import { listHosts } from "@shinzo/shinzohub";
import { getShinzohubQueryContext } from "@/shared/lib";
import { serializeHostsList } from "./_lib/serialize";

function parsePositiveInteger(
  rawValue: string | null,
  fallback: number
): number {
  const value = rawValue ? Number(rawValue) : fallback;
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

export async function GET(req: NextRequest) {
  try {
    const page = parsePositiveInteger(req.nextUrl.searchParams.get("page"), 1);
    const limit = Math.min(
      100,
      parsePositiveInteger(req.nextUrl.searchParams.get("limit"), 10)
    );
    const { client, cosmosRestUrl } = await getShinzohubQueryContext();
    const result = await listHosts(client, {
      limit,
      offset: (page - 1) * limit,
      countTotal: true,
      cosmosRestUrl,
    });

    return Response.json(serializeHostsList(result));
  } catch (err) {
    console.error("Failed to load ShinzoHub hosts:", err);
    return Response.json({ error: "Failed to load hosts" }, { status: 500 });
  }
}
