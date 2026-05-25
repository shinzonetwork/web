"use client";

import { Suspense, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { TableLayout, TableNullableCell } from "@shinzo/ui/table";
import { Pagination } from "@shinzo/ui/pagination";
import { useRegisteredIndexers } from "../hooks/use-registered-indexers";
import { useCursorPagePagination } from "../hooks/use-cursor-page-pagination";

const INDEXERS_PAGE_PARAM = "indexersPage";
const INDEXERS_CURSOR_KEY = "registered-indexers-cursor-key";
const PAGE_SIZE = 5;

const tableHeadings = ["Address", "DID", "Chain", "Connection String"];

function IndexersHomeContent() {
  const router = useRouter();
  const { page, queryParams, applyPaginationData, totalItems } =
    useCursorPagePagination({
      pageParam: INDEXERS_PAGE_PARAM,
      storageKey: INDEXERS_CURSOR_KEY,
      limit: PAGE_SIZE,
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

  const showPagination = useMemo(() => totalItems > PAGE_SIZE, [totalItems]);

  const handleRegisterAsIndexer = () => {
    router.push("/indexer-registration");
  };

  return (
    <section className="w-full min-w-0 max-w-full">
      <div className="mb-8 flex min-w-0 p-8 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h2 className="font-h2 text-h2 text-foreground slash-separator uppercase wrap-break-word">
            Registered Indexers
          </h2>
          <p className="font-mono text-muted-foreground mt-2 wrap-break-word">
            NETWORK LAYER / INDEXING SERVICES
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 self-start bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground rounded-none transition-opacity hover:opacity-90 active:opacity-80 sm:self-auto sm:px-8"
          onClick={handleRegisterAsIndexer}
        >
          REGISTER AS INDEXER
        </button>
      </div>
      <div className="w-full min-w-0 max-w-full overflow-hidden gap-4 flex flex-col items-end">
        <TableLayout
          isLoading={isPending}
          loadingRowCount={PAGE_SIZE}
          notFound="No Indexers are registered yet."
          headings={indexers.length > 0 ? tableHeadings : [""]}
          gridClass="grid-cols[repeat(4,1fr)]"
          iterable={indexers ?? []}
          rowRenderer={(indexer) => (
            <>
              <TableNullableCell value={indexer?.address}>
                {(value) => (
                  <span className="text-sm text-foreground">{value}</span>
                )}
              </TableNullableCell>

              <TableNullableCell value={indexer?.did}>
                {(value) => (
                  <span className="text-sm text-foreground">{value}</span>
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
                  <span className="text-sm text-foreground wrap-break-word break-all">
                    {value}
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
              itemsPerPage={PAGE_SIZE}
              pageParam={INDEXERS_PAGE_PARAM}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export function IndexersHome() {
  return (
    <Suspense fallback={null}>
      <IndexersHomeContent />
    </Suspense>
  );
}
