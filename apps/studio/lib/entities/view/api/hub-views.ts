import { useQuery } from "@tanstack/react-query";
import { listViews, type ShinzoHubView } from "@shinzo/shinzohub";
import { createPublicClient, http } from "viem";
import { STUDIO_VIEW_NAME_PREFIX } from "@/entities/lens";
import {
  SHINZOHUB_COSMOS_RPC_REQUEST_URL,
  SHINZOHUB_EVM_RPC_REQUEST_URL,
} from "@/shared/consts/envs";
import { shinzoDevnet } from "@/shared/consts/wagmi";

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
const shinzohubPublicClient = createPublicClient({
  chain: shinzoDevnet,
  transport: http(SHINZOHUB_EVM_RPC_REQUEST_URL),
});

export const STUDIO_HUB_VIEWS_QUERY_KEY = [
  "studio-hub-views",
  STUDIO_VIEW_NAME_PREFIX,
] as const;

const getHubCosmosRestUrl = (): string => {
  const trimmed = SHINZOHUB_COSMOS_RPC_REQUEST_URL.trim();

  if (!trimmed) {
    throw new Error("ShinzoHub Cosmos RPC proxy path is not configured.");
  }

  return new URL(trimmed, window.location.origin).toString();
};

const toHubViewRecord = (
  view: ShinzoHubView | null | undefined
): HubViewRecord | null => {
  if (!view?.name || !view.contractAddress) {
    return null;
  }

  return {
    name: view.name,
    creator: view.creator ?? "",
    contractAddress: view.contractAddress,
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
  const cosmosRestUrl = getHubCosmosRestUrl();

  while (true) {
    const payload = await listViews(shinzohubPublicClient, {
      cosmosRestUrl,
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

  if (options?.contractAddress) {
    const targetAddress = options.contractAddress.toLowerCase();
    return (
      matchingViews.find(
        (view) => view.contractAddress.toLowerCase() === targetAddress
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
