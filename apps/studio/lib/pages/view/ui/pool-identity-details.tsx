import type { ShinzoHubViewPool } from "@shinzo/shinzohub/views";
import { DetailRow } from "./detail-row";

export const PoolIdentityDetails = ({ pool }: { pool: ShinzoHubViewPool }) => (
  <div className="bg-white p-5 sm:p-6">
    <h3 className="font-mono text-sm text-szo-black">Pool identity</h3>
    <dl className="mt-4 space-y-3 text-xs">
      <DetailRow label="Pool address" value={pool.poolAddress} />
      <DetailRow label="View address" value={pool.viewAddress} />
      <DetailRow
        label="Pool configuration value (window_size)"
        value={pool.config.windowSize.toString()}
      />
      <DetailRow label="Created at height" value={`#${pool.createdAtHeight}`} />
      <DetailRow
        label="Current status"
        value={pool.isActive ? "Active" : "Waiting"}
      />
    </dl>
    <p className="mt-4 text-xs leading-5 text-ui-text-muted">
      The protocol does not currently define a user-facing unit or effect for
      window_size; Studio therefore presents it only as an opaque configuration
      value.
    </p>
  </div>
);
