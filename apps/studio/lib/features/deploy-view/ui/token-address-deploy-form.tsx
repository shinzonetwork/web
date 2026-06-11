"use client";

import { useCallback, useState } from "react";
import { SearchInput } from "@shinzo/ui/search-input";
import type { LensDefinition, TokenAddressLensArgs } from "@/entities/lens";
import {
  TOP_ETHEREUM_ERC20_TOKEN_PRESETS,
  normalizeErc20TokenAddress,
} from "@/shared/consts/view-config";
import { useDeployViewAction } from "../model/use-deploy-view-action";
import { DeployActionControls } from "./deploy-action-controls";
import { DeployNetworkNotice } from "./deploy-network-notice";
import { DeployStatusMessage } from "./deploy-status-message";
import { PresetBadgeList, type PresetBadgeItem } from "./preset-badge-list";
import { ValidationIssues } from "./validation-issues";

interface TokenAddressDeployFormProps {
  lens: LensDefinition<TokenAddressLensArgs>;
  showTokenPresets?: boolean;
  autoFocus?: boolean;
}

const tokenPresetItems: readonly PresetBadgeItem[] =
  TOP_ETHEREUM_ERC20_TOKEN_PRESETS.map((token) => ({
    key: token.address,
    value: token.address,
    label: token.symbol,
    title: `${token.name} (${token.symbol}) · ${token.address}`,
    icon: (
      <img
        src={token.icon}
        alt=""
        width={14}
        height={14}
        className="shrink-0"
      />
    ),
  }));

export const TokenAddressDeployForm = ({
  lens,
  showTokenPresets = false,
  autoFocus = false,
}: TokenAddressDeployFormProps) => {
  const [address, setAddress] = useState("");
  const normalizedAddress = normalizeErc20TokenAddress(address);
  const resolveArgs = useCallback(
    () => ({ tokenAddress: normalizedAddress }),
    [normalizedAddress]
  );
  const deployAction = useDeployViewAction({
    lens,
    canSubmit: Boolean(normalizedAddress),
    resolveArgs,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-szo-black">
          {lens.title}
        </h2>
        <p className="text-sm leading-relaxed text-szo-black/60">
          {lens.description} Deploy a view for a specific token contract,
          register it on ShinzoHub, then open it in the view playground after
          host propagation.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <SearchInput
          placeholder="Enter ERC-20 token address (0x...)"
          showHint={false}
          enableSlashKey={false}
          autoFocus={autoFocus}
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") void deployAction.submit();
          }}
        />

        {showTokenPresets && (
          <PresetBadgeList items={tokenPresetItems} onSelect={setAddress} />
        )}
      </div>

      <DeployActionControls
        canSubmit={Boolean(normalizedAddress)}
        isConnected={deployAction.isConnected}
        isOnShinzoDevnet={deployAction.isOnShinzoDevnet}
        isInProgress={deployAction.isInProgress}
        status={deployAction.status}
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
