"use client";

import { UI_HOME_HEADER_CONTENT } from "@/shared/lib";
import { useRegisteredHosts } from "../hooks/use-registered-hosts";
import { useRegisteredIndexers } from "../hooks/use-registered-indexers";

export function StatsHome() {
  const { data: registeredIndexers } = useRegisteredIndexers({
    limit: 1,
    count_total: true,
  });
  const { data: registeredHosts } = useRegisteredHosts({
    limit: 1,
    count_total: true,
  });

  const totalIndexers = Number(registeredIndexers?.pagination?.total ?? 0);
  const totalHosts = Number(registeredHosts?.pagination?.total ?? 0);

  return (
    <section className="grid w-full min-w-0 max-w-full grid-cols-1 border-b border-border md:grid-cols-2 md:divide-x md:divide-border">
      <div className="p-6">
        <div className="font-mono text-secondary mb-1">
          {UI_HOME_HEADER_CONTENT.registered_indexers}
        </div>
        <div className="font-h2 text-h2 text-black">{totalIndexers}</div>
      </div>
      <div className="p-6">
        <div className="font-mono text-secondary mb-1">
          {UI_HOME_HEADER_CONTENT.registered_hosts}
        </div>
        <div className="font-h2 text-h2 text-black">{totalHosts}</div>
      </div>
    </section>
  );
}
