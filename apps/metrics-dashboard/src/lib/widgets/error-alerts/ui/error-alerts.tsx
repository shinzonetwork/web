"use client";

import { cn } from "@/lib/shared/utils/utils";

type ErrorAlertsProps = {
  attestationErrors: number;
  signatureFailures: number;
};

export function ErrorAlerts({
  attestationErrors,
  signatureFailures,
}: ErrorAlertsProps) {
  const hasErrors = attestationErrors > 0 || signatureFailures > 0;

  return (
    <div
      className={cn(
        "font-mono font-medium p-8 border transition-all duration-300",
        hasErrors
          ? "bg-destructive/5 border-destructive animate-pulse"
          : "bg-success/5 border-success",
      )}
    >
      <div className="flex items-center gap-3 mb-6">
        <span
          className={cn(
            "inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold",
            hasErrors
              ? "bg-white border-2 border-destructive text-destructive"
              : "bg-success text-success-foreground",
          )}
        >
          {hasErrors ? "!" : "✓"}
        </span>
        <span
          className={cn(
            "text-sm uppercase tracking-wider",
            hasErrors ? "text-destructive" : "text-success",
          )}
        >
          {hasErrors ? "Errors Detected" : "No Errors"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center justify-between p-4 bg-background border border-border">
          <span className="text-sm text-muted-foreground">
            Attestation Errors
          </span>
          <span
            className={cn(
              "text-xl",
              attestationErrors > 0
                ? "text-destructive"
                : "text-muted-foreground",
            )}
          >
            {attestationErrors}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-background border border-border">
          <span className="text-sm text-muted-foreground">
            Signature Failures
          </span>
          <span
            className={cn(
              "text-xl",
              signatureFailures > 0
                ? "text-destructive"
                : "text-muted-foreground",
            )}
          >
            {signatureFailures}
          </span>
        </div>
      </div>
    </div>
  );
}
