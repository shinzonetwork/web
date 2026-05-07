"use client";

import { useRegisteredIndexers } from "../hooks/use-registered-indexers";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export function IndexersHome() {
  const PAGE_SIZE = 5;
  const [offset, setOffset] = useState(0);
  const queryParams = useMemo(
    () => ({ offset, limit: PAGE_SIZE, count_total: true }),
    [offset]
  );
  const { data: registeredIndexers, isFetching } =
    useRegisteredIndexers(queryParams);
  const indexers = registeredIndexers?.indexers || [];
  const total = Number(registeredIndexers?.pagination?.total ?? 0);
  const nextKey = registeredIndexers?.pagination?.next_key;
  const hasNextPage = Boolean(nextKey) || offset + indexers.length < total;
  const hasPrevPage = offset > 0;
  const router = useRouter();
  const handleRegisterAsIndexer = () => {
    router.push("/indexer-registration");
  };
  const currentPage = Math.floor(offset / PAGE_SIZE) + 1;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <section className="w-full min-w-0 max-w-full px-4 py-8 sm:p-12">
      <div className="mb-8 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
      <div className="w-full min-w-0 max-w-full overflow-hidden border border-border">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="w-[18%] border-r border-border p-3 font-mono-label text-xs text-muted-foreground sm:p-4 sm:text-sm">
                ADDRESS
              </th>
              <th className="w-[22%] border-r border-border p-3 font-mono-label text-xs text-muted-foreground sm:p-4 sm:text-sm">
                DID
              </th>
              <th className="w-[28%] border-r border-border p-3 font-mono-label text-xs text-muted-foreground sm:p-4 sm:text-sm">
                CONNECTION STRING
              </th>
              <th className="w-[22%] border-r border-border p-3 font-mono-label text-xs text-muted-foreground sm:p-4 sm:text-sm">
                SOURCE CHAIN
              </th>
              <th className="p-3 font-mono-label text-xs text-muted-foreground sm:p-4 sm:text-sm">
                CHAIN ID
              </th>
            </tr>
          </thead>
          <tbody className="font-table-data text-table-data">
            {indexers.map((indexer) => (
              <tr
                key={indexer.address}
                className="border-b border-border bg-white transition-colors hover:bg-zinc-50"
              >
                <td className="wrap-break-word border-r border-border p-3 align-top font-mono text-xs sm:p-4 sm:text-sm">
                  {indexer.address}
                </td>
                <td className="wrap-break-word border-r border-border p-3 align-top font-mono text-xs sm:p-4 sm:text-sm">
                  {indexer.did}
                </td>
                <td className="break-all border-r border-border p-3 align-top font-mono text-xs text-accent sm:p-4 sm:text-sm">
                  {indexer.connection_string}
                </td>
                <td className="wrap-break-word border-r border-border p-3 align-top text-xs sm:p-4 sm:text-sm">
                  {indexer.source_chain}
                </td>
                <td className="p-3 align-top font-mono text-xs sm:p-4 sm:text-sm">
                  {indexer.source_chain_id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted-foreground">
          {total > 0
            ? `Showing ${offset + 1}-${offset + indexers.length} of ${total}`
            : "No indexers found"}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-none border border-border px-3 py-2 font-mono text-xs uppercase disabled:opacity-50"
            disabled={!hasPrevPage || isFetching}
            onClick={() => setOffset((prev) => Math.max(0, prev - PAGE_SIZE))}
          >
            Prev
          </button>
          <span className="font-mono text-xs text-muted-foreground">
            Page {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            className="rounded-none border border-border px-3 py-2 font-mono text-xs uppercase disabled:opacity-50"
            disabled={!hasNextPage || isFetching}
            onClick={() => setOffset((prev) => prev + PAGE_SIZE)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
