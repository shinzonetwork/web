"use client";

import { useCallback, useState } from "react";
import { useConnection, useSwitchChain } from "wagmi";
import type { LensDefinition, TokenAddressLensArgs } from "@/entities/lens";
import { createViewHref } from "@/pages/views/model/view-formatters";
import { shinzoDevnet } from "@/shared/consts/wagmi";
import { normalizeErc20TokenAddress } from "@/shared/consts/view-config";
import { pushBrowserUrl } from "@/shared/utils/browser-location";
import {
  ViewValidationError,
  useDeployLens,
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
  submit: () => Promise<void>;
  switchToShinzo: () => Promise<void>;
}

export const useDeployFormState = (
  lens: LensDefinition<TokenAddressLensArgs>
): UseDeployFormStateResult => {
  const { chainId: activeChainId, isConnected } = useConnection();
  const { mutateAsync: switchChainMutateAsync } = useSwitchChain();
  const { deploy, status, error, validationIssues } = useDeployLens();

  const [address, setAddress] = useState("");
  const [switchChainError, setSwitchChainError] = useState("");

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

    try {
      const { deployedView } = await deploy(lens, {
        tokenAddress: normalizedAddress,
      });
      pushBrowserUrl(createViewHref(deployedView.entityName));
    } catch (err) {
      if (!(err instanceof ViewValidationError)) {
        console.error(err);
      }
    }
  }, [deploy, isConnected, isInProgress, lens, normalizedAddress]);

  const switchToShinzo = useCallback(async () => {
    setSwitchChainError("");
    try {
      await switchChainMutateAsync({ chainId: shinzoDevnet.id });
    } catch (err) {
      setSwitchChainError(
        err instanceof Error ? err.message : "Could not switch to Shinzo Devnet."
      );
    }
  }, [switchChainMutateAsync]);

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
    submit,
    switchToShinzo,
  };
};
