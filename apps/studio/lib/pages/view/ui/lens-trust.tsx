import { ShieldAlert, ShieldCheck } from "lucide-react";
import type { ViewPageRecord } from "../model/types";

export const LensTrust = ({ view }: { view: ViewPageRecord }) => {
  if (view.lens.status === "verified") {
    return (
      <div className="flex min-w-0 items-start gap-3">
        <ShieldCheck
          className="mt-0.5 size-5 shrink-0 text-ui-text-accent"
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="font-mono text-sm text-szo-black">Verified lens</p>
          <p className="mt-1 text-xs leading-5 text-ui-text-muted">
            {view.lens.title} matches a lens recognized by Studio.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 items-start gap-3">
      <ShieldAlert
        className="mt-0.5 size-5 shrink-0 text-amber-700"
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="font-mono text-sm text-szo-black">
          {view.lens.status === "not-verified"
            ? "Lens not verified"
            : "Lens verification unknown"}
        </p>
        <p className="mt-1 text-xs leading-5 text-ui-text-muted">
          Review the view definition before relying on its transformed data.
        </p>
      </div>
    </div>
  );
};
