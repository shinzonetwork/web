export type ViewsVerificationFilter = "all" | "verified" | "not-verified";
export type ViewsOwnerFilter = "all" | "mine";

export interface ViewsFilters {
  search: string;
  owner: ViewsOwnerFilter;
  verification: ViewsVerificationFilter;
}

export interface ViewsAddressLink {
  address: string;
  shortAddress: string;
  href: string;
}

export type ViewsMetadataState =
  | {
      status: "parsed";
      rootType: string;
      lensHashes: readonly string[];
    }
  | {
      status: "parse-error";
      rootType: string;
      lensHashes: readonly string[];
      parseError: string;
    }
  | {
      status: "missing";
    };

export type ViewsLensStatus =
  | {
      status: "verified";
      lensKey: string;
      title: string;
      description: string;
      hash: string;
    }
  | {
      status: "not-verified";
      hashes: readonly string[];
    }
  | {
      status: "unknown";
      reason: "missing-metadata" | "parse-error" | "no-lens-hashes";
    };

export interface ViewsPageItem {
  id: string;
  href: string;
  name: string;
  creator: ViewsAddressLink;
  contract: ViewsAddressLink;
  height: string;
  heightNumber: number;
  metadata: ViewsMetadataState;
  lens: ViewsLensStatus;
  searchText: string;
}

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
