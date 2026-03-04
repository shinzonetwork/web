import { useMetricsContext } from "@/lib/context";
import { StatCard } from "../../stat-card";

export function ProcessedPerHour() {
  const { currentMetricsData } = useMetricsContext();
  if (!currentMetricsData) return null;

  const {
    transactions_processed,
    logs_processed,
    access_lists_processed,
    attestations_created,
    uptime_seconds,
  } = currentMetricsData;

  const uptimeSeconds = Math.max(uptime_seconds ?? 0, 1);
  const uptimeHours = Math.round(uptimeSeconds / 3600);

  const showPerHour = uptimeHours >= 1;
  const divisor = Math.max(uptimeHours, 1);
  const transactionsPerHour = showPerHour
    ? Math.floor((transactions_processed ?? 0) / divisor)
    : (transactions_processed ?? 0);
  const logsPerHour = showPerHour
    ? Math.floor((logs_processed ?? 0) / divisor)
    : (logs_processed ?? 0);
  const accessListsPerHour = showPerHour
    ? Math.floor((access_lists_processed ?? 0) / divisor)
    : (access_lists_processed ?? 0);
  const attestationsPerHour = showPerHour
    ? Math.floor((attestations_created ?? 0) / divisor)
    : (attestations_created ?? 0);

  return (
    <div className="grid grid-cols-2 gap-8">
      <StatCard
        title={showPerHour ? "Transactions/hour" : "Transactions"}
        value={transactionsPerHour}
        description={
          !showPerHour ? `Transaction processed within first hour` : ``
        }
      />
      <StatCard
        title={showPerHour ? "Logs/hour" : "Logs"}
        value={logsPerHour}
        description={!showPerHour ? `Log processed within first hour` : ``}
      />
      <StatCard
        title={showPerHour ? "Access Lists/hour" : "Access Lists"}
        value={accessListsPerHour}
        description={
          !showPerHour ? `Access List processed within first hour` : ``
        }
      />
      <StatCard
        title={showPerHour ? "Attestations/hour" : "Attestations"}
        value={attestationsPerHour}
        description={
          !showPerHour ? `Attestation processed within first hour` : ``
        }
      />
    </div>
  );
}
