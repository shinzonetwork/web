"use client";

import { UI_HOME_HEADER_CONTENT } from "@/shared/lib";
import { useRegisteredHosts } from "../hooks/hosts/use-registered-hosts";
import { useRegisteredGenerators } from "../hooks/generators/use-registered-generators";
import { DEFAULT_PAGE_PARAMS } from "../../../shared/lib/shinzohub/health";

export function StatsHome() {
  const { data: generatorsData, isPending: generatorsPending } =
    useRegisteredGenerators({ pageParams: DEFAULT_PAGE_PARAMS });
  const { data: hostsData, isPending: hostsPending } = useRegisteredHosts({
    pageParams: DEFAULT_PAGE_PARAMS,
  });

  const totalGenerators = generatorsPending
    ? null
    : (generatorsData?.totalGeneratorsCount ?? 0);
  const totalHosts = hostsPending ? null : (hostsData?.totalHostsCount ?? 0);

  return (
    <section className="grid w-full min-w-0 max-w-full grid-cols-1 border-b bg-background-accent-light border-border md:grid-cols-2 md:divide-x md:divide-border">
      <div className="py-6 px-8">
        <div className="font-mono text-secondary mb-1">
          {UI_HOME_HEADER_CONTENT.registered_generators}
        </div>
        <div className="font-h2 text-h2 text-black min-h-10.5 tabular-nums">
          {totalGenerators ?? "—"}
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
