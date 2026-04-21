"use client";

import { useCallback, useState } from "react";
import type { Address, TransactionReceipt } from "viem";
import {
  useAccount,
  usePublicClient,
  useSendTransaction,
  useSwitchChain,
} from "wagmi";
import {
  validateView,
  type ValidationIssue,
} from "@shinzo/lenses/validate";
import type {
  LensArgs,
  LensDefinition,
  ResolvedLensView,
} from "@/entities/lens";
import { shinzoDevnet } from "@/shared/consts/wagmi";
import {
  buildDeployTransaction,
  extractDeployedViewContractAddress,
} from "../api/deploy-transaction";
import { downloadWasm } from "../api/deploy-transaction";
import {
  findHubViewByEntityName,
  type HubViewRecord,
  useStudioHubViews,
} from "../api/hub-views";
import { createStoredDeployedView } from "./storage";
import type { DeployStatus, StoredDeployedView } from "./types";
import { ViewValidationError } from "./view-validation-error";

interface ValidatedView {
  wasmBytesByStep: Uint8Array[];
  warnings: ValidationIssue[];
}

const validateResolvedView = async <TArgs extends LensArgs>(
  view: ResolvedLensView<TArgs>
): Promise<ValidatedView> => {
  const wasmBytesByStep = await Promise.all(
    view.steps.map((step) => downloadWasm(step.wasmUrl))
  );
  const validation = await validateView({
    query: view.query,
    sdl: view.sdl,
    lenses: view.steps.map((step, index) => ({
      wasmBytes: wasmBytesByStep[index],
      args: step.args,
    })),
  });

  if (!validation.ok) {
    throw new ViewValidationError(validation);
  }

  return {
    wasmBytesByStep,
    warnings: validation.issues.filter((issue) => issue.severity === "warning"),
  };
};

type PublicClient = NonNullable<ReturnType<typeof usePublicClient>>;

interface SubmitDeployTxInput<TArgs extends LensArgs> {
  account: Address;
  resolvedView: ResolvedLensView<TArgs>;
  wasmBytesByStep: Uint8Array[];
  publicClient: PublicClient;
  switchChainAsync: ReturnType<typeof useSwitchChain>["switchChainAsync"];
  sendTransactionAsync: ReturnType<typeof useSendTransaction>["sendTransactionAsync"];
}

const submitDeployTransaction = async <TArgs extends LensArgs>(
  input: SubmitDeployTxInput<TArgs>
): Promise<TransactionReceipt> => {
  const {
    account,
    resolvedView,
    wasmBytesByStep,
    publicClient,
    switchChainAsync,
    sendTransactionAsync,
  } = input;
  const tx = await buildDeployTransaction(resolvedView, wasmBytesByStep);
  const chainId = shinzoDevnet.id;

  const estimatedGas = await publicClient.estimateGas({
    account,
    to: tx.to,
    data: tx.data,
  });
  const gas = estimatedGas + estimatedGas / BigInt(5);
  const gasPrice = await publicClient.getGasPrice();

  await switchChainAsync({ chainId });
  const txHash = await sendTransactionAsync({
    account,
    to: tx.to,
    data: tx.data,
    chainId,
    gas,
    gasPrice: gasPrice > BigInt(0) ? gasPrice : undefined,
  });

  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
  if (receipt.status !== "success") {
    throw new Error("Deployment transaction reverted on-chain.");
  }

  return receipt;
};

const confirmRegisteredView = async (
  receipt: TransactionReceipt,
  entityName: string,
  studioHubViews: HubViewRecord[],
  refreshStudioHubViews: () => Promise<HubViewRecord[]>
): Promise<{ contractAddress: string; txHash: string }> => {
  const contractAddress = extractDeployedViewContractAddress(receipt);
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
      `Deployment transaction succeeded, but ShinzoHub LCD did not return a registered view named "${entityName}".`
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
  deployResolvedViews: (
    views: ResolvedLensView[]
  ) => Promise<DeployPackResult>;
  status: DeployStatus;
  error: string;
  activeViewTitle: string;
  validationIssues: ValidationIssue[];
  reset: () => void;
}

export const useDeployLens = (): UseDeployLensResult => {
  const { address: account } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();
  const { switchChainAsync } = useSwitchChain();
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
      const { wasmBytesByStep, warnings } = await validateResolvedView(
        resolvedView
      );

      setStatus("deploying");
      const receipt = await submitDeployTransaction({
        account: account!,
        resolvedView,
        wasmBytesByStep,
        publicClient: publicClient!,
        switchChainAsync,
        sendTransactionAsync,
      });

      setStatus("confirming");
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
      sendTransactionAsync,
      studioHubViews,
      switchChainAsync,
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
          "Shinzo public client is unavailable. Check NEXT_PUBLIC_SHINZOHUB_EVM_RPC."
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
          "Shinzo public client is unavailable. Check NEXT_PUBLIC_SHINZOHUB_EVM_RPC."
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
