"use client";

import type { ReactNode } from "react";
import { SearchInput } from "@shinzo/ui/search-input";
import { Tabs, TabsList, TabsTrigger } from "@shinzo/ui/tabs";
import { useConnection } from "wagmi";
import {
  VIEWS_OWNER_FILTERS,
  VIEWS_VERIFICATION_FILTERS,
  type ViewsFilters,
  type ViewsOwnerFilter,
  type ViewsVerificationFilter,
} from "../model/types";

const OWNER_LABELS: Record<ViewsOwnerFilter, string> = {
  all: "All",
  mine: "My views",
};

const VERIFICATION_LABELS: Record<ViewsVerificationFilter, string> = {
  all: "All",
  verified: "Verified",
  "not-verified": "Not verified",
};

const isViewsOwnerFilter = (value: string): value is ViewsOwnerFilter =>
  VIEWS_OWNER_FILTERS.includes(value as ViewsOwnerFilter);

const isViewsVerificationFilter = (
  value: string
): value is ViewsVerificationFilter =>
  VIEWS_VERIFICATION_FILTERS.includes(value as ViewsVerificationFilter);

interface ViewsToolbarProps {
  filters: ViewsFilters;
  totalCount: number;
  visibleCount: number;
  onFiltersChange: (filters: ViewsFilters) => void;
  action: ReactNode;
}

export const ViewsToolbar = ({
  filters,
  totalCount,
  visibleCount,
  onFiltersChange,
  action,
}: ViewsToolbarProps) => {
  const { address } = useConnection();
  const showOwnerFilter = Boolean(address);

  return (
    <section className="flex flex-col gap-5 border-b border-ui-border pb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="font-mono text-3xl font-normal text-szo-black">
            Views
          </h1>
          <p className="text-sm text-ui-text-muted">
            Showing {visibleCount} of {totalCount} ShinzoHub Studio views.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">{action}</div>
      </div>

      <div
        className={`grid min-w-0 gap-3 lg:items-center ${
          showOwnerFilter
            ? "lg:grid-cols-[auto_auto_minmax(16rem,1fr)]"
            : "lg:grid-cols-[auto_minmax(16rem,1fr)]"
        }`}
      >
        {showOwnerFilter && (
          <Tabs
            value={filters.owner}
            onValueChange={(value) => {
              if (!isViewsOwnerFilter(value)) return;
              onFiltersChange({ ...filters, owner: value });
            }}
          >
            <TabsList className="max-w-full overflow-x-auto">
              {VIEWS_OWNER_FILTERS.map((filter) => (
                <TabsTrigger
                  key={filter}
                  value={filter}
                  className="h-14 flex-none px-6 text-sm font-medium data-[state=inactive]:no-underline before:hidden"
                >
                  {OWNER_LABELS[filter]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        <Tabs
          value={filters.verification}
          onValueChange={(value) => {
            if (!isViewsVerificationFilter(value)) return;
            onFiltersChange({ ...filters, verification: value });
          }}
        >
          <TabsList className="max-w-full overflow-x-auto">
            {VIEWS_VERIFICATION_FILTERS.map((filter) => (
              <TabsTrigger
                key={filter}
                value={filter}
                className="h-14 flex-none px-6 text-sm font-medium data-[state=inactive]:no-underline before:hidden"
              >
                {VERIFICATION_LABELS[filter]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <SearchInput
          placeholder="Search views, creators, view addresses, or lenses"
          value={filters.search}
          onChange={(event) =>
            onFiltersChange({ ...filters, search: event.target.value })
          }
        />
      </div>
    </section>
  );
};
