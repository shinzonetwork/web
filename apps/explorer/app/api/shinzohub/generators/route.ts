import { NextRequest } from "next/server";
import { listGenerators, type ListGeneratorsParameters } from "@shinzo/shinzohub";
import { getShinzohubQueryContext } from "../../../../lib/shared/shinzohub/query-context";
import { serializeGeneratorsList } from "./_lib/serialize";

function parseOptionalBoolean(rawValue: string | null): boolean | undefined {
  if (rawValue === null) return undefined;
  return rawValue === "true";
}

function parseListGeneratorsParameters(
  searchParams: URLSearchParams,
): ListGeneratorsParameters {
  const limit =
    searchParams.get("pagination.limit") ?? searchParams.get("limit") ?? undefined;
  const pageKey =
    searchParams.get("pagination.key") ?? searchParams.get("key") ?? undefined;
  const offset =
    searchParams.get("pagination.offset") ?? searchParams.get("offset") ?? undefined;

  return {
    ...(limit ? { limit } : {}),
    ...(pageKey ? { pageKey } : {}),
    ...(offset ? { offset } : {}),
    countTotal: parseOptionalBoolean(
      searchParams.get("pagination.count_total") ?? searchParams.get("count_total"),
    ),
    reverse: parseOptionalBoolean(
      searchParams.get("pagination.reverse") ?? searchParams.get("reverse"),
    ),
  };
}

export async function GET(req: NextRequest) {
  try {
    const { client, cosmosRestUrl } = getShinzohubQueryContext();
    const result = await listGenerators(client, {
      ...parseListGeneratorsParameters(req.nextUrl.searchParams),
      cosmosRestUrl,
    });

    return Response.json(serializeGeneratorsList(result));
  } catch (err) {
    console.error("Failed to load ShinzoHub generators:", err);
    return Response.json({ error: "Failed to load generators" }, { status: 500 });
  }
}
