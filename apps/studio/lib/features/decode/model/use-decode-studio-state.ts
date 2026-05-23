"use client";

import { useCallback, useState } from "react";
import { useConnection, useSwitchChain } from "wagmi";
import { isAddress } from "viem";
import { DECODE_LOG_LENS } from "@/entities/lens";
import { shinzoDevnet } from "@/shared/consts/wagmi";
import {
  ViewValidationError,
  useDeployLens,
  useStoredViews,
  type StoredDeployedView,
} from "@/entities/view";
import { fetchDecodeLogLensArgs } from "./sourcify";

export interface UseDecodeStudioStateResult {
  address: string;
  setAddress: (value: string) => void;
  normalizedAddress: string;
  isValidAddress: boolean;
  isConnected: boolean;
  isOnShinzoDevnet: boolean;
  isFetchingAbi: boolean;
  isInProgress: boolean;
  status: ReturnType<typeof useDeployLens>["status"];
  error: string;
  switchChainError: string;
  validationIssues: ReturnType<typeof useDeployLens>["validationIssues"];
  lastSavedView: StoredDeployedView | null;
  submit: () => Promise<void>;
  switchToShinzo: () => Promise<void>;
}

export const useDecodeStudioState = (): UseDecodeStudioStateResult => {
  const { chainId: activeChainId, isConnected } = useConnection();
  const { mutateAsync: switchChainMutateAsync } = useSwitchChain();
  const { upsert } = useStoredViews();
  const {
    deploy,
    status,
    error: deployError,
    validationIssues,
    reset,
  } = useDeployLens();

  const [address, setAddress] = useState("");
  const [isFetchingAbi, setIsFetchingAbi] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [switchChainError, setSwitchChainError] = useState("");
  const [lastSavedView, setLastSavedView] = useState<StoredDeployedView | null>(
    null
  );

  const normalizedAddress = address.trim();
  const isValidAddress =
    normalizedAddress.length > 0 && isAddress(normalizedAddress);
  const isOnShinzoDevnet = activeChainId === shinzoDevnet.id;
  const isDeployInProgress =
    status === "checking" ||
    status === "validating" ||
    status === "deploying" ||
    status === "confirming";
  const isInProgress = isFetchingAbi || isDeployInProgress;

  const submit = useCallback(async () => {
    if (!isConnected || !isValidAddress || isInProgress) {
      return;
    }

    reset();
    setFetchError("");
    setLastSavedView(null);

    let decodeArgs;
    setIsFetchingAbi(true);

    try {
      decodeArgs = await fetchDecodeLogLensArgs(normalizedAddress);
    } catch (error) {
      setFetchError(
        error instanceof Error
          ? error.message
          : "Could not fetch a verified ABI from Sourcify."
      );
      setIsFetchingAbi(false);
      return;
    }

    setIsFetchingAbi(false);

    try {
      const { deployedView } = await deploy(DECODE_LOG_LENS, decodeArgs);
      upsert(deployedView);
      setLastSavedView(deployedView);
    } catch (error) {
      if (!(error instanceof ViewValidationError)) {
        console.error(error);
      }
    }
  }, [
    deploy,
    isConnected,
    isInProgress,
    isValidAddress,
    normalizedAddress,
    reset,
    upsert,
  ]);

  const switchToShinzo = useCallback(async () => {
    setSwitchChainError("");
    try {
      await switchChainMutateAsync({ chainId: shinzoDevnet.id });
    } catch (error) {
      setSwitchChainError(
        error instanceof Error
          ? error.message
          : "Could not switch to Shinzo Devnet."
      );
    }
  }, [switchChainMutateAsync]);

  return {
    address,
    setAddress,
    normalizedAddress,
    isValidAddress,
    isConnected,
    isOnShinzoDevnet,
    isFetchingAbi,
    isInProgress,
    status,
    error: fetchError || deployError,
    switchChainError,
    validationIssues,
    lastSavedView,
    submit,
    switchToShinzo,
  };
};
