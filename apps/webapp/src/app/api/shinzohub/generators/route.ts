import { NextRequest } from "next/server";
import { listGenerators } from "@shinzo/shinzohub";
import { getShinzohubQueryContext } from "@/shared/lib";
import { serializeGeneratorsList } from "./_lib/serialize";

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
    const { client, cosmosRestUrl } = getShinzohubQueryContext();
    const result = await listGenerators(client, {
      limit,
      offset: (page - 1) * limit,
      countTotal: true,
      cosmosRestUrl,
    });

    return Response.json(serializeGeneratorsList(result));
  } catch (err) {
    console.error("Failed to load ShinzoHub generators:", err);
    return Response.json(
      { error: "Failed to load generators" },
      { status: 500 }
    );
  }
}
