"use client";

import { useCallback, useState } from "react";
import {
  BaseError,
  UserRejectedRequestError,
  WaitForTransactionReceiptTimeoutError,
  type Address,
  type Hash,
  type ReplacementReturnType,
  type TransactionReceipt,
} from "viem";
import { getWalletClient } from "@wagmi/core";
import {
  useConnection,
  usePublicClient,
  useSwitchChain,
  type UseSwitchChainReturnType,
} from "wagmi";
import {
  bundleView,
  validateView,
  type ValidationIssue,
  type ViewDefinition,
} from "@shinzo/lenses/view";
import {
  createView,
  getCreatedViewAddress,
  getViewRegistration,
  shinzoHubTestnet as shinzoChain,
} from "@shinzo/shinzohub";
import type {
  LensArgs,
  LensDefinition,
  ResolvedLensView,
} from "@/entities/lens";
import { wagmiConfig } from "@/shared/consts/wagmi";
import { getChainSwitchErrorMessage } from "@/shared/utils/chain-switch-error";
import { resolveViewDefinition } from "../api/deploy-transaction";
import {
  fetchHubViewByAddress,
  findHubViewByEntityName,
  shinzohubPublicClient,
  type HubViewRecord,
  useStudioHubViews,
} from "../api/hub-views";
import { createDeployedViewRecord } from "./deployed-view";
import type { DeployedView, DeployStatus } from "./types";
import { ViewValidationError } from "./view-validation-error";

interface ValidatedView {
  definition: ViewDefinition;
  warnings: ValidationIssue[];
}

const validateResolvedView = async <TArgs extends LensArgs>(
  view: ResolvedLensView<TArgs>
): Promise<ValidatedView> => {
  const definition = await resolveViewDefinition(view);
  const validation = await validateView(definition);

  if (!validation.ok) {
    throw new ViewValidationError(validation);
  }

  return {
    definition,
    warnings: validation.issues.filter((issue) => issue.severity === "warning"),
  };
};

type PublicClient = NonNullable<ReturnType<typeof usePublicClient>>;
type StudioWagmiConfig = typeof wagmiConfig;
const VIEW_REGISTRATION_MAX_ATTEMPTS = 20;
const VIEW_REGISTRATION_POLL_INTERVAL_MS = 1_000;

const findError = (
  error: unknown,
  predicate: (error: unknown) => boolean
): unknown => {
  if (error instanceof BaseError) {
    return error.walk(predicate);
  }

  return predicate(error) ? error : null;
};

const isErrorNamed = (error: unknown, name: string): boolean =>
  error instanceof Error && error.name === name;

const getReadableErrorMessage = (error: unknown): string => {
  const cause = error instanceof BaseError ? error.walk() : error;

  if (cause instanceof BaseError) {
    return cause.shortMessage || cause.details || cause.message;
  }

  if (cause instanceof Error) {
    return cause.message;
  }

  return "Unexpected error";
};

const isUserRejectedRequest = (error: unknown): boolean =>
  Boolean(
    findError(
      error,
      (cause) =>
        cause instanceof UserRejectedRequestError ||
        isErrorNamed(cause, "UserRejectedRequestError")
    )
  );

const isReceiptTimeout = (error: unknown): boolean =>
  Boolean(
    findError(
      error,
      (cause) =>
        cause instanceof WaitForTransactionReceiptTimeoutError ||
        isErrorNamed(cause, "WaitForTransactionReceiptTimeoutError")
    )
  );

const createDeployTransactionError = (
  message: string,
  error: unknown,
  rejectedMessage = "Wallet request was rejected."
): Error => {
  if (isUserRejectedRequest(error)) {
    return new Error(rejectedMessage);
  }

  return new Error(`${message} ${getReadableErrorMessage(error)}`);
};

interface SubmitDeployTxInput {
  account: Address;
  viewDefinition: ViewDefinition;
  publicClient: PublicClient;
  switchChainMutateAsync: UseSwitchChainReturnType<StudioWagmiConfig>["mutateAsync"];
  onBroadcastStart?: () => void;
  onTransactionSent?: (hash: Hash) => void;
}

