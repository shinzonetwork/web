import { DropdownMenuItem } from "@shinzo/ui/dropdown-menu";
import { ExplorerSearchApiError } from "../api/search";
import { SearchMessage } from "./search-message";

export function SearchError({
  error,
  onRetry,
}: {
  error: unknown;
  onRetry: () => void;
}) {
  const description = error instanceof ExplorerSearchApiError
    ? error.detail
    : "The Explorer could not reach its search service. Check your connection and try again.";
  const title = error instanceof ExplorerSearchApiError && error.status === 502
    ? "Shinzohub RPCs are unavailable"
    : "Unable to search Shinzohub";

  return (
    <div role="alert">
      <SearchMessage
        title={title}
        description={description}
      />
      <DropdownMenuItem
        data-search-focusable
        className="justify-center text-ui-text-accent"
        onSelect={(event) => {
          event.preventDefault();
          onRetry();
        }}
      >
        Try again
      </DropdownMenuItem>
    </div>
  );
}
