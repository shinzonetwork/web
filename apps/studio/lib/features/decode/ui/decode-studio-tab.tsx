"use client";

import { Loader2 } from "lucide-react";
import { SearchInput } from "@shinzo/ui/search-input";
import { DECODE_LOG_LENS } from "@/entities/lens";
import { StoredViewsPanel, type DeployStatus } from "@/entities/view";
import { POPULAR_ETHEREUM_CONTRACT_PRESETS } from "@/shared/consts/view-config";
import { Button } from "@/shared/ui/button";
import { ConnectDialog } from "@/shared/ui/connect-dialog";
import { DeployStatusMessage } from "@/pages/studio/ui/deploy-status-message";
import { ValidationIssues } from "@/pages/studio/ui/validation-issues";
import { useDecodeStudioState } from "../model/use-decode-studio-state";

const STATUS_LABELS: Record<DeployStatus, string> = {
  idle: "",
  checking: "Checking ShinzoHub for an existing registration...",
  validating: "Validating view definition...",
  deploying: "Sending deployment transaction...",
  confirming: "Waiting for deployment confirmation...",
  done: "",
  error: "",
};

const ContractPresetBadges = ({
  onSelect,
}: {
  onSelect: (address: string) => void;
}) => (
  <div className="flex flex-wrap gap-2">
    {POPULAR_ETHEREUM_CONTRACT_PRESETS.map((contract) => (
      <button
        key={contract.address}
        type="button"
        onClick={() => onSelect(contract.address)}
        title={`${contract.name} · ${contract.address}`}
        className="inline-flex items-center rounded-full border border-szo-border px-3 py-1.5 text-xs font-medium text-szo-black transition-colors hover:border-szo-black"
      >
        {contract.label}
      </button>
    ))}
  </div>
);

export const DecodeStudioTab = () => {
  const {
    address,
    setAddress,
    isValidAddress,
    isConnected,
    isOnShinzoDevnet,
    isFetchingAbi,
    isInProgress,
    status,
    error,
    switchChainError,
    validationIssues,
    lastSavedView,
    submit,
    switchToShinzo,
  } = useDecodeStudioState();

  const combinedError = error || switchChainError;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-szo-black">
          {DECODE_LOG_LENS.title}
        </h2>
        <p className="text-sm leading-relaxed text-szo-black/60">
          Enter any verified Ethereum smart contract address and Shinzo will
          fetch its Sourcify ABI, index its logs, and save a reusable decoded
          view. For example, paste the ENS Registry contract to browse decoded
          resolver and ownership events after deployment.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <SearchInput
          placeholder="Enter an Ethereum contract address (0x...)"
          showHint={false}
          enableSlashKey={false}
          autoFocus
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              void submit();
            }
          }}
        />

        <ContractPresetBadges onSelect={setAddress} />
      </div>

      <div className="flex flex-wrap gap-3">
        {!isConnected ? (
          <ConnectDialog />
        ) : (
          <>
            {!isOnShinzoDevnet && (
              <Button
                type="button"
                onClick={() => void switchToShinzo()}
                disabled={isInProgress}
                variant="secondary"
                className="disabled:cursor-not-allowed disabled:opacity-50"
              >
                Switch to Shinzo Devnet
              </Button>
            )}

            <Button
              type="button"
              onClick={() => void submit()}
              disabled={!isValidAddress || isInProgress || !isOnShinzoDevnet}
              className="gap-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isInProgress && <Loader2 className="size-4 animate-spin" />}
              {isFetchingAbi
                ? "Fetching verified ABI from Sourcify..."
                : isInProgress
                  ? STATUS_LABELS[status]
                  : "Deploy"}
            </Button>
          </>
        )}
      </div>

      {isConnected && !isOnShinzoDevnet && (
        <p className="text-sm text-amber-600">
          Switch your wallet to Shinzo Devnet before deploying. Custom network
          wallets like Rabby can be stricter about when they allow chain
          add/switch requests.
        </p>
      )}

      <DeployStatusMessage
        status={status}
        error={combinedError}
        lastSavedView={lastSavedView}
      />

      <ValidationIssues issues={validationIssues} />

      <StoredViewsPanel lensKey={DECODE_LOG_LENS.lensKey} />
    </div>
  );
};
