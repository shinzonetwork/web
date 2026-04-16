"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { SearchInput } from "@shinzo/ui/search-input";
import { useAccount, useSendTransaction, useSwitchChain } from "wagmi";
import { Header } from "./header";
import { ConnectDialog } from "@/shared/ui/connect-dialog";
import { type Erc20TransferResult } from "./query-view";
import { Results } from "./results";
import { HOST_GRAPHQL_PROXY_PATH } from "@/shared/consts/envs";
import { shinzoDevnet } from "@/shared/wagmi";
import {
  USDC_TOKEN_ADDRESS,
  USDT_TOKEN_ADDRESS,
} from "@/shared/consts/view-config";
import { Button } from "@/shared/button";
import {
  appendStoredDeployedView,
  loadStoredDeployedViews,
  type StoredDeployedView,
} from "./deployed-views-storage";
import {
  ERC20_TRANSFER_LENS,
  isStudioSupportedLens,
  type TokenAddressLensArgs,
} from "./lens-catalog";
import {
  StoredViewsPanel,
  type StoredCallState,
} from "./stored-views-panel";
import {
  callStoredLensView,
  deployAndQueryLens,
  requeryLens,
} from "./studio-actions";

type DeployStatus =
  | "idle"
  | "building"
  | "deploying"
  | "propagating"
  | "querying"
  | "done"
  | "error";

const STATUS_LABELS: Record<DeployStatus, string> = {
  idle: "",
  building: "Building view bundle...",
  deploying: "Deploying to ShinzoHub...",
  propagating: "Waiting for host propagation...",
  querying: "Querying transfers...",
  done: "",
  error: "",
};

export function StudioPage() {
  const { address: walletAddress, isConnected } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();
  const { switchChainAsync } = useSwitchChain();

  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<DeployStatus>("idle");
  const [error, setError] = useState("");
  const [results, setResults] = useState<Erc20TransferResult[]>([]);
  const [storedViews, setStoredViews] = useState<StoredDeployedView[]>([]);
  const [storedCallState, setStoredCallState] = useState<StoredCallState>({
    status: "idle",
  });

  useEffect(() => {
    setStoredViews(loadStoredDeployedViews());
  }, []);

  const isInProgress =
    status === "building" ||
    status === "deploying" ||
    status === "propagating" ||
    status === "querying";

  const latestDeployedView =
    storedViews.find((view) => view.lensKey === ERC20_TRANSFER_LENS.lensKey) ??
    null;
  const visibleStoredViews = storedViews.filter((view) =>
    isStudioSupportedLens(view.lensKey)
  );

  const handleSubmit = useCallback(async () => {
    if (!address.trim() || !isConnected || !walletAddress || isInProgress) {
      return;
    }

    const runtimeArgs: TokenAddressLensArgs = {
      tokenAddress: address.trim().toLowerCase(),
    };

    setError("");
    setResults([]);

    try {
      setStatus("building");
      const { deployedView, payload } = await deployAndQueryLens({
        senderAddress: walletAddress,
        lens: ERC20_TRANSFER_LENS,
        args: runtimeArgs,
        chainId: shinzoDevnet.id,
        hostUrl: HOST_GRAPHQL_PROXY_PATH,
        switchChainAsync,
        sendTransactionAsync,
        onStatusChange: setStatus,
      });

      setStoredViews(appendStoredDeployedView(deployedView));
      setResults(
        Array.isArray(payload) ? (payload as Erc20TransferResult[]) : []
      );
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
  }, [
    address,
    isConnected,
    walletAddress,
    isInProgress,
    sendTransactionAsync,
    setStoredViews,
    switchChainAsync,
  ]);

  const handleRequery = useCallback(async () => {
    if (!latestDeployedView || isInProgress) return;

    setError("");
    setResults([]);

    try {
      setStatus("querying");
      const payload = await requeryLens({
        lens: ERC20_TRANSFER_LENS,
        viewName: latestDeployedView.viewName,
        args: latestDeployedView.args as TokenAddressLensArgs,
        hostUrl: HOST_GRAPHQL_PROXY_PATH,
      });
      setResults(
        Array.isArray(payload) ? (payload as Erc20TransferResult[]) : []
      );
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
  }, [latestDeployedView, isInProgress]);

  const handleStoredCall = useCallback(async (view: StoredDeployedView) => {
    setStoredCallState({
      status: "loading",
      viewName: view.viewName,
    });

    try {
      const { payload } = await callStoredLensView({
        view,
        hostUrl: HOST_GRAPHQL_PROXY_PATH,
      });
      setStoredCallState({
        status: "success",
        viewName: view.viewName,
        payload,
      });
    } catch (err) {
      setStoredCallState({
        status: "error",
        viewName: view.viewName,
        error: err instanceof Error ? err.message : "Unexpected error",
      });
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-12">
        <StoredViewsPanel
          storedViews={visibleStoredViews}
          callState={storedCallState}
          onCall={handleStoredCall}
        />

        {/* Title & description */}
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold text-szo-black">
            {ERC20_TRANSFER_LENS.title}
          </h2>
          <p className="text-sm leading-relaxed text-szo-black/60">
            {ERC20_TRANSFER_LENS.description} Deploy a view for a specific
            token contract, then re-query it from a Shinzo Host after
            propagation.
          </p>
        </div>

        {/* Address input */}
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

          {/* Badge buttons */}
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

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          {!isConnected ? (
            <ConnectDialog />
          ) : (
            <>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!address.trim() || isInProgress}
                className="gap-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isInProgress && <Loader2 className="size-4 animate-spin" />}
                {isInProgress ? STATUS_LABELS[status] : "Deploy & Query"}
              </Button>
              {latestDeployedView && status !== "querying" && (
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

        {/* Error */}
        {status === "error" && error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {/* Results */}
        {status === "done" && <Results results={results} />}
      </main>
    </div>
  );
}
