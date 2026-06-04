"use client";

import { Loader2 } from "lucide-react";
import type { DeployStatus } from "@/entities/view";
import { Button } from "@/shared/ui/button";
import { ConnectDialog } from "@/shared/ui/connect-dialog";

const STATUS_LABELS: Record<DeployStatus, string> = {
  idle: "",
  checking: "Checking ShinzoHub for an existing registration...",
  validating: "Validating view definition...",
  deploying: "Sending deployment transaction...",
  confirming: "Waiting for deployment confirmation...",
  done: "",
  error: "",
};

interface DeployActionControlsProps {
  canSubmit: boolean;
  isConnected: boolean;
  isOnShinzoDevnet: boolean;
  isInProgress: boolean;
  status: DeployStatus;
  pendingLabel?: string;
  onSubmit: () => void;
  onSwitchToShinzo: () => void;
}

export const DeployActionControls = ({
  canSubmit,
  isConnected,
  isOnShinzoDevnet,
  isInProgress,
  status,
  pendingLabel,
  onSubmit,
  onSwitchToShinzo,
}: DeployActionControlsProps) => (
  <div className="flex flex-wrap gap-3">
    {!isConnected ? (
      <ConnectDialog />
    ) : (
      <>
        {!isOnShinzoDevnet && (
          <Button
            type="button"
            onClick={onSwitchToShinzo}
            disabled={isInProgress}
            variant="secondary"
            className="disabled:cursor-not-allowed disabled:opacity-50"
          >
            Switch to Shinzo Devnet
          </Button>
        )}
        <Button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit || isInProgress || !isOnShinzoDevnet}
          className="gap-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isInProgress && <Loader2 className="size-4 animate-spin" />}
          {isInProgress ? pendingLabel || STATUS_LABELS[status] : "Deploy"}
        </Button>
      </>
    )}
  </div>
);
