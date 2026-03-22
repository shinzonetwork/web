import { IndexerEntry, IndexerWithHealth } from "@/lib/shared/types";
import { Pagination } from "@/lib/widget";
import { Table } from "@/lib/widget/table/ui/table";
import { LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const entryKey = (entry: { validatorAddress: string; ip: string }) =>
  `${entry.validatorAddress}-${entry.ip}`;

export function IndexerList() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [entries, setEntries] = useState<IndexerWithHealth[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const entriesRef = useRef(entries);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/indexers?page=${page}&pageSize=${pageSize}`,
        );
        if (!res.ok) {
          throw new Error(`Failed to load entries: ${res.statusText}`);
        }

        const data = (await res.json()) as {
          entries: IndexerEntry[];
          total: number;
          totalPages: number;
          page: number;
          pageSize: number;
        };

        setTotalEntries(data.total);
        const withHealth: IndexerWithHealth[] = data.entries.map((e) => ({
          ...e,
          health: "unknown",
        }));
        setEntries(withHealth);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [page]);

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
        try {
          const res = await fetch(
            `/api/health?ip=${encodeURIComponent(entry.ip)}`,
          );
          const data = (await res.json()) as { healthy?: string };
          return {
            key: entryKey(entry),
            health: data.healthy as IndexerWithHealth["health"],
          };
        } catch {
          return { key: entryKey(entry), health: "unhealthy" as const };
        }
      });

      const results = await Promise.allSettled(checks);
      if (!alive) return;

      const healthByKey = new Map<string, IndexerWithHealth["health"]>();
      for (const result of results) {
        if (result.status === "fulfilled") {
          healthByKey.set(result.value.key, result.value.health);
        }
      }

      setEntries((prev) =>
        prev.map((entry) => {
          const nextHealth = healthByKey.get(entryKey(entry));
          return nextHealth ? { ...entry, health: nextHealth } : entry;
        }),
      );
    };

    void tick();
    const intervalId = setInterval(() => {
      void tick();
    }, 60_000); // 1 minute

    return () => {
      alive = false;
      clearInterval(intervalId);
    };
  }, [entries, page]);

  const totalPages = useMemo(() => {
    if (totalEntries === 0) return 1;
    return Math.max(1, Math.ceil(totalEntries / pageSize));
  }, [totalEntries]);

  return (
    <>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <section className="bg-background rounded-lg border border-border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold mb-4">Peers</h2>
          <span className="text-sm text-muted-foreground">
            Showing {page} of {totalPages}
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
                (e) => e.health === "healthy",
              );
              const offlineEntries = entries.filter(
                (e) => e.health !== "healthy",
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
