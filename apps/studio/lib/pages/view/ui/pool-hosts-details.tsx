import type { ShinzoHubViewPool } from "@shinzo/shinzohub/views";
import { createExplorerAddressLink, ViewAddressChip } from "@/entities/view";

export const PoolHostsDetails = ({ pool }: { pool: ShinzoHubViewPool }) => (
  <div className="bg-white p-5 sm:p-6">
    <h3 className="font-mono text-sm text-szo-black">
      {pool.isActive ? "Active hosts" : "Hosts on standby"} ({pool.hosts.length}
      )
    </h3>
    <p className="mt-2 text-xs leading-5 text-ui-text-muted">
      {pool.isActive
        ? "These hosts are currently serving the view."
        : `These hosts have joined and are waiting for the pool to reach ${pool.requiredHostCount} hosts.`}
    </p>
    {pool.hosts.length > 0 ? (
      <ul className="mt-4 space-y-3">
        {pool.hosts.map((host) => (
          <li
            key={host.hostAddress}
            className="flex min-w-0 items-center justify-between gap-3"
          >
            <ViewAddressChip
              link={createExplorerAddressLink(host.hostAddress)}
            />
            <span className="shrink-0 font-mono text-xs text-ui-text-muted">
              joined #{host.joinedAtHeight}
            </span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="mt-3 text-xs text-ui-text-muted">No hosts have joined.</p>
    )}
  </div>
);
