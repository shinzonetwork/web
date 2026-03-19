import { IndexerEntry, IndexerWithHealth } from "@/lib/shared/types";
import { Pagination } from "@/lib/widget";
import { Table } from "@/lib/widget/table/ui/table";
import { LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

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

    const tick = () => {
      const current = entriesRef.current;
      const pageEntries = current;

      const keySet = new Set(
        pageEntries.map((e) => `${e.walletAddress}-${e.ip}`),
      );

      // Mark visible peers as "Checking..." immediately, then update each row
      // as requests finish.
      setEntries((prev) =>
        prev.map((e) =>
          keySet.has(`${e.walletAddress}-${e.ip}`)
            ? { ...e, health: "unknown" }
            : e,
        ),
      );

      pageEntries.forEach((entry) => {
        fetch(`/api/health?ip=${encodeURIComponent(entry.ip)}`)
          .then((res) => res.json())
          .then((data: { healthy: boolean }) => {
            if (!alive) return;
            const health: IndexerWithHealth["health"] = data.healthy
              ? "healthy"
              : "unhealthy";
            setEntries((prev) =>
              prev.map((e) =>
                e.walletAddress === entry.walletAddress && e.ip === entry.ip
                  ? { ...e, health }
                  : e,
              ),
            );
          })
          .catch(() => {
            if (!alive) return;
            setEntries((prev) =>
              prev.map((e) =>
                e.walletAddress === entry.walletAddress && e.ip === entry.ip
                  ? { ...e, health: "unhealthy" as const }
                  : e,
              ),
            );
          });
      });
    };

    tick();
    const intervalId = setInterval(tick, 60_000); // 1 minute

    return () => {
      alive = false;
      clearInterval(intervalId);
    };
  }, [entries.length, page]);

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
