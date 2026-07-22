import type { ReactNode } from "react";

export const TechnicalCell = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <div className="min-w-0 bg-white p-5">
    <p className="mb-2 text-xs uppercase tracking-wide text-ui-text-muted">
      {label}
    </p>
    {children}
  </div>
);
