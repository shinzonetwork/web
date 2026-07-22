export const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex min-w-0 items-start justify-between gap-4">
    <dt className="shrink-0 text-ui-text-muted">{label}</dt>
    <dd className="min-w-0 break-words text-right font-mono text-szo-black [overflow-wrap:anywhere]">
      {value}
    </dd>
  </div>
);
