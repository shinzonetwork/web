"use client";

import { useCallback, useState } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { shinzoDevnet } from "@/shared/consts/wagmi";
import { normalizeErc20TokenAddress } from "@/shared/consts/view-config";
import { ERC20_TRANSFER_LENS } from "@/entities/lens";
import {
  ViewValidationError,
  useDeployLens,
  useStoredViews,
  type StoredDeployedView,
} from "@/entities/view";

export interface UseDeployFormStateResult {
  address: string;
  setAddress: (value: string) => void;
  normalizedAddress: string;
  isConnected: boolean;
  isOnShinzoDevnet: boolean;
  isInProgress: boolean;
  status: ReturnType<typeof useDeployLens>["status"];
  error: string;
  switchChainError: string;
  validationIssues: ReturnType<typeof useDeployLens>["validationIssues"];
  lastSavedView: StoredDeployedView | null;
  submit: () => Promise<void>;
  switchToShinzo: () => Promise<void>;
}

export const useDeployFormState = (): UseDeployFormStateResult => {
  const { isConnected } = useAccount();
  const activeChainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { upsert } = useStoredViews();
  const { deploy, status, error, validationIssues } = useDeployLens();

  const [address, setAddress] = useState("");
  const [switchChainError, setSwitchChainError] = useState("");
  const [lastSavedView, setLastSavedView] = useState<StoredDeployedView | null>(
    null
  );

  const normalizedAddress = normalizeErc20TokenAddress(address);
  const isInProgress =
    status === "checking" ||
    status === "validating" ||
    status === "deploying" ||
    status === "confirming";
  const isOnShinzoDevnet = activeChainId === shinzoDevnet.id;

  const submit = useCallback(async () => {
    if (!normalizedAddress || !isConnected || isInProgress) {
      return;
    }

    setLastSavedView(null);

    try {
      const { deployedView } = await deploy(ERC20_TRANSFER_LENS, {
        tokenAddress: normalizedAddress,
      });
      upsert(deployedView);
      setLastSavedView(deployedView);
    } catch (err) {
      if (!(err instanceof ViewValidationError)) {
        console.error(err);
      }
    }
  }, [deploy, isConnected, isInProgress, normalizedAddress, upsert]);

  const switchToShinzo = useCallback(async () => {
    setSwitchChainError("");
    try {
      await switchChainAsync({ chainId: shinzoDevnet.id });
    } catch (err) {
      setSwitchChainError(
        err instanceof Error ? err.message : "Could not switch to Shinzo Devnet."
      );
    }
  }, [switchChainAsync]);

  return {
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
  };
};
