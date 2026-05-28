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
  <section className="flex flex-col gap-5 border-b border-ui-border pb-6">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="font-mono text-3xl font-normal text-szo-black">Views</h1>
        <p className="text-sm text-ui-text-muted">
          Showing {visibleCount} of {totalCount} ShinzoHub Studio views.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">{action}</div>
    </div>

    <div className="grid min-w-0 gap-3 lg:grid-cols-[auto_minmax(12rem,18rem)_minmax(16rem,1fr)] lg:items-center">
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

      <label className="flex h-14 min-w-0 items-center gap-3 rounded-xl border-2 border-ui-border bg-white px-5 font-sans text-sm text-ui-text">
        <span className="shrink-0 text-ui-text-muted">Lens</span>
        <select
          value={filters.lensKey}
          onChange={(event) =>
            onFiltersChange({ ...filters, lensKey: event.target.value })
          }
          className="min-w-0 flex-1 bg-transparent text-ui-text outline-none"
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
