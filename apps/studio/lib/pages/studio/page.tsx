"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { Address } from "viem";
import { SearchInput } from "@shinzo/ui/search-input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shinzo/ui/tabs";
import {
  useAccount,
  useChainId,
  usePublicClient,
  useSendTransaction,
  useSwitchChain,
} from "wagmi";
import { Header } from "./header";
import { ConnectDialog } from "@/shared/ui/connect-dialog";
import { type Erc20TransferResult } from "./query-view";
import { Results } from "./results";
import {
  HOST_GRAPHQL_REQUEST_URL,
  SHINZOHUB_LCD_URL,
} from "@/shared/consts/envs";
import { shinzoDevnet } from "@/shared/wagmi";
import {
  USDC_TOKEN_ADDRESS,
  USDT_TOKEN_ADDRESS,
} from "@/shared/consts/view-config";
import { Button } from "@/shared/button";
import {
  loadStoredDeployedViews,
  upsertStoredDeployedView,
  type StoredDeployedView,
} from "./deployed-views-storage";
import {
  ERC20_ACCOUNT_BALANCES_LENS,
  ERC20_TRANSFER_LENS,
  isStudioSupportedLens,
  type TokenAddressLensArgs,
} from "./lens-catalog";
import {
  StoredViewsPanel,
  type StoredCallState,
} from "./stored-views-panel";
import type { ValidationIssue } from "@shinzo/lenses/validate";
import {
  callStoredLensView,
  deployAndQueryLens,
  requeryLens,
  ViewValidationError,
} from "./studio-actions";

type DeployStatus =
  | "idle"
  | "checking"
  | "validating"
  | "deploying"
  | "confirming"
  | "propagating"
  | "querying"
  | "done"
  | "error";

const STATUS_LABELS: Record<DeployStatus, string> = {
  idle: "",
  checking: "Checking ShinzoHub for an existing registration...",
  validating: "Validating view definition...",
  deploying: "Sending deployment transaction...",
  confirming: "Waiting for deployment confirmation...",
  propagating: "Waiting for host propagation...",
  querying: "Querying host...",
  done: "",
  error: "",
};

