import { formatShnz } from "../model/view-pool-utils";
import type { ViewPoolsState } from "../model/use-view-pools";

type NetworkUnitPriceState = Extract<
  ViewPoolsState,
  { status: "success" }
>["networkUnitPrice"];

export const NetworkRate = ({ state }: { state: NetworkUnitPriceState }) => {
  if (state.status === "success") {
    return (
      <p className="shrink-0 text-xs text-ui-text-muted">
        Reference rate:{" "}
        <span className="font-mono text-szo-black">
          {formatShnz(state.value)} SHNZ
        </span>{" "}
        per metered unit, not an exact query price.
      </p>
    );
  }

  if (state.status === "error") {
    return (
      <button
        type="button"
        onClick={state.retry}
        className="shrink-0 text-left text-xs font-medium text-ui-text-accent underline underline-offset-2"
        title={state.error}
      >
        Reference rate unavailable — retry
      </button>
    );
  }

  return (
    <p className="shrink-0 text-xs text-ui-text-muted">
      {state.status === "loading"
        ? "Loading reference rate…"
        : "Reference rate unavailable"}
    </p>
  );
};
