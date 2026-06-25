"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@shinzo/ui/dropdown-menu";
import {
  focusAdjacentDropdownElement,
  focusDropdownBoundary,
  focusNextPageElementAfter,
  isFirstDropdownElementFocused,
  isLastDropdownElementFocused,
} from "./search-focus";
import type { ExplorerSearchResult } from "../model/search-query";
import { useRecentSearches } from "../model/use-recent-searches";
import { useExplorerSearch } from "../model/use-explorer-search";
import { SearchDropdownBody } from "./search-dropdown-body";
import { SearchDropdownContent } from "./search-dropdown-content";
import { SearchInputHint } from "./search-input-hint";
import {
  getExplorerSearchResultKey,
  getInternalResultHref,
} from "./search-result-item";

export function ExplorerSearch({ className = "" }: { className?: string }) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const search = useExplorerSearch();
  const { recentSearches, rememberSearchResult } = useRecentSearches();
  const activeResult = search.results[activeIndex] ?? search.results[0];
  const activeResultId = activeResult
    ? `${menuId}-${getExplorerSearchResultKey(activeResult)}`
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

  const focusInput = () => {
    window.queueMicrotask(() => inputRef.current?.focus());
  };

  const closeMenu = () => setOpen(false);

  const focusDropdownItem = (boundary: "first" | "last") => {
    return focusDropdownBoundary(contentRef.current, boundary);
  };

  const pickResult = (result: ExplorerSearchResult) => {
    rememberSearchResult(result);
    closeMenu();
  };

  const selectResult = (result: ExplorerSearchResult) => {
    rememberSearchResult(result);

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

  const selectExample = (query: string) => {
    search.updateInput(query);
    setOpen(true);
    focusInput();
  };

  const clearSearch = () => {
    search.updateInput("");
    setOpen(true);
    focusInput();
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
    if (event.key === "ArrowDown" && focusDropdownItem("first")) {
      event.preventDefault();
      return;
    }

    if (event.key === "ArrowUp" && focusDropdownItem("last")) {
      event.preventDefault();
      return;
    }

    if (
      event.key === "Tab" &&
      !event.shiftKey &&
      focusDropdownItem("first")
    ) {
      event.preventDefault();
      return;
    }

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
    }
  };

  const handleDropdownKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      focusInput();
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      focusAdjacentDropdownElement({
        container: contentRef.current,
        direction: event.key === "ArrowDown" ? 1 : -1,
        wrap: true,
      });
      return;
    }

    if (event.key !== "Tab") return;

    const isMovingBackward = event.shiftKey;
    const isAtStart = isFirstDropdownElementFocused(contentRef.current);
    const isAtEnd = isLastDropdownElementFocused(contentRef.current);

    if (isMovingBackward && isAtStart) {
      event.preventDefault();
      inputRef.current?.focus();
      return;
    }

    if (!isMovingBackward && isAtEnd) {
      event.preventDefault();
      closeMenu();
      if (!focusNextPageElementAfter(rootRef.current, contentRef.current)) {
        inputRef.current?.blur();
      }
      return;
    }

    event.preventDefault();
    focusAdjacentDropdownElement({
      container: contentRef.current,
      direction: isMovingBackward ? -1 : 1,
      wrap: false,
    });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setOpen(true);
      focusInput();
      return;
    }

    window.requestAnimationFrame(() => {
      const activeElement = document.activeElement;
      const isFocusInsideInput = activeElement === inputRef.current ||
        rootRef.current?.contains(activeElement) === true;
      const isFocusInsideDropdown = contentRef.current?.contains(
        activeElement,
      ) === true;

      if (!isFocusInsideInput && !isFocusInsideDropdown) closeMenu();
    });
  };

  return (
    <div ref={rootRef} className={`relative z-20 w-full ${className}`}>
      <DropdownMenu
        modal={false}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <form
          role="search"
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
                type="text"
                role="searchbox"
                value={search.input}
                onChange={(event) => search.updateInput(event.target.value)}
                onFocus={() => setOpen(true)}
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
            <SearchInputHint
              hasInput={search.input.length > 0}
              isSearching={search.isSearching}
              onClear={clearSearch}
            />
          </div>
        </form>

        <SearchDropdownContent
          id={menuId}
          contentRef={contentRef}
          onKeyDown={handleDropdownKeyDown}
        >
          <SearchDropdownBody
            activeIndex={activeIndex}
            menuId={menuId}
            recentSearches={recentSearches}
            search={search}
            onExampleSelect={selectExample}
            onHighlight={setActiveIndex}
            onPick={pickResult}
            onRetry={() => void search.retry()}
            onSelect={selectResult}
          />
        </SearchDropdownContent>
      </DropdownMenu>
    </div>
  );
}