const submitDeployTransaction = async (
  input: SubmitDeployTxInput
): Promise<TransactionReceipt> => {
  const {
    account,
    viewDefinition,
    publicClient,
    switchChainMutateAsync,
    onBroadcastStart,
    onTransactionSent,
  } = input;
  const bundle = await bundleView(viewDefinition);
  const chainId = shinzoChain.id;

  try {
    await switchChainMutateAsync({ chainId });
  } catch (error) {
    throw new Error(getChainSwitchErrorMessage(error));
  }

  const walletClient = await (async () => {
    try {
      return await getWalletClient(wagmiConfig, { chainId });
    } catch (error) {
      throw createDeployTransactionError(
        "Could not access your Shinzo wallet client.",
        error
      );
    }
  })();

  onBroadcastStart?.();
  let txHash: Hash;
  try {
    txHash = await createView(walletClient, {
      account,
      bundle,
    });
  } catch (error) {
    throw createDeployTransactionError(
      "Could not broadcast the deployment transaction.",
      error,
      "Deployment transaction was rejected in your wallet."
    );
  }

  onTransactionSent?.(txHash);

  const replacementRef: { current: ReplacementReturnType | null } = {
    current: null,
  };
  let receipt: TransactionReceipt;
  try {
    receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash,
      onReplaced: (response) => {
        replacementRef.current = response;
      },
    });
  } catch (error) {
    if (isReceiptTimeout(error)) {
      throw new Error(
        `Deployment transaction ${txHash} was broadcast, but confirmation timed out. It may still be pending on Shinzo.`
      );
    }

    throw createDeployTransactionError(
      `Deployment transaction ${txHash} was broadcast, but its receipt could not be fetched.`,
      error
    );
  }

  if (replacementRef.current?.reason === "cancelled") {
    throw new Error("Deployment transaction was cancelled in your wallet.");
  }

  if (replacementRef.current?.reason === "replaced") {
    throw new Error(
      "Deployment transaction was replaced by another transaction before confirmation."
    );
  }

  if (receipt.status !== "success") {
    throw new Error(
      `Deployment transaction ${receipt.transactionHash} reverted on-chain.`
    );
  }

  return receipt;
};

const confirmRegisteredView = async (
  receipt: TransactionReceipt,
  entityName: string,
  refreshStudioHubViews: () => Promise<HubViewRecord[]>
): Promise<{ viewAddress: string; txHash: string }> => {
  const viewAddress = getCreatedViewAddress(receipt);
  let isRegistered = false;

  for (let attempt = 0; attempt < VIEW_REGISTRATION_MAX_ATTEMPTS; attempt += 1) {
    const registration = await getViewRegistration(shinzohubPublicClient, {
      viewAddress,
    });

    if (registration.status === "registered") {
      isRegistered = true;
      break;
    }

    if (attempt < VIEW_REGISTRATION_MAX_ATTEMPTS - 1) {
      await new Promise((resolve) =>
        window.setTimeout(resolve, VIEW_REGISTRATION_POLL_INTERVAL_MS)
      );
    }
  }

  if (!isRegistered) {
    const message = [
      `Deployment transaction ${receipt.transactionHash} succeeded and created view address ${viewAddress},`,
      `but "${entityName}" did not become registered within ${
        (VIEW_REGISTRATION_MAX_ATTEMPTS * VIEW_REGISTRATION_POLL_INTERVAL_MS) / 1_000
      } seconds.`,
      "ShinzoHub completes registration asynchronously after a SourceHub ICA/IBC acknowledgement.",
      "Check the ShinzoHub relayer and ordered ICA channel before retrying; this is not a Host error.",
    ].join(" ");

    throw new Error(message);
  }

  const registeredHubView = await fetchHubViewByAddress(viewAddress, {
    includeMetadata: true,
  });

  if (registeredHubView.name !== entityName) {
    throw new Error(
      `Registered view ${viewAddress} has name "${registeredHubView.name}", expected "${entityName}".`
    );
  }

  await refreshStudioHubViews();

  return {
    viewAddress: registeredHubView.viewAddress,
    txHash: receipt.transactionHash,
  };
};

export interface DeployResult {
  deployedView: DeployedView;
  validationWarnings: ValidationIssue[];
}

export interface DeployPackResult {
  deployedViews: DeployedView[];
  validationWarnings: ValidationIssue[];
}

export interface UseDeployLensResult {
  deploy: <TArgs extends LensArgs>(
    lens: LensDefinition<TArgs>,
    args: TArgs
  ) => Promise<DeployResult>;
  deployResolvedViews: (views: ResolvedLensView[]) => Promise<DeployPackResult>;
  status: DeployStatus;
  error: string;
  activeViewTitle: string;
  validationIssues: ValidationIssue[];
  reset: () => void;
}

