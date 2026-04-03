"use client";

import { LiveData, LiveDataWithKey } from "@/shared/types";
import { Pagination, Table } from "@/widget";
import { LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useHealthCheck } from "../hook/use-health-check";
import { useLoadIndexers } from "../hook/use-load-indexers";

export function IndexerList() {
  const [page, setPage] = useState(1);
  const {
    entries,
    totalEntries,
    defaultPageSize,
    loading,
    listRevision,
    loadIndexers,
    updateEntriesWithLiveData,
  } = useLoadIndexers();
  const { fetchHealth } = useHealthCheck();
  const entriesRef = useRef(entries);

  useEffect(() => {
    void loadIndexers(page);
  }, [page, loadIndexers]);

  // Keep a ref in sync so the polling tick always uses the latest entries,
  // without re-creating the interval on every health update.
  useEffect(() => {
    entriesRef.current = entries;
  }, [entries]);

  useEffect(() => {
    if (entries.length === 0) return;

    let alive = true;

    const tick = async () => {
      const current = entriesRef.current;
      const pageEntries = current;

      const checks = pageEntries.map(async (entry) => {
        return await fetchHealth(entry);
      });

      const results = await Promise.allSettled<LiveDataWithKey>(checks);
      if (!alive) return;

      const liveDataByKey = new Map<string, LiveData>();
      for (const result of results) {
        if (result.status === "fulfilled") {
          liveDataByKey.set(result.value.key, result.value.data);
        }
      }

      updateEntriesWithLiveData(liveDataByKey);
    };

    void tick();
    const intervalId = setInterval(() => {
      void tick();
    }, 60_000); // 1 minute

    return () => {
      alive = false;
      clearInterval(intervalId);
    };
  }, [
    listRevision,
    entries.length,
    page,
    fetchHealth,
    updateEntriesWithLiveData,
  ]);

  const totalPages = useMemo(() => {
    if (totalEntries === 0) return 1;
    return Math.max(1, Math.ceil(totalEntries / defaultPageSize));
  }, [totalEntries, defaultPageSize]);

  return (
    <>
      <section className="bg-background rounded-lg border border-border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold mb-4">Devnet Indexers</h2>
          <span className="text-sm text-muted-foreground">
            Showing {page} of {totalPages} pages
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <LoaderCircle className="w-4 h-4 animate-spin text-muted-foreground" />
          </div>
        ) : entries.length === 0 ? (
          <p className="text-muted-foreground">No peers yet.</p>
        ) : (
          <>
            {(() => {
              const onlineEntries = entries.filter(
                (e) => e.health === "healthy"
              );
              const offlineEntries = entries.filter(
                (e) => e.health !== "healthy"
              );

              return (
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-sm font-bold mb-2">Online</h3>
                    <div className="overflow-x-auto">
                      <Table entries={onlineEntries} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold mb-2">Offline</h3>
                    <div className="overflow-x-auto">
                      <Table entries={offlineEntries} />
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="flex justify-between items-center mt-4 gap-2">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPrevious={() => setPage((p) => Math.max(1, p - 1))}
                onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
}
