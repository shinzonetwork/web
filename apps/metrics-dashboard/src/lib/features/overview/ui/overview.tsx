"use client";

import { useMetricsContext } from "@/lib/context";
import { SectionHeader, ServerUptime, StatCard } from "@/lib/widgets";

export function Overview() {
  const { currentMetricsData } = useMetricsContext();
  if (!currentMetricsData) return null;

  const {
    most_recent_block,
    start_time,
    uptime_seconds,
    documents_received,
    total_errors,
  } = currentMetricsData;

  return (
    <section className="py-8">
      <SectionHeader title="Overview" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          title="Most Recent Block"
          value={most_recent_block}
          variant="primary"
          description="Current blockchain height"
        />
        <ServerUptime
          startTime={start_time}
          initialUptimeSeconds={uptime_seconds}
        />
        <StatCard
          title="Documents Received"
          value={documents_received}
          description={`${(documents_received / uptime_seconds).toFixed(0)}/sec avg`}
        />
        <StatCard
          title="Total Errors"
          value={total_errors}
          variant={total_errors > 0 ? "destructive" : "success"}
          description={
            total_errors === 0 ? "No errors detected" : "Requires attention"
          }
        />
      </div>
    </section>
  );
}
