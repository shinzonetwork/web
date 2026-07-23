import { Server } from "lucide-react";
import type { ShinzoHubViewPool } from "@shinzo/shinzohub/views";
import { createExplorerAddressLink, ViewAddressChip } from "@/entities/view";
import { pluralize } from "../model/view-pool-utils";
import { PoolDemandsDetails } from "./pool-demands-details";
import { PoolHostsDetails } from "./pool-hosts-details";
import { PoolIdentityDetails } from "./pool-identity-details";
import { PoolReportedStatistics } from "./pool-reported-statistics";

export const PoolTechnicalCard = ({
  pool,
  index,
}: {
  pool: ShinzoHubViewPool;
  index: number;
}) => (
  <section className="min-w-0">
    <div className="flex flex-col items-start justify-between gap-3 px-5 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Server
          className="size-4 shrink-0 text-ui-text-muted"
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="font-mono text-sm text-szo-black">
            Pool {String(index + 1).padStart(2, "0")}
          </p>
          <div className="mt-1">
            <ViewAddressChip
              link={createExplorerAddressLink(pool.poolAddress)}
            />
          </div>
        </div>
      </div>
      <span className="font-mono text-xs text-ui-text-muted sm:shrink-0">
        {pool.isActive
          ? `${pool.hosts.length} active ${pluralize(pool.hosts.length, "host")}`
          : `${pool.hosts.length} ${pluralize(pool.hosts.length, "host")} on standby`}
      </span>
    </div>

    <div className="grid gap-px border-t border-ui-border bg-gray-200 lg:grid-cols-2">
      <PoolIdentityDetails pool={pool} />
      <PoolReportedStatistics pool={pool} />
      <PoolHostsDetails pool={pool} />
      <PoolDemandsDetails pool={pool} />
    </div>
  </section>
);
