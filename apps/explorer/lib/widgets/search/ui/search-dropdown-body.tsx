import { DropdownMenuLabel } from "@shinzo/ui/dropdown-menu";
import {
  getIncompleteSearchState,
  getNoResultsSearchState,
} from "../model/search-empty-state";
import type { ExplorerSearchResult } from "../model/search-query";
import type { useExplorerSearch } from "../model/use-explorer-search";
import type { RecentSearch } from "../model/use-recent-searches";
import { RecentSearches } from "./recent-searches";
import { SearchError } from "./search-error";
import { SearchGuide } from "./search-guide";
import { SearchMessage } from "./search-message";
import {
  getExplorerSearchResultKey,
  SearchResultItem,
} from "./search-result-item";

type ExplorerSearchState = ReturnType<typeof useExplorerSearch>;

export function SearchDropdownBody({
  activeIndex,
  menuId,
  onExampleSelect,
  onHighlight,
  onPick,
  onRetry,
  onSelect,
  recentSearches,
  search,
}: {
  activeIndex: number;
  menuId: string;
  onExampleSelect: (query: string) => void;
  onHighlight: (index: number) => void;
  onPick: (result: ExplorerSearchResult) => void;
  onRetry: () => void;
  onSelect: (result: ExplorerSearchResult) => void;
  recentSearches: RecentSearch[];
  search: ExplorerSearchState;
}) {
  const hasInput = search.input.trim().length > 0;

  if (!hasInput) {
    return (
      <>
        <RecentSearches
          menuId={menuId}
          recentSearches={recentSearches}
          onPick={onPick}
          onSelect={onSelect}
        />
        <SearchGuide onExampleSelect={onExampleSelect} />
      </>
    );
  }

  if (!search.currentQuery) {
    const emptyState = getIncompleteSearchState(
      search.input,
      search.submittedInvalid,
    );

    return (
      <SearchMessage
        title={emptyState.title}
        description={emptyState.description}
      />
    );
  }

  if (search.isSearching) return <SearchMessage title="Searching Shinzohub…" />;

  if (search.error) {
    return <SearchError error={search.error} onRetry={onRetry} />;
  }

  if (search.results.length === 0) {
    const emptyState = getNoResultsSearchState(
      search.query ?? search.currentQuery,
    );

    return (
      <SearchMessage
        title={emptyState.title}
        description={emptyState.description}
      />
    );
  }

  return (
    <>
      <DropdownMenuLabel>Results</DropdownMenuLabel>
      {search.results.map((result, index) => (
        <SearchResultItem
          key={getExplorerSearchResultKey(result)}
          id={`${menuId}-${getExplorerSearchResultKey(result)}`}
          result={result}
          active={index === activeIndex}
          onHighlight={() => onHighlight(index)}
          onPick={onPick}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}
