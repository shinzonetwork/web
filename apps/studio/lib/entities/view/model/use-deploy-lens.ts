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
  getHubViewByContractAddress,
} from "../api/hub-views";
import { createStoredDeployedView } from "./storage";
import type { DeployStatus, StoredDeployedView } from "./types";
import { ViewValidationError } from "./view-validation-error";

interface ValidatedView {
  wasmBytes: Uint8Array;
  warnings: ValidationIssue[];
}

const validateResolvedView = async <TArgs extends LensArgs>(
  view: ResolvedLensView<TArgs>
): Promise<ValidatedView> => {
  const wasmBytes = await downloadWasm(view.wasmUrl);
  const validation = await validateView({
    query: view.query,
    sdl: view.sdl,
    lenses: [{ wasmBytes, args: view.deployArgs }],
  });

  if (!validation.ok) {
    throw new ViewValidationError(validation);
  }

  return {
    wasmBytes,
    warnings: validation.issues.filter((issue) => issue.severity === "warning"),
  };
};

type PublicClient = NonNullable<ReturnType<typeof usePublicClient>>;

interface SubmitDeployTxInput<TArgs extends LensArgs> {
  account: Address;
  resolvedView: ResolvedLensView<TArgs>;
  wasmBytes: Uint8Array;
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
    wasmBytes,
    publicClient,
    switchChainAsync,
    sendTransactionAsync,
  } = input;
  const tx = await buildDeployTransaction(resolvedView, wasmBytes);
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
  entityName: string
): Promise<{ contractAddress: string; txHash: string }> => {
  const contractAddress = extractDeployedViewContractAddress(receipt);
  const registeredHubView = await getHubViewByContractAddress(contractAddress);

  if (!registeredHubView) {
    throw new Error(
      `Deployment transaction succeeded, but ShinzoHub LCD did not return a registered view for contract ${contractAddress}.`
    );
  }

  if (registeredHubView.name !== entityName) {
    throw new Error(
      `ShinzoHub registered "${registeredHubView.name}", but Studio expected "${entityName}".`
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

export interface UseDeployLensResult {
  deploy: <TArgs extends LensArgs>(
    lens: LensDefinition<TArgs>,
    args: TArgs
  ) => Promise<DeployResult>;
  status: DeployStatus;
  error: string;
  validationIssues: ValidationIssue[];
  reset: () => void;
}

export const useDeployLens = (): UseDeployLensResult => {
  const { address: account } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();
  const { switchChainAsync } = useSwitchChain();
  const publicClient = usePublicClient({ chainId: shinzoDevnet.id });

  const [status, setStatus] = useState<DeployStatus>("idle");
  const [error, setError] = useState("");
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>(
    []
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setError("");
    setValidationIssues([]);
  }, []);

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
        const resolvedView = lens.resolveView(args);

        setStatus("checking");
        const existing = await findHubViewByEntityName(resolvedView.entityName);
        if (existing) {
          const deployedView = createStoredDeployedView(resolvedView, {
            source: "hub-existing",
            contractAddress: existing.contractAddress,
          });
          setStatus("done");
          return { deployedView, validationWarnings: [] };
        }

        setStatus("validating");
        const { wasmBytes, warnings } = await validateResolvedView(resolvedView);

        setStatus("deploying");
        const receipt = await submitDeployTransaction({
          account,
          resolvedView,
          wasmBytes,
          publicClient,
          switchChainAsync,
          sendTransactionAsync,
        });

        setStatus("confirming");
        const { contractAddress, txHash } = await confirmRegisteredView(
          receipt,
          resolvedView.entityName
        );

        const deployedView = createStoredDeployedView(resolvedView, {
          source: "deployed",
          contractAddress,
          txHash,
        });
        setValidationIssues(warnings);
        setStatus("done");
        return { deployedView, validationWarnings: warnings };
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
    [account, publicClient, sendTransactionAsync, switchChainAsync]
  );

  return { deploy, status, error, validationIssues, reset };
};
