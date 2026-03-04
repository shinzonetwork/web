"use client";

import { cn } from "@/lib/shared/utils/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  variant?: "default" | "success" | "warning" | "destructive" | "primary";
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  variant = "default",
  className,
}: StatCardProps) {
  const valueStyles = {
    default: "text-foreground",
    success: "text-success",
    warning: "text-warning",
    destructive: "text-destructive",
    primary: "text-primary",
  };

  return (
    <div
      className={cn(
        "font-mono font-medium bg-background p-8 border border-border transition-all duration-300 hover:border-primary",
        className,
      )}
    >
      <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
        {title}
      </div>
      <div className={cn("text-2xl", valueStyles[variant])}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground pt-4">{description}</p>
      )}
    </div>
  );
}
