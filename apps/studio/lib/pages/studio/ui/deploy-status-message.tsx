import type { DeployStatus, StoredDeployedView } from "@/entities/view";

interface DeployStatusMessageProps {
  status: DeployStatus;
  error: string;
  lastSavedView: StoredDeployedView | null;
}

export const DeployStatusMessage = ({
  status,
  error,
  lastSavedView,
}: DeployStatusMessageProps) => (
  <>
    {status === "error" && error && (
      <p className="text-sm text-red-500">{error}</p>
    )}

    {status === "done" && lastSavedView && (
      <p className="text-sm text-szo-black/60">
        Saved{" "}
        <span className="font-mono">{lastSavedView.entityName}</span> to Stored
        Deployments. Call it there once the host has propagated the view.
      </p>
    )}
  </>
);
