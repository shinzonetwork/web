"use client";

import { useCallback, useState } from "react";
import { SearchInput } from "@shinzo/ui/search-input";
import { isAddress } from "viem";
import { DECODE_LOG_LENS, type DecodeLogLensArgs } from "@/entities/lens";
import { useDeployViewAction } from "@/features/deploy-view/model/use-deploy-view-action";
import { DeployActionControls } from "@/features/deploy-view/ui/deploy-action-controls";
import { DeployNetworkNotice } from "@/features/deploy-view/ui/deploy-network-notice";
import { DeployStatusMessage } from "@/features/deploy-view/ui/deploy-status-message";
import {
  PresetBadgeList,
  type PresetBadgeItem,
} from "@/features/deploy-view/ui/preset-badge-list";
import { ValidationIssues } from "@/features/deploy-view/ui/validation-issues";
import { POPULAR_ETHEREUM_CONTRACT_PRESETS } from "@/shared/consts/view-config";
import { fetchDecodeLogLensArgs } from "../model/sourcify";

const contractPresetItems: readonly PresetBadgeItem[] =
  POPULAR_ETHEREUM_CONTRACT_PRESETS.map((contract) => ({
    key: contract.address,
    value: contract.address,
    label: contract.label,
    title: `${contract.name} · ${contract.address}`,
  }));

export const DecodeStudioTab = () => {
  const [address, setAddress] = useState("");
  const normalizedAddress = address.trim();
  const isValidAddress =
    normalizedAddress.length > 0 && isAddress(normalizedAddress);
  const resolveArgs = useCallback(
    (): Promise<DecodeLogLensArgs> => fetchDecodeLogLensArgs(normalizedAddress),
    [normalizedAddress]
  );
  const deployAction = useDeployViewAction({
    lens: DECODE_LOG_LENS,
    canSubmit: isValidAddress,
    resolveArgs,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-szo-black">
          {DECODE_LOG_LENS.title}
        </h2>
        <p className="text-sm leading-relaxed text-szo-black/60">
          Enter any verified Ethereum smart contract address and Shinzo will
          fetch its Sourcify ABI, index its logs, and save a reusable decoded
          view. For example, paste the USDC Proxy contract to browse decoded
          token events after deployment.
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
              void deployAction.submit();
            }
          }}
        />

        <PresetBadgeList items={contractPresetItems} onSelect={setAddress} />
      </div>

      <DeployActionControls
        canSubmit={isValidAddress}
        isConnected={deployAction.isConnected}
        isOnShinzoDevnet={deployAction.isOnShinzoDevnet}
        isInProgress={deployAction.isInProgress}
        status={deployAction.status}
        pendingLabel={
          deployAction.isPreparing
            ? "Fetching verified ABI from Sourcify..."
            : undefined
        }
        onSubmit={() => void deployAction.submit()}
        onSwitchToShinzo={() => void deployAction.switchToShinzo()}
      />

      <DeployNetworkNotice
        isConnected={deployAction.isConnected}
        isOnShinzoDevnet={deployAction.isOnShinzoDevnet}
      />

      <DeployStatusMessage error={deployAction.error} />
      <ValidationIssues issues={deployAction.validationIssues} />
    </div>
  );
};
