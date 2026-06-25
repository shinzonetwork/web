"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import {
  Blocks,
  Database,
  ExternalLink,
  HardDrive,
  LoaderCircle,
  ReceiptText,
  Search,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@shinzo/ui/dropdown-menu";
import { formatHash } from "@/shared/utils/format-hash";
import { getPageLink } from "@/shared/utils/links";
import { ExplorerSearchApiError } from "../api/search";
import type { ExplorerSearchResult } from "../model/search-query";
import { useExplorerSearch } from "../model/use-explorer-search";

type InternalSearchResult = Exclude<ExplorerSearchResult, { kind: "view" }>;

interface ResultPresentation {
  description: string;
  Icon: LucideIcon;
  title: string;
}

interface SearchResultItemProps {
  active: boolean;
  id: string;
  onHighlight: () => void;
  onSelect: (result: ExplorerSearchResult) => void;
  result: ExplorerSearchResult;
}

type ExplorerSearchState = ReturnType<typeof useExplorerSearch>;

function getResultKey(result: ExplorerSearchResult): string {
  switch (result.kind) {
    case "address":
      return `address-${result.hexAddress}`;
    case "view":
      return `view-${result.address}`;
    case "host":
      return `host-${result.address}`;
    case "indexer":
      return `indexer-${result.address}`;
    case "transaction":
      return `transaction-${result.cosmosHash}`;
    case "block":
      return `block-${result.height}`;
  }
}

function getResultPresentation(
  result: ExplorerSearchResult,
): ResultPresentation {
  switch (result.kind) {
    case "address":
      return {
        Icon: WalletCards,
        title: "Address",
        description: result.shinzoAddress,
      };
    case "view":
      return {
        Icon: Database,
        title: `View · ${result.name}`,
        description: result.address,
      };
    case "host":
      return {
        Icon: HardDrive,
        title: "Host",
        description: `${result.address} · ${formatHash(result.did, 14, 6)}`,
      };
    case "indexer":
      return {
        Icon: Database,
        title: "Indexer",
        description: `${result.address} · ${result.sourceChain || "Unknown chain"}`,
      };
    case "transaction": {
      const hash = result.evmHash ?? result.cosmosHash;
      const network = result.transactionKind === "evm" ? "EVM" : "Cosmos";

      return {
        Icon: ReceiptText,
        title: `${network} transaction`,
        description: `${formatHash(hash, 16, 10)} · Block ${result.height}`,
      };
    }
    case "block":
      return {
        Icon: Blocks,
        title: `Block ${result.height}`,
        description: formatHash(result.hash, 16, 10),
      };
  }
}

function getInternalResultHref(result: InternalSearchResult): string {
  const chain = "shinzohub";

  switch (result.kind) {
    case "host":
      return getPageLink("host", { address: result.address, chain });
    case "indexer":
      return getPageLink("indexer", { address: result.address, chain });
    case "transaction":
      return getPageLink("tx", { param: result.cosmosHash, chain });
    case "block":
      return getPageLink("block", { param: result.height, chain });
    case "address":
      return getPageLink("address", {
        param: result.shinzoAddress,
        chain,
      });
  }
}

function SearchResultContent({ result }: { result: ExplorerSearchResult }) {
  const { description, Icon, title } = getResultPresentation(result);

  return (
    <>
      <Icon aria-hidden className="size-4" />
      <span className="min-w-0 flex-1">
        <strong className="block truncate font-medium">{title}</strong>
        <span className="block truncate text-xs text-ui-text-muted">
          {description}
        </span>
      </span>
      {result.kind === "view" && (
        <ExternalLink aria-hidden className="size-3.5" />
      )}
    </>
  );
}

