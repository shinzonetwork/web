"use client";

import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TableLayout, TableNullableCell } from "@shinzo/ui/table";
import {
  getServerPage,
  Pagination,
  DEFAULT_LIMIT,
  type PageParams,
} from "@shinzo/ui/pagination";
import { useRegisteredIndexers } from "../hooks/use-registered-indexers";

const INDEXERS_PAGE_PARAM = "indexersPage";

const tableHeadings = ["Address", "DID", "Chain", "Connection String"];

function IndexersHomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { page, offset, limit }: PageParams = useMemo(
    () =>
      getServerPage({
        page: searchParams.get(INDEXERS_PAGE_PARAM) ?? "1",
        limit: String(DEFAULT_LIMIT),
      }),
    [searchParams]
  );

  const queryParams = useMemo(
    () => ({
      offset,
      limit,
      count_total: true,
    }),
    [offset, limit]
  );
  const { data: registeredIndexers, isPending } =
    useRegisteredIndexers(queryParams);
  const indexers = registeredIndexers?.indexers ?? [];
  const total = Number(registeredIndexers?.pagination?.total ?? 0);

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
          loadingRowCount={DEFAULT_LIMIT}
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
        {total > DEFAULT_LIMIT && (
          <div className="pr-6">
            <Pagination
              page={page}
              totalItems={total}
              itemsPerPage={DEFAULT_LIMIT}
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
