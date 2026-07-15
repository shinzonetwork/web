import { useQuery } from "@tanstack/react-query";
import {
  getView,
  listViews,
  type ListViewsResult,
  type ShinzoHubView,
} from "@shinzo/shinzohub";
import { createPublicClient, http } from "viem";
import { STUDIO_VIEW_NAME_PREFIX } from "@/entities/lens";
import {
  SHINZOHUB_COSMOS_RPC_REQUEST_URL,
  SHINZOHUB_EVM_RPC_REQUEST_URL,
} from "@/shared/consts/envs";
import { shinzoChain } from "@/shared/consts/shinzohub";

export interface HubViewRecord {
  name: string;
  creator: string;
  viewAddress: string;
  data: string | null;
  height: string;
}

interface FindHubViewByEntityNameOptions {
  viewAddress?: string;
}

const HUB_VIEWS_PAGE_LIMIT = 200;
const STUDIO_HUB_VIEWS_STALE_TIME_MS = 60 * 1000;
export const shinzohubPublicClient = createPublicClient({
  chain: shinzoChain,
  transport: http(SHINZOHUB_EVM_RPC_REQUEST_URL),
});

export const STUDIO_HUB_VIEWS_QUERY_KEY = [
  "studio-hub-views",
  STUDIO_VIEW_NAME_PREFIX,
] as const;

export const getHubCosmosRestUrl = (): string => {
  const trimmed = SHINZOHUB_COSMOS_RPC_REQUEST_URL.trim();

  if (!trimmed) {
    throw new Error("ShinzoHub Cosmos RPC proxy path is not configured.");
  }

  return new URL(trimmed, window.location.origin).toString();
};

export interface ListHubViewsPageInput {
  limit?: number;
  pageKey?: string | null;
  creator?: string | null;
  name?: string;
  includeMetadata?: boolean;
}

export const fetchHubViewsPage = async (
  input: ListHubViewsPageInput = {}
): Promise<ListViewsResult> =>
  listViews(shinzohubPublicClient, {
    cosmosRestUrl: getHubCosmosRestUrl(),
    includeMetadata: input.includeMetadata,
    limit: input.limit ?? HUB_VIEWS_PAGE_LIMIT,
    pageKey: input.pageKey ?? undefined,
    creator: input.creator ?? undefined,
    name: input.name,
  });

export const fetchHubViewByAddress = async (
  viewAddress: string,
  options?: { includeMetadata?: boolean }
): Promise<ShinzoHubView> =>
  getView(shinzohubPublicClient, {
    cosmosRestUrl: getHubCosmosRestUrl(),
    includeMetadata: options?.includeMetadata,
    viewAddress,
  });

export const fetchHubViewsByName = async (
  name: string,
  options?: { includeMetadata?: boolean; limit?: number }
): Promise<readonly ShinzoHubView[]> => {
  const payload = await fetchHubViewsPage({
    name,
    includeMetadata: options?.includeMetadata,
    limit: options?.limit,
  });

  return payload.views;
};

const toHubViewRecord = (
  view: ShinzoHubView | null | undefined
): HubViewRecord | null => {
  if (!view?.name || !view.viewAddress) {
    return null;
  }

  return {
    name: view.name,
    creator: view.creator ?? "",
    viewAddress: view.viewAddress,
    data: view.data ?? null,
    height: view.height.toString(),
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
    const payload = await fetchHubViewsPage({
      limit: HUB_VIEWS_PAGE_LIMIT,
      pageKey: nextKey ?? undefined,
    });

    for (const view of payload.views) {
      const record = toHubViewRecord(view);
      if (!record?.name.startsWith(STUDIO_VIEW_NAME_PREFIX)) {
        continue;
      }

      collectedViews.push(record);
    }

    nextKey = payload.pagination.nextKey;
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

  if (options?.viewAddress) {
    const targetAddress = options.viewAddress.toLowerCase();
    return (
      matchingViews.find(
        (view) => view.viewAddress.toLowerCase() === targetAddress
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

  const view = entityName
    ? findHubViewByEntityName(query.data, entityName, options)
    : null;

  return {
    ...query,
    view,
  };
};
