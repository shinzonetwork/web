import type { ShinzoHubViewPool } from "@shinzo/shinzohub/views";
import { createExplorerAddressLink, ViewAddressChip } from "@/entities/view";
import { formatShnz } from "../model/view-pool-utils";
import { DetailRow } from "./detail-row";

export const PoolDemandsDetails = ({ pool }: { pool: ShinzoHubViewPool }) => (
  <div className="bg-white p-5 sm:p-6">
    <h3 className="font-mono text-sm text-szo-black">
      Demand entries ({pool.demands.length})
    </h3>
    {pool.demands.length > 0 ? (
      <ul className="mt-4 space-y-4">
        {pool.demands.map((demand) => (
          <li
            key={demand.registrantAddress}
            className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
          >
            <ViewAddressChip
              link={createExplorerAddressLink(demand.registrantAddress)}
            />
            <dl className="mt-2 space-y-1 text-xs">
              <DetailRow
                label="Bond"
                value={`${formatShnz(demand.bond)} SHNZ`}
              />
              <DetailRow
                label="Price preference"
                value={
                  demand.pricePreference === null
                    ? "None"
                    : `${formatShnz(demand.pricePreference)} SHNZ`
                }
              />
              <DetailRow
                label="Binding"
                value={demand.binding ? "Yes" : "No"}
              />
              <DetailRow
                label="Expiry"
                value={
                  demand.expiresAt === null
                    ? "None"
                    : demand.expiresAt.toString()
                }
              />
            </dl>
          </li>
        ))}
      </ul>
    ) : (
      <p className="mt-3 text-xs text-ui-text-muted">
        No demand entries were returned.
      </p>
    )}
  </div>
);
