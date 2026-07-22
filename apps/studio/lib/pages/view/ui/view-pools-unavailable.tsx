import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/shared/ui/button";

export const ViewPoolsUnavailable = ({
  error,
  retry,
}: {
  error: string;
  retry: () => void;
}) => (
  <div
    className="border border-szo-primary/30 bg-ui-bg-accent p-5"
    role="status"
  >
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 gap-3">
        <AlertCircle
          className="mt-0.5 size-5 shrink-0 text-ui-text-accent"
          aria-hidden="true"
        />
        <div className="min-w-0">
          <h3 className="font-mono text-base text-szo-black">
            Pool status unavailable
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-ui-text-muted">
            Studio could not check the pools for this view. Its definition and
            query preview are still available.
          </p>
          <p className="mt-2 break-words font-mono text-xs text-ui-text-muted">
            {error}
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="secondary"
        onClick={retry}
        className="h-9 shrink-0 gap-2 px-4 text-sm"
      >
        <RefreshCw className="size-4" aria-hidden="true" />
        Retry
      </Button>
    </div>
  </div>
);
