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
import { createView, getCreatedViewAddress } from "@shinzo/shinzohub";
import type {
  LensArgs,
  LensDefinition,
  ResolvedLensView,
} from "@/entities/lens";
import { shinzoDevnet, wagmiConfig } from "@/shared/consts/wagmi";
import { resolveViewDefinition } from "../api/deploy-transaction";
import {
  findHubViewByEntityName,
  type HubViewRecord,
  useStudioHubViews,
} from "../api/hub-views";
import { createStoredDeployedView } from "./storage";
import type { DeployStatus, StoredDeployedView } from "./types";
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
  const chainId = shinzoDevnet.id;

  try {
    await switchChainMutateAsync({ chainId });
  } catch (error) {
    throw createDeployTransactionError(
      "Could not switch your wallet to Shinzo Devnet.",
      error,
      "Network switch was rejected in your wallet."
    );
  }

  const walletClient = await (async () => {
    try {
      return await getWalletClient(wagmiConfig, { chainId });
    } catch (error) {
      throw createDeployTransactionError(
        "Could not access your Shinzo Devnet wallet client.",
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
        `Deployment transaction ${txHash} was broadcast, but confirmation timed out. It may still be pending on Shinzo Devnet.`
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
  studioHubViews: HubViewRecord[],
  refreshStudioHubViews: () => Promise<HubViewRecord[]>
): Promise<{ contractAddress: string; txHash: string }> => {
  const contractAddress = getCreatedViewAddress(receipt);
  let availableViews = studioHubViews;
  let registeredHubView = findHubViewByEntityName(availableViews, entityName, {
    contractAddress,
  });

  for (let attempt = 0; attempt < 20 && !registeredHubView; attempt += 1) {
    await new Promise((resolve) => window.setTimeout(resolve, 1_000));
    availableViews = await refreshStudioHubViews();

    registeredHubView = findHubViewByEntityName(availableViews, entityName, {
      contractAddress,
    });
  }

  if (!registeredHubView) {
    throw new Error(
      `Deployment transaction succeeded, but ShinzoHub Cosmos RPC did not return a registered view named "${entityName}".`
    );
  }

  return {
    contractAddress: registeredHubView.contractAddress,
    txHash: receipt.transactionHash,
  };
};

export interface DeployResult {
  deployedView: StoredDeployedView;
  validationWarnings: ValidationIssue[];
}

export interface DeployPackResult {
  deployedViews: StoredDeployedView[];
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
  const publicClient = usePublicClient({ chainId: shinzoDevnet.id });
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
        const deployedView = createStoredDeployedView(resolvedView, {
          source: "hub-existing",
          contractAddress: existing.contractAddress,
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

      const { contractAddress, txHash } = await confirmRegisteredView(
        receipt,
        resolvedView.entityName,
        studioHubViews,
        async () => (await refetchStudioHubViews()).data ?? []
      );

      const deployedView = createStoredDeployedView(resolvedView, {
        source: "deployed",
        contractAddress,
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
        const deployedViews: StoredDeployedView[] = [];
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
