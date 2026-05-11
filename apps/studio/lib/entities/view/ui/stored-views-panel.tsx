"use client";

import { isStudioSupportedLens } from "@/entities/lens";
import { useStoredViews } from "../model/use-stored-views";
import { StoredViewCard } from "./stored-view-card";
import { useStoredViewCall } from "./use-stored-view-call";

interface StoredViewsPanelProps {
  lensKey?: string;
}

export const StoredViewsPanel = ({ lensKey }: StoredViewsPanelProps) => {
  const { views } = useStoredViews();
  const supportedViews = views.filter(
    (view) =>
      isStudioSupportedLens(view.lensKey) &&
      (!lensKey || view.lensKey === lensKey)
  );
  const { callState, page, call } = useStoredViewCall(supportedViews);

  if (supportedViews.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-mono text-lg font-light text-szo-black md:text-xl">
          Stored Deployments
        </h2>
        <p className="text-sm leading-relaxed text-szo-black/60">
          Saved registrations stay available after reload so you can call them
          again against the current host after ShinzoHub propagation.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {supportedViews.map((view) => (
          <StoredViewCard
            key={`${view.entityName}-${view.deployedAt}`}
            view={view}
            callState={callState}
            page={page}
            onCall={(v, options) => void call(v, options)}
          />
        ))}
      </div>
    </section>
  );
};
