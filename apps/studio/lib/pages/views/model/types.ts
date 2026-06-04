import type { ViewSummary } from "@/entities/view";

export type ViewsVerificationFilter = "all" | "verified" | "not-verified";
export type ViewsOwnerFilter = "all" | "mine";

export interface ViewsFilters {
  search: string;
  owner: ViewsOwnerFilter;
  verification: ViewsVerificationFilter;
}

export type ViewsPageItem = ViewSummary;

export interface ViewsResult {
  items: readonly ViewsPageItem[];
  totalCount: number;
  visibleCount: number;
  refreshedAt: number;
}

export type ViewsQueryState =
  | {
      status: "loading";
    }
  | {
      status: "error";
      error: string;
    }
  | {
      status: "success";
      result: ViewsResult;
    };

export type UseViewsResult = ViewsQueryState & {
  filters: ViewsFilters;
  setFilters: (filters: ViewsFilters) => void;
  loadMore: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
};

export const DEFAULT_VIEWS_FILTERS: ViewsFilters = {
  search: "",
  owner: "all",
  verification: "all",
};

export const VIEWS_OWNER_FILTERS = [
  "all",
  "mine",
] as const satisfies readonly ViewsOwnerFilter[];

export const VIEWS_VERIFICATION_FILTERS = [
  "all",
  "verified",
  "not-verified",
] as const satisfies readonly ViewsVerificationFilter[];