export function StudioPage() {
  const { address: walletAddress, isConnected } = useAccount();
  const activeChainId = useChainId();
  const { sendTransactionAsync } = useSendTransaction();
  const { switchChainAsync } = useSwitchChain();
  const publicClient = usePublicClient({ chainId: shinzoDevnet.id });

  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<DeployStatus>("idle");
  const [error, setError] = useState("");
  const [results, setResults] = useState<Erc20TransferResult[]>([]);
  const [storedViews, setStoredViews] = useState<StoredDeployedView[]>([]);
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>(
    []
  );
  const [storedCallState, setStoredCallState] = useState<StoredCallState>({
    status: "idle",
  });

  useEffect(() => {
    setStoredViews(loadStoredDeployedViews());
  }, []);

  const isInProgress =
    status === "checking" ||
    status === "validating" ||
    status === "deploying" ||
    status === "confirming" ||
    status === "propagating" ||
    status === "querying";
  const isOnShinzoDevnet = activeChainId === shinzoDevnet.id;

  const normalizedAddress = address.trim().toLowerCase();
  const activeTransferArgs: TokenAddressLensArgs | null = normalizedAddress
    ? { tokenAddress: normalizedAddress }
    : null;
  const activeTransferView = activeTransferArgs
    ? ERC20_TRANSFER_LENS.resolveView(activeTransferArgs)
    : null;
  const activeStoredTransferView = activeTransferView
    ? storedViews.find(
        (view) =>
          view.lensKey === ERC20_TRANSFER_LENS.lensKey &&
          view.entityName === activeTransferView.entityName
      ) ?? null
    : storedViews.find((view) => view.lensKey === ERC20_TRANSFER_LENS.lensKey) ??
      null;
  const visibleStoredViews = storedViews.filter((view) =>
    isStudioSupportedLens(view.lensKey)
  );

  const handleSubmit = useCallback(async () => {
    if (!normalizedAddress || !isConnected || !walletAddress || isInProgress) {
      return;
    }

    const runtimeArgs: TokenAddressLensArgs = {
      tokenAddress: normalizedAddress,
    };

    setError("");
    setResults([]);
    setValidationIssues([]);

    try {
      const { deployedView, payload, validationWarnings } =
        await deployAndQueryLens({
          lens: ERC20_TRANSFER_LENS,
          args: runtimeArgs,
          account: walletAddress as Address,
          chainId: shinzoDevnet.id,
          hubUrl: SHINZOHUB_LCD_URL,
          hostUrl: HOST_GRAPHQL_REQUEST_URL,
          switchChainAsync,
          sendTransactionAsync,
          estimateGas: publicClient
            ? ({ account, to, data }) =>
                publicClient.estimateGas({ account, to, data })
            : undefined,
          getGasPrice: publicClient
            ? () => publicClient.getGasPrice()
            : undefined,
          waitForTransactionReceipt: publicClient
            ? ({ hash }) => publicClient.waitForTransactionReceipt({ hash })
            : undefined,
          onStatusChange: setStatus,
        });

      setValidationIssues(validationWarnings);
      setStoredViews(upsertStoredDeployedView(deployedView));
      setResults(
        Array.isArray(payload) ? (payload as Erc20TransferResult[]) : []
      );
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
      if (err instanceof ViewValidationError) {
        setValidationIssues(err.result.issues);
        setError("");
      } else {
        setError(err instanceof Error ? err.message : "Unexpected error");
      }
    }
  }, [
    isConnected,
    isInProgress,
    normalizedAddress,
    publicClient,
    sendTransactionAsync,
    switchChainAsync,
    walletAddress,
  ]);

  const handleRequery = useCallback(async () => {
    if (!activeStoredTransferView || isInProgress) return;

    setError("");
    setResults([]);

    try {
      setStatus("querying");
      const runtimeArgs = ERC20_TRANSFER_LENS.parseStoredArgs(
        activeStoredTransferView.args
      ) as TokenAddressLensArgs;
      const payload = await requeryLens({
        resolvedView: ERC20_TRANSFER_LENS.resolveView(runtimeArgs),
        hostUrl: HOST_GRAPHQL_REQUEST_URL,
        entityName: activeStoredTransferView.entityName,
      });
      setResults(
        Array.isArray(payload) ? (payload as Erc20TransferResult[]) : []
      );
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
  }, [activeStoredTransferView, isInProgress]);

  const handleStoredCall = useCallback(async (view: StoredDeployedView) => {
    setStoredCallState({
      status: "loading",
      entityName: view.entityName,
    });

    try {
      const { payload } = await callStoredLensView({
        view,
        hostUrl: HOST_GRAPHQL_REQUEST_URL,
      });
      setStoredCallState({
        status: "success",
        entityName: view.entityName,
        payload,
      });
    } catch (err) {
      setStoredCallState({
        status: "error",
        entityName: view.entityName,
        error: err instanceof Error ? err.message : "Unexpected error",
      });
    }
  }, []);

  const handleSwitchToShinzo = useCallback(async () => {
    setError("");

    try {
      await switchChainAsync({ chainId: shinzoDevnet.id });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not switch to Shinzo Devnet."
      );
    }
  }, [switchChainAsync]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-2xl flex-col px-6 py-12">
        <Tabs defaultValue={ERC20_TRANSFER_LENS.lensKey} className="gap-8">
          <div className="w-full border-b border-ui-border">
            <TabsList className="[&>*]:translate-y-[1px]">
              <TabsTrigger value={ERC20_TRANSFER_LENS.lensKey}>
                ERC20 Transfers
              </TabsTrigger>
              <TabsTrigger value={ERC20_ACCOUNT_BALANCES_LENS.lensKey}>
                ERC20 Balances
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value={ERC20_TRANSFER_LENS.lensKey}
            className="flex flex-col gap-8"
          >
            <StoredViewsPanel
              storedViews={visibleStoredViews}
              callState={storedCallState}
              onCall={handleStoredCall}
            />

            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-szo-black">
                {ERC20_TRANSFER_LENS.title}
              </h2>
              <p className="text-sm leading-relaxed text-szo-black/60">
                {ERC20_TRANSFER_LENS.description} Deploy a view for a specific
                token contract, register it on ShinzoHub, then re-query it from
                a Shinzo Host after propagation.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <SearchInput
                placeholder="Enter ERC-20 token address (0x...)"
                showHint={false}
                enableSlashKey={false}
                autoFocus
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAddress(USDT_TOKEN_ADDRESS)}
                  className="rounded-full border border-szo-border px-3 py-1 text-xs font-medium transition-colors hover:border-szo-black"
                >
                  USDT
                </button>
                <button
                  type="button"
                  onClick={() => setAddress(USDC_TOKEN_ADDRESS)}
                  className="rounded-full border border-szo-border px-3 py-1 text-xs font-medium transition-colors hover:border-szo-black"
                >
                  USDC
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {!isConnected ? (
                <ConnectDialog />
              ) : (
                <>
                  {!isOnShinzoDevnet && (
                    <Button
                      type="button"
                      onClick={handleSwitchToShinzo}
                      disabled={isInProgress}
                      variant="secondary"
                      className="disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Switch to Shinzo Devnet
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!address.trim() || isInProgress || !isOnShinzoDevnet}
                    className="gap-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isInProgress && (
                      <Loader2 className="size-4 animate-spin" />
                    )}
                    {isInProgress ? STATUS_LABELS[status] : "Deploy & Query"}
                  </Button>
                  {activeStoredTransferView && status !== "querying" && (
                    <Button
                      type="button"
                      onClick={handleRequery}
                      disabled={isInProgress}
                      variant="secondary"
                      className="disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Re-query
                    </Button>
                  )}
                </>
              )}
            </div>

            {isConnected && !isOnShinzoDevnet && (
              <p className="text-sm text-amber-600">
                Switch your wallet to Shinzo Devnet before deploying. Custom
                network wallets like Rabby can be stricter about when they allow
                chain add/switch requests.
              </p>
            )}

            {status === "error" && error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            {validationIssues.length > 0 && (
              <div className="flex flex-col gap-2">
                {validationIssues.some((issue) => issue.severity === "error") && (
                  <p className="text-sm font-medium text-red-600">
                    Validation failed — deployment was stopped.
                  </p>
                )}
                {validationIssues.map((issue, idx) => (
                  <div
                    key={idx}
                    className={`rounded-lg border p-3 text-sm ${
                      issue.severity === "error"
                        ? "border-red-200 bg-red-50 text-red-700"
                        : "border-amber-200 bg-amber-50 text-amber-700"
                    }`}
                  >
                    <span className="font-mono text-xs opacity-60">
                      {issue.code}
                    </span>{" "}
                    {issue.message}
                  </div>
                ))}
              </div>
            )}

            {status === "done" && <Results results={results} />}
          </TabsContent>

          <TabsContent value={ERC20_ACCOUNT_BALANCES_LENS.lensKey} />
        </Tabs>
      </main>
    </div>
  );
}
