"use client";

import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  hexToShinzoAddress,
  listViews,
  type ShinzoHubView,
} from "@shinzo/shinzohub";
import { createPublicClient, http } from "viem";
import { useConnection } from "wagmi";
import {
  SHINZOHUB_COSMOS_RPC_REQUEST_URL,
  SHINZOHUB_EVM_RPC_REQUEST_URL,
} from "@/shared/consts/envs";
import { shinzoDevnet } from "@/shared/consts/wagmi";
import { matchLensStatus } from "./lens-matching";
import {
  createBlockscoutAddressLink,
  createViewHref,
  formatHeight,
  normalizeSearchValue,
  toHeightNumber,
} from "./view-formatters";
import {
  DEFAULT_VIEWS_FILTERS,
  type UseViewsResult,
  type ViewsFilters,
  type ViewsMetadataState,
  type ViewsOwnerFilter,
  type ViewsPageItem,
  type ViewsResult,
} from "./types";

const HUB_VIEWS_PAGE_LIMIT = 200;
const VIEWS_STALE_TIME_MS = 60 * 1000;
const VIEWS_QUERY_KEY = "studio-views-page";

interface ViewsPageResponse {
  readonly items: readonly ViewsPageItem[];
  readonly nextPageKey: string | null;
}

const shinzohubPublicClient = createPublicClient({
  chain: shinzoDevnet,
  transport: http(SHINZOHUB_EVM_RPC_REQUEST_URL),
});

const getHubCosmosRestUrl = (): string => {
  const trimmed = SHINZOHUB_COSMOS_RPC_REQUEST_URL.trim();

  if (!trimmed) {
    throw new Error("ShinzoHub Cosmos RPC proxy path is not configured.");
  }

  return new URL(trimmed, window.location.origin).toString();
};

const compareViewsByHeightDesc = (
  left: ViewsPageItem,
  right: ViewsPageItem
): number => right.heightNumber - left.heightNumber;

const getMetadataState = (view: ShinzoHubView): ViewsMetadataState => {
  const { metadata } = view;

  if (!metadata) {
    return {
      status: "missing",
    };
  }

  const lensHashes = metadata.lenses
    .map((lens) => lens.hash.trim())
    .filter((hash) => hash.length > 0);

  if (metadata.parseError.trim()) {
    return {
      status: "parse-error",
      rootType: metadata.rootType,
      lensHashes,
      parseError: metadata.parseError,
    };
  }

  return {
    status: "parsed",
    rootType: metadata.rootType,
    lensHashes,
  };
};

const createSearchText = (item: Omit<ViewsPageItem, "searchText">): string => {
  const metadataText =
    item.metadata.status === "missing"
      ? ""
      : `${item.metadata.rootType} ${item.metadata.lensHashes.join(" ")}`;
  const lensText =
    item.lens.status === "verified"
      ? `${item.lens.title} ${item.lens.lensKey}`
      : item.lens.status;

  return normalizeSearchValue(
    [
      item.name,
      item.creator.address,
      item.contract.address,
      item.height,
      metadataText,
      lensText,
    ].join(" ")
  );
};

const toViewsPageItem = (view: ShinzoHubView): ViewsPageItem | null => {
  if (!view.name || !view.contractAddress) {
    return null;
  }

  const metadata = getMetadataState(view);
  if (metadata.status !== "parsed") {
    return null;
  }

  const lens = matchLensStatus(metadata);
  const contract = createBlockscoutAddressLink(view.contractAddress);
  const itemWithoutSearchText = {
    id: view.contractAddress,
    href: createViewHref(view.name),
    name: view.name,
    creator: createBlockscoutAddressLink(view.creator || "unknown"),
    contract,
    height: formatHeight(view.height),
    heightNumber: toHeightNumber(view.height),
    metadata,
    lens,
  } satisfies Omit<ViewsPageItem, "searchText">;

  return {
    ...itemWithoutSearchText,
    searchText: createSearchText(itemWithoutSearchText),
  };
};

const fetchViewsPage = async (
  pageKey: string | null,
  creator: string | null
): Promise<ViewsPageResponse> => {
  const items: ViewsPageItem[] = [];
  const cosmosRestUrl = getHubCosmosRestUrl();

  const payload = await listViews(shinzohubPublicClient, {
    cosmosRestUrl,
    includeMetadata: true,
    limit: HUB_VIEWS_PAGE_LIMIT,
    pageKey: pageKey ?? undefined,
    creator: creator ?? undefined,
  });

  for (const view of payload.views) {
    const item = toViewsPageItem(view);
    if (item) {
      items.push(item);
    }
  }

  return {
    items,
    nextPageKey: payload.pagination.nextKey,
  };
};

const filterViews = (
  items: readonly ViewsPageItem[],
  filters: ViewsFilters
): readonly ViewsPageItem[] => {
  const search = normalizeSearchValue(filters.search);

  return items.filter((item) => {
    if (search && !item.searchText.includes(search)) {
      return false;
    }

    if (
      filters.verification !== "all" &&
      item.lens.status !== filters.verification
    ) {
      return false;
    }

    return true;
  });
};

export const useViews = (): UseViewsResult => {
  const { address } = useConnection();
  const [filters, setFilters] = useState<ViewsFilters>(DEFAULT_VIEWS_FILTERS);
  const ownerFilter: ViewsOwnerFilter =
    filters.owner === "mine" && address ? filters.owner : "all";
  const creatorFilter = useMemo(() => {
    if (ownerFilter !== "mine" || !address) {
      return null;
    }

    return hexToShinzoAddress(address);
  }, [address, ownerFilter]);

  const query = useInfiniteQuery({
    queryKey: [VIEWS_QUERY_KEY, creatorFilter],
    staleTime: VIEWS_STALE_TIME_MS,
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) => fetchViewsPage(pageParam, creatorFilter),
    getNextPageParam: (lastPage) => lastPage.nextPageKey ?? undefined,
  });

  const loadedItems = useMemo<readonly ViewsPageItem[] | null>(() => {
    if (!query.data) {
      return null;
    }

    return query.data.pages
      .flatMap((page) => page.items)
      .sort(compareViewsByHeightDesc);
  }, [query.data]);

  const result = useMemo<ViewsResult | null>(() => {
    if (!loadedItems) {
      return null;
    }

    const items = filterViews(loadedItems, filters);

    return {
      items,
      totalCount: loadedItems.length,
      visibleCount: items.length,
      refreshedAt: query.dataUpdatedAt,
    };
  }, [filters, loadedItems, query.dataUpdatedAt]);

  const sharedState = {
    filters: {
      ...filters,
      owner: ownerFilter,
    },
    setFilters,
    loadMore: () => {
      void query.fetchNextPage();
    },
    hasMore: Boolean(query.hasNextPage),
    isLoadingMore: query.isFetchingNextPage,
  };

  if (query.isLoading) {
    return {
      status: "loading",
      ...sharedState,
    };
  }

  if (query.isError) {
    return {
      status: "error",
      error:
        query.error instanceof Error ? query.error.message : "Unexpected error",
      ...sharedState,
    };
  }

  if (!result) {
    return {
      status: "loading",
      ...sharedState,
    };
  }

  return {
    status: "success",
    result,
    ...sharedState,
  };
};
