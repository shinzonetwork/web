"use client";

import { UI_HOME_HEADER_CONTENT } from "@/shared/lib";
import { useRegisteredHosts } from "../hooks/use-registered-hosts";
import { useRegisteredIndexers } from "../hooks/use-registered-indexers";

export function StatsHome() {
  const { data: registeredIndexers, isPending: indexersPending } =
    useRegisteredIndexers({
      limit: 1,
      count_total: true,
    });
  const { data: registeredHosts, isPending: hostsPending } = useRegisteredHosts(
    {
      limit: 1,
      count_total: true,
    }
  );

  const totalIndexers = indexersPending
    ? null
    : Number(registeredIndexers?.pagination?.total ?? 0);
  const totalHosts = hostsPending
    ? null
    : Number(registeredHosts?.pagination?.total ?? 0);

  return (
    <section className="grid w-full min-w-0 max-w-full grid-cols-1 border-b bg-background-accent-light border-border md:grid-cols-2 md:divide-x md:divide-border">
      <div className="py-6 px-8">
        <div className="font-mono text-secondary mb-1">
          {UI_HOME_HEADER_CONTENT.registered_indexers}
        </div>
        <div className="font-h2 text-h2 text-black min-h-10.5 tabular-nums">
          {totalIndexers ?? "—"}
        </div>
      </div>
      <div className="p-6">
        <div className="font-mono text-secondary mb-1">
          {UI_HOME_HEADER_CONTENT.registered_hosts}
        </div>
        <div className="font-h2 text-h2 text-black min-h-10.5 tabular-nums">
          {totalHosts ?? "—"}
        </div>
      </div>
    </section>
  );
}
