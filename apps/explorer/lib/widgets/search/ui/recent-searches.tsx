import { Clock3 } from "lucide-react";
import { DropdownMenuLabel } from "@shinzo/ui/dropdown-menu";
import type { RecentSearch } from "../model/use-recent-searches";
import type { ExplorerSearchResult } from "../model/search-query";
import {
  getExplorerSearchResultKey,
  SearchResultItem,
} from "./search-result-item";

export function RecentSearches({
  menuId,
  onPick,
  onSelect,
  recentSearches,
}: {
  menuId: string;
  onPick: (result: ExplorerSearchResult) => void;
  onSelect: (result: ExplorerSearchResult) => void;
  recentSearches: RecentSearch[];
}) {
  if (recentSearches.length === 0) return null;

  return (
    <div className="mb-3 border-b border-ui-accent/20 pb-3">
      <DropdownMenuLabel className="flex items-center gap-2">
        <Clock3 aria-hidden className="size-3.5" />
        Recent searches
      </DropdownMenuLabel>
      {recentSearches.map((search) => (
        <SearchResultItem
          key={search.key}
          id={`${menuId}-recent-${getExplorerSearchResultKey(search.result)}`}
          result={search.result}
          onPick={onPick}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
