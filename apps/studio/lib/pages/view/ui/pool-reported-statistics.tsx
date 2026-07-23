import type { ShinzoHubViewPool } from "@shinzo/shinzohub/views";
import { formatCount, formatShnz } from "../model/view-pool-utils";
import { DetailRow } from "./detail-row";

export const PoolReportedStatistics = ({
  pool,
}: {
  pool: ShinzoHubViewPool;
}) => (
  <div className="bg-white p-5 sm:p-6">
    <h3 className="font-mono text-sm text-szo-black">Reported statistics</h3>
    <dl className="mt-4 space-y-3 text-xs">
      <DetailRow
        label="Settlement-reported unit price"
        value={
          pool.stats.reportedUnitPrice === null
            ? "Not reported"
            : `${formatShnz(pool.stats.reportedUnitPrice)} SHNZ`
        }
      />
      <DetailRow
        label="Utilization"
        value={`${pool.stats.utilizationPercent}%`}
      />
      <DetailRow
        label="Lifetime queries"
        value={formatCount(pool.stats.totalQueries)}
      />
      <DetailRow
        label="Lifetime rewards"
        value={`${formatShnz(pool.stats.totalRewards)} SHNZ`}
      />
      <DetailRow
        label="Last reported epoch"
        value={
          pool.stats.lastUpdatedEpoch > 0n
            ? pool.stats.lastUpdatedEpoch.toString()
            : "Not reported"
        }
      />
    </dl>
  </div>
);
