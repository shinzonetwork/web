import { RefreshCw } from "lucide-react";
import { cn } from "@shinzo/ui/cn";
import { Button } from "@/shared/ui/button";
import type { ViewPageRecord } from "../model/types";
import type { ViewAvailability } from "../model/view-availability";
import { LensTrust } from "./lens-trust";
import { getViewAvailabilityContent } from "./view-availability-content";

export const ViewOverview = ({
  view,
  availability,
}: {
  view: ViewPageRecord;
  availability: ViewAvailability;
}) => {
  const content = getViewAvailabilityContent(availability);
  const Icon = content.icon;

  return (
    <section
      className="grid min-w-0 border-y border-ui-border bg-white lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]"
      aria-labelledby="view-availability-title"
      aria-live="polite"
    >
      <div className="min-w-0 px-5 py-6 sm:px-6 sm:py-8 lg:border-r lg:border-ui-border">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-ui-text-accent">
          Pool status
        </p>
        <div className="mt-4 flex min-w-0 items-start gap-3">
          <span
            className={cn(
              "mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full border",
              content.iconClassName
            )}
          >
            <Icon
              className={cn(
                "size-4",
                availability.status === "loading" && "animate-spin"
              )}
              aria-hidden="true"
            />
          </span>
          <div className="min-w-0">
            <h2
              id="view-availability-title"
              className="font-mono text-2xl font-normal leading-tight text-szo-black sm:text-3xl"
            >
              {content.title}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-ui-text-muted sm:text-base sm:leading-7">
              {content.description}
            </p>
            {availability.status === "unavailable" ? (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={availability.retry}
                  className="h-9 gap-2 px-4 text-sm"
                >
                  <RefreshCw className="size-4" aria-hidden="true" />
                  Retry pool status
                </Button>
                <details className="text-xs text-ui-text-muted">
                  <summary className="cursor-pointer underline underline-offset-2">
                    Technical error
                  </summary>
                  <p className="mt-2 max-w-2xl break-words font-mono">
                    {availability.error}
                  </p>
                </details>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-5 border-t border-ui-border px-5 py-6 sm:px-6 lg:border-t-0">
        <LensTrust view={view} />
        {availability.status === "no-pools" ? (
          <div>
            <Button type="button" disabled className="w-full sm:w-auto">
              Register demand
            </Button>
            <p className="mt-2 text-xs text-ui-text-muted">
              Coming soon — the first demand creates a pool.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
};
