"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/shared/button";
import { cn } from "@shinzo/ui/cn";
import type { StoredDeployedView } from "./deployed-views-storage";
import { getLensDefinition } from "./lens-catalog";

export type StoredCallState =
  | { status: "idle" }
  | { status: "loading"; viewName: string }
  | { status: "success"; viewName: string; payload: unknown }
  | { status: "error"; viewName: string; error: string };

function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

type StoredViewsPanelProps = {
  storedViews: StoredDeployedView[];
  callState: StoredCallState;
  onCall: (view: StoredDeployedView) => void;
};

export function StoredViewsPanel({
  storedViews,
  callState,
  onCall,
}: StoredViewsPanelProps) {
  if (storedViews.length === 0) {
    return null;
  }

  const selectedView =
    callState.status === "idle"
      ? null
      : storedViews.find((view) => view.viewName === callState.viewName) ?? null;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-mono text-lg font-light text-szo-black md:text-xl">
          Stored Deployments
        </h2>
        <p className="text-sm leading-relaxed text-szo-black/60">
          Deployed views saved in this browser stay available after reload so
          you can call them again against the current host.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {storedViews.map((view) => {
          const lens = getLensDefinition(view.lensKey);
          const isLoading =
            callState.status === "loading" && callState.viewName === view.viewName;
          const canCall = Boolean(lens?.uiSupported);

          return (
            <article
              key={`${view.viewName}-${view.deployedAt}`}
              className="relative overflow-hidden border border-ui-border bg-white p-5"
            >
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[url('/bg-pattern.png')] bg-repeat-x bg-bottom opacity-30" />

              <div className="relative z-10 flex h-full flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-mono text-base font-light text-szo-black">
                      {lens?.title ?? view.lensKey}
                    </h3>
                    <p className="font-mono text-xs text-szo-black/50">
                      {view.viewName}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => onCall(view)}
                    disabled={!canCall || isLoading}
                    className="h-9 px-5 text-sm"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Calling...
                      </>
                    ) : (
                      "Call"
                    )}
                  </Button>
                </div>

                {lens?.description && (
                  <p className="text-sm leading-relaxed text-szo-black/60">
                    {lens.description}
                  </p>
                )}

                <dl className="flex flex-col gap-2 text-sm">
                  <div className="flex flex-col gap-1">
                    <dt className="font-mono text-xs uppercase tracking-[0.12em] text-szo-black/40">
                      Deployed
                    </dt>
                    <dd className="text-szo-black/70">
                      {formatTimestamp(view.deployedAt)}
                    </dd>
                  </div>

                  <div className="flex flex-col gap-1">
                    <dt className="font-mono text-xs uppercase tracking-[0.12em] text-szo-black/40">
                      Arguments
                    </dt>
                    <dd className="font-mono text-xs text-szo-black/70">
                      {JSON.stringify(view.args)}
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          );
        })}
      </div>

      <div className="relative overflow-hidden border border-ui-border bg-white p-5">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[url('/bg-pattern.png')] bg-repeat-x bg-bottom opacity-20" />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-mono text-base font-light text-szo-black">
              Stored Call Result
            </h3>
            <p className="font-mono text-xs text-szo-black/50">
              {selectedView
                ? selectedView.viewName
                : "Call a stored deployment to inspect its host response."}
            </p>
          </div>

          {callState.status === "idle" && (
            <div className="border border-ui-border bg-szo-bg p-4 text-sm text-szo-black/60">
              No stored view called yet.
            </div>
          )}

          {callState.status === "loading" && (
            <div className="flex items-center gap-2 border border-ui-border bg-szo-bg p-4 text-sm text-szo-black/70">
              <Loader2 className="size-4 animate-spin" />
              Calling stored deployment...
            </div>
          )}

          {callState.status === "error" && (
            <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {callState.error}
            </div>
          )}

          {callState.status === "success" && (
            <pre
              className={cn(
                "overflow-x-auto border border-ui-border bg-szo-bg p-4",
                "font-mono text-xs leading-relaxed text-szo-black"
              )}
            >
              {JSON.stringify(callState.payload, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </section>
  );
}
