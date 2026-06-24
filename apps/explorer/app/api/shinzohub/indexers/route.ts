import { NextRequest } from "next/server";
import { listIndexers, type ListIndexersParameters } from "@shinzo/shinzohub";
import { getShinzohubQueryContext } from "../../../../lib/shared/shinzohub/query-context";
import { serializeIndexersList } from "./_lib/serialize";

function parseOptionalBoolean(rawValue: string | null): boolean | undefined {
  if (rawValue === null) return undefined;
  return rawValue === "true";
}

function parseListIndexersParameters(
  searchParams: URLSearchParams,
): ListIndexersParameters {
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
    const result = await listIndexers(client, {
      ...parseListIndexersParameters(req.nextUrl.searchParams),
      cosmosRestUrl,
    });

    return Response.json(serializeIndexersList(result));
  } catch (err) {
    console.error("Failed to load ShinzoHub indexers:", err);
    return Response.json({ error: "Failed to load indexers" }, { status: 500 });
  }
}
