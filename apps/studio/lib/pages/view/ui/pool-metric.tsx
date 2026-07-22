export const PoolMetric = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="bg-white p-3">
    <dt className="text-xs text-ui-text-muted">{label}</dt>
    <dd className="mt-1 font-mono text-base text-szo-black">{value}</dd>
  </div>
);
