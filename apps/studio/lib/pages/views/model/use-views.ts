"use client";

import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { hexToShinzoAddress } from "@shinzo/shinzohub";
import { useConnection } from "wagmi";
import {
  fetchHubViewsPage,
  normalizeSearchValue,
  toViewSummary,
} from "@/entities/view";
import {
  DEFAULT_VIEWS_FILTERS,
  type UseViewsResult,
  type ViewsFilters,
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

const compareViewsByHeightDesc = (
  left: ViewsPageItem,
  right: ViewsPageItem
): number => right.heightNumber - left.heightNumber;

const fetchViewsPage = async (
  pageKey: string | null,
  creator: string | null
): Promise<ViewsPageResponse> => {
  const items: ViewsPageItem[] = [];
  const payload = await fetchHubViewsPage({
    includeMetadata: true,
    limit: HUB_VIEWS_PAGE_LIMIT,
    pageKey: pageKey ?? undefined,
    creator: creator ?? undefined,
  });

  for (const view of payload.views) {
    const item = toViewSummary(view);
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
