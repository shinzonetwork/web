"use client";

import { CircleHelp, ShieldCheck, ShieldX } from "lucide-react";
import { cn } from "@shinzo/ui/cn";
import type { ViewLensStatus } from "../model/types";

const getLensLabel = (lens: ViewLensStatus): string => {
  switch (lens.status) {
    case "verified":
      return "Verified";
    case "not-verified":
      return "Not verified";
    case "unknown":
      return "Unknown";
  }
};

const getLensClassName = (lens: ViewLensStatus): string => {
  switch (lens.status) {
    case "verified":
      return "border-szo-primary/30 bg-ui-bg-accent text-ui-text-accent";
    case "not-verified":
      return "border-ui-border bg-ui-bg-muted text-ui-text-muted";
    case "unknown":
      return "border-ui-border bg-white text-ui-text-muted";
  }
};

interface ViewLensBadgeProps {
  lens: ViewLensStatus;
  showIcon?: boolean;
  className?: string;
}

export const ViewLensBadge = ({
  lens,
  showIcon = false,
  className,
}: ViewLensBadgeProps) => (
  <span
    className={cn(
      "inline-flex w-fit max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 font-sans text-xs font-medium",
      getLensClassName(lens),
      className
    )}
  >
    {showIcon && lens.status === "verified" ? (
      <ShieldCheck className="size-3.5" aria-hidden="true" />
    ) : null}
    {showIcon && lens.status === "not-verified" ? (
      <ShieldX className="size-3.5" aria-hidden="true" />
    ) : null}
    {showIcon && lens.status === "unknown" ? (
      <CircleHelp className="size-3.5" aria-hidden="true" />
    ) : null}
    {getLensLabel(lens)}
  </span>
);
