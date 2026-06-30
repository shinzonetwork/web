import { useQuery } from "@tanstack/react-query";
import type { ShinzohubAddressViewsResponse } from "@/shared/shinzohub/types";

export interface FetchShinzohubAddressViewsParameters {
  address: string;
  page: number;
  limit: number;
}

export interface UseShinzohubAddressViewsParameters
  extends FetchShinzohubAddressViewsParameters {
  enabled?: boolean;
}

async function fetchShinzohubAddressViews({
  address,
  page,
  limit,
}: FetchShinzohubAddressViewsParameters): Promise<ShinzohubAddressViewsResponse> {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  const response = await fetch(
    `/api/shinzohub/address/${encodeURIComponent(address)}/views?${searchParams.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch ShinzoHub address views");
  }

  return response.json() as Promise<ShinzohubAddressViewsResponse>;
}

export function useShinzohubAddressViews({
  address,
  page,
  limit,
  enabled = true,
}: UseShinzohubAddressViewsParameters) {
  return useQuery({
    queryKey: ["shinzohub", "address-views", address, page, limit],
    queryFn: () => fetchShinzohubAddressViews({ address, page, limit }),
    enabled: enabled && !!address,
    placeholderData: (previousData) => previousData,
    select: (data) => ({
      views: data.views,
      totalViewsCount: Number(data.pagination.total ?? data.views.length),
    }),
  });
}
