"use client";

import { Loader2 } from "lucide-react";
import { SearchInput } from "@shinzo/ui/search-input";
import type { LensDefinition, TokenAddressLensArgs } from "@/entities/lens";
import { Button } from "@/shared/ui/button";
import { ConnectDialog } from "@/shared/ui/connect-dialog";
import { TOP_ETHEREUM_ERC20_TOKEN_PRESETS } from "@/shared/consts/view-config";
import { StoredViewsPanel, type DeployStatus } from "@/entities/view";
import { useDeployFormState } from "../model/use-deploy-form-state";
import { DeployStatusMessage } from "./deploy-status-message";
import { ValidationIssues } from "./validation-issues";

const STATUS_LABELS: Record<DeployStatus, string> = {
  idle: "",
  checking: "Checking ShinzoHub for an existing registration...",
  validating: "Validating view definition...",
  simulating: "Simulating deployment transaction...",
  deploying: "Sending deployment transaction...",
  confirming: "Waiting for deployment confirmation...",
  done: "",
  error: "",
};

interface DeployFormProps {
  lens: LensDefinition<TokenAddressLensArgs>;
  showTokenPresets?: boolean;
  autoFocus?: boolean;
}

const TokenPresetBadges = ({
  onSelect,
}: {
  onSelect: (address: string) => void;
}) => (
  <div className="flex flex-wrap gap-2">
    {TOP_ETHEREUM_ERC20_TOKEN_PRESETS.map((token) => (
      <button
        key={token.address}
        type="button"
        onClick={() => onSelect(token.address)}
        title={`${token.name} (${token.symbol}) · ${token.address}`}
        className="inline-flex items-center gap-2 rounded-full border border-szo-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-szo-black"
      >
        <img
          src={token.icon}
          alt=""
          width={14}
          height={14}
          className="shrink-0"
        />
        <span className="font-medium text-szo-black">{token.symbol}</span>
      </button>
    ))}
  </div>
);

export const DeployForm = ({
  lens,
  showTokenPresets = false,
  autoFocus = false,
}: DeployFormProps) => {
  const {
    address,
    setAddress,
    normalizedAddress,
    isConnected,
    isOnShinzoDevnet,
    isInProgress,
    status,
    error,
    switchChainError,
    validationIssues,
    lastSavedView,
    submit,
    switchToShinzo,
  } = useDeployFormState(lens);

  const combinedError = error || switchChainError;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-szo-black">
          {lens.title}
        </h2>
        <p className="text-sm leading-relaxed text-szo-black/60">
          {lens.description} Deploy a view for a specific token contract,
          register it on ShinzoHub, then call it later from Stored Deployments
          after host propagation.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <SearchInput
          placeholder="Enter ERC-20 token address (0x...)"
          showHint={false}
          enableSlashKey={false}
          autoFocus={autoFocus}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void submit();
          }}
        />

        {showTokenPresets && (
          <TokenPresetBadges onSelect={setAddress} />
        )}
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
              disabled={!normalizedAddress || isInProgress || !isOnShinzoDevnet}
              className="gap-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isInProgress && <Loader2 className="size-4 animate-spin" />}
              {isInProgress ? STATUS_LABELS[status] : "Deploy"}
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

      <StoredViewsPanel lensKey={lens.lensKey} />
    </div>
  );
};
