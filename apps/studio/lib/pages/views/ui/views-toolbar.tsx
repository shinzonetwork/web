"use client";

import type { ReactNode } from "react";
import { SearchInput } from "@shinzo/ui/search-input";
import { Tabs, TabsList, TabsTrigger } from "@shinzo/ui/tabs";
import {
  VIEWS_ALL_LENSES_FILTER,
  VIEWS_VERIFICATION_FILTERS,
  type ViewsFilters,
  type ViewsLensFilterOption,
  type ViewsVerificationFilter,
} from "../model/types";

const VERIFICATION_LABELS: Record<ViewsVerificationFilter, string> = {
  all: "All",
  verified: "Verified",
  "not-verified": "Not verified",
};

const isViewsVerificationFilter = (
  value: string
): value is ViewsVerificationFilter =>
  VIEWS_VERIFICATION_FILTERS.includes(value as ViewsVerificationFilter);

interface ViewsToolbarProps {
  filters: ViewsFilters;
  lensOptions: readonly ViewsLensFilterOption[];
  totalCount: number;
  visibleCount: number;
  onFiltersChange: (filters: ViewsFilters) => void;
  action: ReactNode;
}

export const ViewsToolbar = ({
  filters,
  lensOptions,
  totalCount,
  visibleCount,
  onFiltersChange,
  action,
}: ViewsToolbarProps) => (
  <section className="flex flex-col gap-4 border-b border-ui-border pb-5">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="font-mono text-3xl font-light text-szo-black">Views</h1>
        <p className="text-sm text-szo-black/55">
          Showing {visibleCount} of {totalCount} ShinzoHub Studio views.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">{action}</div>
    </div>

    <div className="grid gap-3 lg:grid-cols-[auto_auto_minmax(16rem,1fr)] lg:items-center">
      <Tabs
        value={filters.verification}
        onValueChange={(value) => {
          if (!isViewsVerificationFilter(value)) return;
          onFiltersChange({ ...filters, verification: value });
        }}
      >
        <TabsList className="max-w-full overflow-x-auto">
          {VIEWS_VERIFICATION_FILTERS.map((filter) => (
            <TabsTrigger key={filter} value={filter} className="h-10 px-4 text-sm">
              {VERIFICATION_LABELS[filter]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <label className="flex h-11 items-center gap-2 border border-ui-border bg-white px-3 font-mono text-sm text-szo-black">
        <span className="text-szo-black/50">Lens</span>
        <select
          value={filters.lensKey}
          onChange={(event) =>
            onFiltersChange({ ...filters, lensKey: event.target.value })
          }
          className="min-w-36 bg-transparent text-szo-black outline-none"
        >
          <option value={VIEWS_ALL_LENSES_FILTER}>All</option>
          {lensOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <SearchInput
        placeholder="Search views, owners, contracts, or lenses"
        value={filters.search}
        onChange={(event) =>
          onFiltersChange({ ...filters, search: event.target.value })
        }
      />
    </div>
  </section>
);
