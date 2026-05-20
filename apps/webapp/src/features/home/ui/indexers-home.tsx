"use client";

import { useRegisteredIndexers } from "../hooks/use-registered-indexers";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { TableLayout, TableNullableCell } from "@shinzo/ui/table";
import { Pagination } from "@shinzo/ui/pagination";

export function IndexersHome() {
  const DEFAULT_LIMIT = 5;
  const [offset, setOffset] = useState(0);
  const queryParams = useMemo(
    () => ({ offset, limit: DEFAULT_LIMIT, count_total: true }),
    [offset]
  );
  const { data: registeredIndexers, isFetching } =
    useRegisteredIndexers(queryParams);
  const indexers = registeredIndexers?.indexers || [];
  const total = Number(registeredIndexers?.pagination?.total ?? 0);
  // const nextKey = registeredIndexers?.pagination?.next_key;
  // const hasNextPage = Boolean(nextKey) || offset + indexers.length < total;
  // const hasPrevPage = offset > 0;
  const router = useRouter();
  const handleRegisterAsIndexer = () => {
    router.push("/indexer-registration");
  };
  const currentPage = Math.floor(offset / DEFAULT_LIMIT) + 1;
  // const totalPages = Math.max(1, Math.ceil(total / DEFAULT_LIMIT));

  const tableHeadings = ["Address", "DID", "Chain", "Connection String"];
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
          isLoading={isFetching}
          loadingRowCount={DEFAULT_LIMIT}
          notFound="No Indexers are registered yet."
          headings={indexers.length > 0 ? tableHeadings : [""]}
          gridClass={
            indexers.length > 0 ? "grid-cols[repeat(4,1fr)]" : "grid-cols-1"
          }
          iterable={indexers ?? []}
          rowRenderer={(indexer) => (
            <>
              <TableNullableCell value={indexer?.address}>
                {(value) => (
                  <span className="text-sm text-foreground">{value}</span>
                )}
              </TableNullableCell>

              <TableNullableCell value={indexer?.did} nowrap>
                {(value) => (
                  <span className="text-sm text-foreground">{value}</span>
                )}
              </TableNullableCell>

              <TableNullableCell value={indexer?.source_chain} nowrap>
                {(value) => (
                  <span className="text-sm text-foreground">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </span>
                )}
              </TableNullableCell>

              <TableNullableCell value={indexer?.connection_string}>
                {(value) => (
                  <span className="text-sm text-foreground wrap-break-word break-all">
                    {value}
                  </span>
                )}
              </TableNullableCell>
            </>
          )}
        />
        <div className="pr-6">
          <Pagination
            page={currentPage}
            totalItems={total}
            itemsPerPage={DEFAULT_LIMIT}
          />
        </div>
      </div>
    </section>
  );
}