function SearchResultItem({
  active,
  id,
  onHighlight,
  onSelect,
  result,
}: SearchResultItemProps) {
  const commonProps = {
    "data-active": active,
    id,
    onFocus: onHighlight,
    onPointerMove: onHighlight,
  };

  if (result.kind === "view") {
    return (
      <DropdownMenuItem asChild {...commonProps}>
        <a
          href={result.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SearchResultContent result={result} />
        </a>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem
      {...commonProps}
      onSelect={() => onSelect(result)}
    >
      <SearchResultContent result={result} />
    </DropdownMenuItem>
  );
}

function SearchMessage({
  description,
  title,
}: {
  description?: string;
  title: string;
}) {
  return (
    <div
      className="flex min-h-20 flex-col justify-center px-3 py-4 font-mono"
      role="status"
    >
      <p className="text-sm font-medium text-ui-text">{title}</p>
      {description && (
        <p className="mt-1 text-xs leading-5 text-ui-text-muted">
          {description}
        </p>
      )}
    </div>
  );
}

function SearchInputHint({ isSearching }: { isSearching: boolean }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute right-4 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded border border-ui-accent bg-ui-bg-accent-hover font-mono text-xs font-semibold text-ui-accent"
    >
      {isSearching ? (
        <LoaderCircle className="size-3.5 animate-spin" />
      ) : (
        "/"
      )}
    </span>
  );
}

function SearchError({
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

function SearchDropdownBody({
  activeIndex,
  menuId,
  onHighlight,
  onRetry,
  onSelect,
  search,
}: {
  activeIndex: number;
  menuId: string;
  onHighlight: (index: number) => void;
  onRetry: () => void;
  onSelect: (result: ExplorerSearchResult) => void;
  search: ExplorerSearchState;
}) {
  if (search.isSearching) {
    return <SearchMessage title="Searching Shinzohub…" />;
  }

  if (search.submittedInvalid) {
    return (
      <SearchMessage
        title="That search is incomplete"
        description="Enter a Shinzo address, transaction hash, positive block height, or consensus block hash."
      />
    );
  }

  if (search.error) {
    return <SearchError error={search.error} onRetry={onRetry} />;
  }

  if (search.results.length === 0) {
    return (
      <SearchMessage
        title="No results found"
        description="The query is valid, but it did not match a confirmed transaction or block."
      />
    );
  }

  return (
    <>
      <DropdownMenuLabel>Results</DropdownMenuLabel>
      {search.results.map((result, index) => (
        <SearchResultItem
          key={getResultKey(result)}
          id={`${menuId}-${getResultKey(result)}`}
          result={result}
          active={index === activeIndex}
          onHighlight={() => onHighlight(index)}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}

export function ExplorerSearch({ className = "" }: { className?: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const menuId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const search = useExplorerSearch();
  const hasPanel = search.currentQuery !== null || search.submittedInvalid;
  const open = focused && hasPanel;
  const activeResult = search.results[activeIndex] ?? search.results[0];
  const activeResultId = activeResult
    ? `${menuId}-${getResultKey(activeResult)}`
    : undefined;

  useEffect(() => {
    setActiveIndex(0);
  }, [search.query?.cacheKey, search.results.length]);

  useEffect(() => {
    const focusSearch = (event: globalThis.KeyboardEvent) => {
      if (
        event.key !== "/" ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      const isEditing = target instanceof HTMLElement && (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      );
      if (isEditing) return;

      event.preventDefault();
      inputRef.current?.focus();
    };

    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const closeMenu = () => setFocused(false);

  const selectResult = (result: ExplorerSearchResult) => {
    if (result.kind === "view") {
      const viewWindow = window.open(
        result.externalUrl,
        "_blank",
        "noopener,noreferrer",
      );
      if (viewWindow) viewWindow.opener = null;
    } else {
      router.push(getInternalResultHref(result));
    }

    closeMenu();
  };

  const submitSearch = () => {
    if (search.error && search.currentQuery) {
      void search.retry();
      return;
    }

    if (search.submit() && activeResult) {
      selectResult(activeResult);
    }
  };

  const handleInputKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitSearch();
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key === " ") {
      event.preventDefault();
      return;
    }

    if (search.results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % search.results.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (
        index - 1 + search.results.length
      ) % search.results.length);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setFocused(true);
      window.queueMicrotask(() => inputRef.current?.focus());
      return;
    }

    window.requestAnimationFrame(() => {
      if (document.activeElement !== inputRef.current) closeMenu();
    });
  };

  return (
    <div className={`relative z-20 w-full ${className}`}>
      <DropdownMenu
        modal={false}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submitSearch();
          }}
        >
          <div className="relative w-full">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 z-10 size-4 -translate-y-1/2 text-ui-text"
            />
            <DropdownMenuTrigger asChild>
              <input
                ref={inputRef}
                type="search"
                value={search.input}
                onChange={(event) => search.updateInput(event.target.value)}
                onFocus={() => setFocused(true)}
                onKeyDown={handleInputKeyDown}
                aria-label="Search Shinzohub"
                aria-controls={open ? menuId : undefined}
                aria-activedescendant={open ? activeResultId : undefined}
                placeholder="Search by Address / Txn Hash / Block"
                autoComplete="off"
                spellCheck={false}
                className="relative h-14 w-full min-w-0 rounded-xl border-2 border-ui-accent bg-white px-10 py-4 pr-14 font-mono text-base outline-none transition-[color,box-shadow] placeholder:text-ui-text-muted selection:bg-ui-accent selection:text-ui-bg focus-visible:border-ui-accent focus-visible:ring-3 focus-visible:ring-ui-accent/50"
              />
            </DropdownMenuTrigger>
            <SearchInputHint isSearching={search.isSearching} />
          </div>
        </form>

        <DropdownMenuContent
          id={menuId}
          align="start"
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
          className="min-h-26 w-[var(--radix-dropdown-menu-trigger-width)]"
        >
          <SearchDropdownBody
            activeIndex={activeIndex}
            menuId={menuId}
            search={search}
            onHighlight={setActiveIndex}
            onRetry={() => void search.retry()}
            onSelect={selectResult}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