export const useDeployLens = (): UseDeployLensResult => {
  const { address: account } = useConnection();
  const { mutateAsync: switchChainMutateAsync } = useSwitchChain();
  const publicClient = usePublicClient({ chainId: shinzoChain.id });
  const { data: studioHubViews = [], refetch: refetchStudioHubViews } =
    useStudioHubViews();

  const [status, setStatus] = useState<DeployStatus>("idle");
  const [error, setError] = useState("");
  const [activeViewTitle, setActiveViewTitle] = useState("");
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>(
    []
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setError("");
    setActiveViewTitle("");
    setValidationIssues([]);
  }, []);

  const deployResolvedView = useCallback(
    async <TArgs extends LensArgs>(
      resolvedView: ResolvedLensView<TArgs>
    ): Promise<DeployResult> => {
      setActiveViewTitle(resolvedView.title);

      setStatus("checking");
      const existing = findHubViewByEntityName(
        studioHubViews,
        resolvedView.entityName
      );
      if (existing) {
        const deployedView = createDeployedViewRecord(resolvedView, {
          source: "hub-existing",
          viewAddress: existing.viewAddress,
        });
        return { deployedView, validationWarnings: [] };
      }

      setStatus("validating");
      const { definition, warnings } = await validateResolvedView(resolvedView);

      if (!account) {
        throw new Error("Wallet is not connected.");
      }
      if (!publicClient) {
        throw new Error(
          "Shinzo public client is unavailable. Check SHINZOHUB_EVM_RPC."
        );
      }

      setStatus("deploying");
      const receipt = await submitDeployTransaction({
        account,
        viewDefinition: definition,
        publicClient,
        switchChainMutateAsync,
        onBroadcastStart: () => {
          setStatus("deploying");
        },
        onTransactionSent: () => {
          setStatus("confirming");
        },
      });

      setStatus("registering");
      const { viewAddress, txHash } = await confirmRegisteredView(
        receipt,
        resolvedView.entityName,
        async () => (await refetchStudioHubViews()).data ?? []
      );

      const deployedView = createDeployedViewRecord(resolvedView, {
        source: "deployed",
        viewAddress,
        txHash,
      });

      return { deployedView, validationWarnings: warnings };
    },
    [
      account,
      publicClient,
      refetchStudioHubViews,
      studioHubViews,
      switchChainMutateAsync,
    ]
  );

  const deploy = useCallback(
    async <TArgs extends LensArgs>(
      lens: LensDefinition<TArgs>,
      args: TArgs
    ): Promise<DeployResult> => {
      if (!account) {
        throw new Error("Wallet is not connected.");
      }
      if (!publicClient) {
        throw new Error(
          "Shinzo public client is unavailable. Check SHINZOHUB_EVM_RPC."
        );
      }

      setError("");
      setValidationIssues([]);

      try {
        const { deployedView, validationWarnings } = await deployResolvedView(
          lens.resolveView(args)
        );
        setValidationIssues(validationWarnings);
        setStatus("done");
        return { deployedView, validationWarnings };
      } catch (err) {
        setStatus("error");
        if (err instanceof ViewValidationError) {
          setValidationIssues(err.result.issues);
        } else {
          setError(err instanceof Error ? err.message : "Unexpected error");
        }
        throw err;
      }
    },
    [account, publicClient, deployResolvedView]
  );

  const deployResolvedViews = useCallback(
    async (views: ResolvedLensView[]): Promise<DeployPackResult> => {
      if (!account) {
        throw new Error("Wallet is not connected.");
      }
      if (!publicClient) {
        throw new Error(
          "Shinzo public client is unavailable. Check SHINZOHUB_EVM_RPC."
        );
      }

      setError("");
      setValidationIssues([]);

      try {
        const deployedViews: DeployedView[] = [];
        const warnings: ValidationIssue[] = [];

        for (const view of views) {
          const result = await deployResolvedView(view);
          deployedViews.push(result.deployedView);
          warnings.push(...result.validationWarnings);
        }

        setValidationIssues(warnings);
        setStatus("done");
        return {
          deployedViews,
          validationWarnings: warnings,
        };
      } catch (err) {
        setStatus("error");
        if (err instanceof ViewValidationError) {
          setValidationIssues(err.result.issues);
        } else {
          setError(err instanceof Error ? err.message : "Unexpected error");
        }
        throw err;
      }
    },
    [account, publicClient, deployResolvedView]
  );

  return {
    deploy,
    deployResolvedViews,
    status,
    error,
    activeViewTitle,
    validationIssues,
    reset,
  };
};
