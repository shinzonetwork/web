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
import {
  HOST_GRAPHQL_REQUEST_URL,
  SHINZOHUB_LCD_URL,
} from "@/shared/consts/envs";
import { shinzoDevnet } from "@/shared/wagmi";
import {
  TOP_ETHEREUM_ERC20_TOKEN_PRESETS,
  normalizeErc20TokenAddress,
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
import { StoredViewsPanel } from "./stored-views-panel";
import type { ValidationIssue } from "@shinzo/lenses/validate";
import { deployLens, ViewValidationError } from "./studio-actions";

type DeployStatus =
  | "idle"
  | "checking"
  | "validating"
  | "deploying"
  | "confirming"
  | "done"
  | "error";

const STATUS_LABELS: Record<DeployStatus, string> = {
  idle: "",
  checking: "Checking ShinzoHub for an existing registration...",
  validating: "Validating view definition...",
  deploying: "Sending deployment transaction...",
  confirming: "Waiting for deployment confirmation...",
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
  const [storedViews, setStoredViews] = useState<StoredDeployedView[]>([]);
  const [lastSavedView, setLastSavedView] = useState<StoredDeployedView | null>(
    null
  );
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>(
    []
  );

  useEffect(() => {
    setStoredViews(loadStoredDeployedViews());
  }, []);

  const isInProgress =
    status === "checking" ||
    status === "validating" ||
    status === "deploying" ||
    status === "confirming";
  const isOnShinzoDevnet = activeChainId === shinzoDevnet.id;

  const normalizedAddress = normalizeErc20TokenAddress(address);
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
    setLastSavedView(null);
    setValidationIssues([]);

    try {
      const { deployedView, validationWarnings } = await deployLens({
        lens: ERC20_TRANSFER_LENS,
        args: runtimeArgs,
        account: walletAddress as Address,
        chainId: shinzoDevnet.id,
        hubUrl: SHINZOHUB_LCD_URL,
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
      setLastSavedView(deployedView);
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
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-szo-black">
                {ERC20_TRANSFER_LENS.title}
              </h2>
              <p className="text-sm leading-relaxed text-szo-black/60">
                {ERC20_TRANSFER_LENS.description} Deploy a view for a specific
                token contract, register it on ShinzoHub, then call it later
                from Stored Deployments after host propagation.
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

              <div className="flex flex-wrap gap-2">
                {TOP_ETHEREUM_ERC20_TOKEN_PRESETS.map((token) => (
                  <button
                    key={token.address}
                    type="button"
                    onClick={() => setAddress(token.address)}
                    title={`${token.name} (${token.symbol})`}
                    className="rounded-full border border-szo-border px-3 py-1 text-xs font-medium transition-colors hover:border-szo-black"
                  >
                    {token.symbol}
                  </button>
                ))}
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
                    disabled={!normalizedAddress || isInProgress || !isOnShinzoDevnet}
                    className="gap-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isInProgress && (
                      <Loader2 className="size-4 animate-spin" />
                    )}
                    {isInProgress ? STATUS_LABELS[status] : "Deploy"}
                  </Button>
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

            {status === "done" && lastSavedView && (
              <p className="text-sm text-szo-black/60">
                Saved <span className="font-mono">{lastSavedView.entityName}</span> to
                Stored Deployments. Call it there once the host has propagated
                the view.
              </p>
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

            <StoredViewsPanel
              storedViews={visibleStoredViews}
              hostUrl={HOST_GRAPHQL_REQUEST_URL}
            />
          </TabsContent>

          <TabsContent value={ERC20_ACCOUNT_BALANCES_LENS.lensKey} />
        </Tabs>
      </main>
    </div>
  );
}
