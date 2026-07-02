import { listViews } from "@shinzo/shinzohub";
import {
  normalizeAddressParam,
  toFilteredViewsTotal,
  toViewAddressResult,
  type NormalizedShinzohubAddress,
} from "@/pages/address/api/shinzohub-address-api-utils";
import { getShinzohubQueryContext } from "@/shared/shinzohub/query-context";
import type { ShinzohubAddressViewsResponse } from "@/shared/shinzohub/types";

const DEFAULT_VIEWS_LIMIT = 10;
const MAX_VIEWS_LIMIT = 50;

function parsePositiveInteger(value: string | null, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseViewsPage(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const page = parsePositiveInteger(searchParams.get("page"), 1);
  const rawLimit = parsePositiveInteger(searchParams.get("limit"), DEFAULT_VIEWS_LIMIT);
  const limit = Math.min(rawLimit, MAX_VIEWS_LIMIT);

  return {
    page,
    limit,
    offset: (page - 1) * limit,
  };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ address: string }> },
) {
  const { address: rawAddress } = await params;
  let address: NormalizedShinzohubAddress;

  try {
    address = normalizeAddressParam(rawAddress);
  } catch {
    return Response.json(
      { error: "Invalid ShinzoHub address" },
      { status: 400 },
    );
  }

  try {
    const { client, cosmosRestUrl } = getShinzohubQueryContext();
    const page = parseViewsPage(request);
    const views = await listViews(client, {
      creator: address.shinzoAddress,
      countTotal: true,
      cosmosRestUrl,
      limit: page.limit,
      offset: page.offset,
      reverse: true,
    });

    const response: ShinzohubAddressViewsResponse = {
      ...address,
      views: views.views.map(toViewAddressResult),
      pagination: {
        nextKey: views.pagination.nextKey,
        total: toFilteredViewsTotal(views, {
          limit: page.limit,
          offset: page.offset,
        }),
        page: page.page,
        limit: page.limit,
        offset: page.offset,
      },
    };

    return Response.json(response, {
      headers: { "cache-control": "no-store" },
    });
  } catch (error) {
    console.error("Failed to load ShinzoHub address views:", error);
    return Response.json(
      { error: "Failed to load ShinzoHub address views" },
      { status: 502 },
    );
  }
}
