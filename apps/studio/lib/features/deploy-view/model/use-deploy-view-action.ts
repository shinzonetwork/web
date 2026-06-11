"use client";

import { useCallback, useState } from "react";
import { useConnection, useSwitchChain } from "wagmi";
import type { LensArgs, LensDefinition } from "@/entities/lens";
import {
  createViewHref,
  ViewValidationError,
  useDeployLens,
} from "@/entities/view";
import { shinzoDevnet } from "@/shared/consts/wagmi";
import { pushBrowserUrl } from "@/shared/utils/browser-location";

interface UseDeployViewActionInput<TArgs extends LensArgs> {
  lens: LensDefinition<TArgs>;
  canSubmit: boolean;
  resolveArgs: () => TArgs | Promise<TArgs>;
}

export interface UseDeployViewActionResult {
  isConnected: boolean;
  isOnShinzoDevnet: boolean;
  isPreparing: boolean;
  isInProgress: boolean;
  status: ReturnType<typeof useDeployLens>["status"];
  error: string;
  validationIssues: ReturnType<typeof useDeployLens>["validationIssues"];
  submit: () => Promise<void>;
  switchToShinzo: () => Promise<void>;
}

export const useDeployViewAction = <TArgs extends LensArgs>({
  lens,
  canSubmit,
  resolveArgs,
}: UseDeployViewActionInput<TArgs>): UseDeployViewActionResult => {
  const { chainId: activeChainId, isConnected } = useConnection();
  const { mutateAsync: switchChainMutateAsync } = useSwitchChain();
  const {
    deploy,
    status,
    error: deployError,
    validationIssues,
    reset,
  } = useDeployLens();

  const [isPreparing, setIsPreparing] = useState(false);
  const [prepareError, setPrepareError] = useState("");
  const [switchChainError, setSwitchChainError] = useState("");

  const isDeployInProgress =
    status === "checking" ||
    status === "validating" ||
    status === "deploying" ||
    status === "confirming" ||
    status === "registering";
  const isInProgress = isPreparing || isDeployInProgress;
  const isOnShinzoDevnet = activeChainId === shinzoDevnet.id;

  const submit = useCallback(async () => {
    if (!isConnected || !canSubmit || isInProgress) {
      return;
    }

    reset();
    setPrepareError("");

    let args: TArgs;
    setIsPreparing(true);
    try {
      args = await resolveArgs();
    } catch (error) {
      setPrepareError(
        error instanceof Error ? error.message : "Could not prepare view args."
      );
      setIsPreparing(false);
      return;
    }
    setIsPreparing(false);

    try {
      const { deployedView } = await deploy(lens, args);
      pushBrowserUrl(createViewHref(deployedView.entityName));
    } catch (error) {
      if (!(error instanceof ViewValidationError)) {
        console.error(error);
      }
    }
  }, [
    canSubmit,
    deploy,
    isConnected,
    isInProgress,
    lens,
    reset,
    resolveArgs,
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
    isConnected,
    isOnShinzoDevnet,
    isPreparing,
    isInProgress,
    status,
    error: prepareError || deployError || switchChainError,
    validationIssues,
    submit,
    switchToShinzo,
  };
};
