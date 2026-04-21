import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { STUDIO_VIEW_NAME_PREFIX } from "@/entities/lens";
import { SHINZOHUB_LCD_URL } from "@/shared/consts/envs";

interface HubViewWire {
  name?: string;
  creator?: string;
  contract_address?: string;
  data?: string | null;
  height?: string;
}

interface HubViewsResponse {
  views?: HubViewWire[];
  pagination?: {
    next_key?: string | null;
  };
}

export interface HubViewRecord {
  name: string;
  creator: string;
  contractAddress: string;
  data: string | null;
  height: string;
}

interface FindHubViewByEntityNameOptions {
  contractAddress?: string;
}

const HUB_VIEWS_PAGE_LIMIT = 200;
const STUDIO_HUB_VIEWS_STALE_TIME_MS = 60 * 1000;

export const STUDIO_HUB_VIEWS_QUERY_KEY = [
  "studio-hub-views",
  STUDIO_VIEW_NAME_PREFIX,
] as const;

const normalizeHubBaseUrl = (): string => {
  const trimmed = SHINZOHUB_LCD_URL.trim();

  if (!trimmed) {
    throw new Error("NEXT_PUBLIC_SHINZOHUB_LCD_URL is not set.");
  }

  return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
};

const buildHubUrl = (path: string): URL => new URL(path, normalizeHubBaseUrl());

const hubFetch = async (url: URL): Promise<Response> => {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok && response.status !== 404) {
    throw new Error(
      `ShinzoHub LCD returned ${response.status}: ${response.statusText}`
    );
  }

  return response;
};

const toHubViewRecord = (
  view: HubViewWire | null | undefined
): HubViewRecord | null => {
  if (!view?.name || !view.contract_address) {
    return null;
  }

  return {
    name: view.name,
    creator: view.creator ?? "",
    contractAddress: view.contract_address,
    data: view.data ?? null,
    height: view.height ?? "",
  };
};

const toHeightNumber = (view: HubViewRecord): number => {
  const parsedHeight = Number(view.height);
  return Number.isFinite(parsedHeight) ? parsedHeight : 0;
};

const compareHubViewsByHeightDesc = (
  left: HubViewRecord,
  right: HubViewRecord
): number => toHeightNumber(right) - toHeightNumber(left);

export const fetchStudioHubViews = async (): Promise<HubViewRecord[]> => {
  const collectedViews: HubViewRecord[] = [];
  let nextKey: string | null = null;

  while (true) {
    const url = buildHubUrl("/shinzonetwork/view/v1/views");
    url.searchParams.set("pagination.limit", String(HUB_VIEWS_PAGE_LIMIT));

    if (nextKey) {
      url.searchParams.set("pagination.key", nextKey);
    }

    const response = await hubFetch(url);
    if (response.status === 404) {
      throw new Error("ShinzoHub LCD views endpoint was not found.");
    }

    const payload = (await response.json()) as HubViewsResponse;

    for (const view of payload.views ?? []) {
      const record = toHubViewRecord(view);
      if (!record?.name.startsWith(STUDIO_VIEW_NAME_PREFIX)) {
        continue;
      }

      collectedViews.push(record);
    }

    nextKey = payload.pagination?.next_key ?? null;
    if (!nextKey) {
      break;
    }
  }

  return [...collectedViews].sort(compareHubViewsByHeightDesc);
};

export const findHubViewByEntityName = (
  views: HubViewRecord[] | undefined,
  entityName: string,
  options?: FindHubViewByEntityNameOptions
): HubViewRecord | null => {
  if (!views?.length) {
    return null;
  }

  const matchingViews = views.filter((view) => view.name === entityName);

  if (options?.contractAddress) {
    return (
      matchingViews.find(
        (view) => view.contractAddress === options.contractAddress
      ) ?? null
    );
  }

  return matchingViews[0] ?? null;
};

export const useStudioHubViews = () =>
  useQuery({
    queryKey: STUDIO_HUB_VIEWS_QUERY_KEY,
    staleTime: STUDIO_HUB_VIEWS_STALE_TIME_MS,
    queryFn: fetchStudioHubViews,
  });

export const useStudioHubViewByEntityName = (
  entityName: string | null | undefined,
  options?: FindHubViewByEntityNameOptions
) => {
  const query = useStudioHubViews();

  const view = useMemo(
    () =>
      entityName
        ? findHubViewByEntityName(query.data, entityName, options)
        : null,
    [entityName, options?.contractAddress, query.data]
  );

  return {
    ...query,
    view,
  };
};
