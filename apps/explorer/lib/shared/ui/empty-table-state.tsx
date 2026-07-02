import type { ReactNode } from "react";
import { Typography } from "@/shared/ui/typography";
import { cn } from "@/shared/utils/utils";

export interface EmptyTableStateProps {
  className?: string;
  description?: ReactNode;
  title: ReactNode;
  variant?: "content" | "panel";
}

export const EmptyTableState = ({
  className,
  description,
  title,
  variant = "panel",
}: EmptyTableStateProps) => {
  const isPanel = variant === "panel";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-1 text-center",
        isPanel && "relative min-h-54 w-full border-x border-ui-border bg-ui-bg-accent px-4 text-ui-text after:pointer-events-none after:absolute after:bottom-0 after:left-1/2 after:w-screen after:-translate-x-1/2 after:border-b after:border-ui-border",
        className,
      )}
    >
      <Typography variant="md">{title}</Typography>
      {description && (
        <Typography variant="sm" color="secondary">
          {description}
        </Typography>
      )}
    </div>
  );
};
