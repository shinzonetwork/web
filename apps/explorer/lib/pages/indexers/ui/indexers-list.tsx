"use client";

import { Suspense, useEffect, useMemo } from "react";
import { TableLayout, TableNullableCell } from "@shinzo/ui/table";
import { DEFAULT_LIMIT, Pagination } from "@shinzo/ui/pagination";
import { useRegisteredIndexers } from "../hook/use-registered-indexers";
import { useCursorPagePagination } from "../../../shared/cursor-pagination/hook/use-cursor-page-pagination";
import { CopyButton } from "@/shared/ui/button";

const INDEXERS_PAGE_PARAM = "indexersPage";
const INDEXERS_CURSOR_KEY = "registered-indexers-cursor-key";

const tableHeadings = ["Address", "DID", "Chain", "Connection String"];

function IndexersListContent() {
  const { page, queryParams, applyPaginationData, totalItems } =
    useCursorPagePagination({,
      pageParam: INDEXERS_PAGE_PARAM,
      storageKey: INDEXERS_CURSOR_KEY,
      limit: DEFAULT_LIMIT,
    });

  const { data: registeredIndexers, isPending } =
    useRegisteredIndexers(queryParams);
  const indexers = registeredIndexers?.indexers ?? [];
  const pageTotal = Number(registeredIndexers?.pagination?.total ?? 0);
  const nextKey = registeredIndexers?.pagination?.next_key;

  useEffect(() => {
    if (registeredIndexers) {
      applyPaginationData(nextKey, pageTotal);
    }
  }, [registeredIndexers, nextKey, pageTotal, applyPaginationData]);

  const showPagination = useMemo(() => totalItems > DEFAULT_LIMIT, [totalItems]);

  return (
    <section className="w-full min-w-0 max-w-full">
      <div className="w-full min-w-0 max-w-full overflow-hidden gap-4 flex flex-col items-end">
        <TableLayout
          isLoading={isPending}
          loadingRowCount={DEFAULT_LIMIT}
          notFound="No Indexers are registered yet."
          headings={indexers.length > 0 ? tableHeadings : [""]}
          gridClass="grid-cols[repeat(4,1fr)]"
          iterable={indexers ?? []}
          rowRenderer={(indexer) => (
            <>
              <TableNullableCell value={indexer?.address}>
                {(value) => (
              <span className="text-sm text-foreground flex items-center gap-1">
                {value}
              </span>
            )}
              </TableNullableCell>

              <TableNullableCell value={indexer?.did}>
                {(value) => (
                  <span className="text-sm text-foreground wrap-break-word break-all">
                    {value}
                  </span>
                )}
              </TableNullableCell>

              <TableNullableCell value={indexer?.source_chain}>
                {(value) => (
                  <span className="text-sm text-foreground">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </span>
                )}
              </TableNullableCell>

              <TableNullableCell
                value={indexer?.connection_string}
                className="min-w-0 whitespace-normal"
              >
                {(value) => (
                  <span className="text-sm text-foreground wrap-break-word break-all flex">
                    {value}
                    <CopyButton text={value} />
                  </span>
                )}
              </TableNullableCell>
            </>
          )}
        />
        {showPagination && (
          <div className="pr-6">
            <Pagination
              page={page}
              totalItems={totalItems}
              itemsPerPage={DEFAULT_LIMIT}
              pageParam={INDEXERS_PAGE_PARAM}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export const IndexersList = () => {
  return (
    <Suspense fallback={null}>
      <IndexersListContent />
    </Suspense>
  );
}
