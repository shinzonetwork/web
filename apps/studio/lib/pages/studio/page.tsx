"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { SearchInput } from "@shinzo/ui/search-input";
import { useAccount, useSendTransaction, useSwitchChain } from "wagmi";
import { Header } from "./header";
import { ConnectDialog } from "@/shared/ui/connect-dialog";
import { buildDeployTransaction } from "./deploy-view";
import { pollForView, queryTransfers, type TransferResult } from "./query-view";
import { Results } from "./results";
import { HOST_GRAPHQL_URL } from "@/shared/consts/envs";
import { shinzoDevnet } from "@/shared/wagmi";
import {
  VITALIK_ADDRESS,
  DEPLOYED_VIEW_KEY,
} from "@/shared/consts/view-config";

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

type DeployedView = {
  viewId: string;
  address: string;
  timestamp: number;
};

function loadDeployedView(): DeployedView | null {
  try {
    const raw = localStorage.getItem(DEPLOYED_VIEW_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore parse errors
  }
  return null;
}

function saveDeployedView(view: DeployedView): void {
  localStorage.setItem(DEPLOYED_VIEW_KEY, JSON.stringify(view));
}

export function StudioPage() {
  const { address: walletAddress, isConnected } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();
  const { switchChainAsync } = useSwitchChain();

  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<DeployStatus>("idle");
  const [error, setError] = useState("");
  const [results, setResults] = useState<TransferResult[]>([]);
  const [deployedView, setDeployedView] = useState<DeployedView | null>(null);

  // Load previously deployed view from localStorage
  useEffect(() => {
    setDeployedView(loadDeployedView());
  }, []);

  const isInProgress =
    status === "building" ||
    status === "deploying" ||
    status === "propagating" ||
    status === "querying";

  const handleSubmit = useCallback(async () => {
    if (!address.trim() || !isConnected || !walletAddress || isInProgress) {
      return;
    }

    setError("");
    setResults([]);

    try {
      // Step 1: Build the view bundle
      setStatus("building");
      const tx = await buildDeployTransaction(walletAddress);

      // Step 2: Switch to ShinzoHub chain and send the transaction
      setStatus("deploying");
      await switchChainAsync({ chainId: shinzoDevnet.id });
      await sendTransactionAsync({
        to: tx.to,
        data: tx.data,
        chainId: shinzoDevnet.id,
      });

      // Step 3: Save deployed view and poll for propagation
      const deployed: DeployedView = {
        viewId: tx.viewId,
        address: address.trim(),
        timestamp: Date.now(),
      };
      saveDeployedView(deployed);
      setDeployedView(deployed);

      setStatus("propagating");
      await pollForView(tx.viewId, HOST_GRAPHQL_URL);

      // Step 4: Query the transfers
      setStatus("querying");
      const data = await queryTransfers(
        tx.viewId,
        address.trim(),
        HOST_GRAPHQL_URL
      );
      setResults(data);
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
    switchChainAsync,
  ]);

  const handleRequery = useCallback(async () => {
    if (!deployedView || isInProgress) return;

    setError("");
    setResults([]);

    try {
      setStatus("querying");
      const data = await queryTransfers(
        deployedView.viewId,
        address.trim() || deployedView.address,
        HOST_GRAPHQL_URL
      );
      setResults(data);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
  }, [deployedView, address, isInProgress]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-12">
        {/* Title & description */}
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold text-szo-black">
            ERC-20 Transfers by Address
          </h2>
          <p className="text-sm leading-relaxed text-szo-black/60">
            This demo deploys a Shinzo View that uses the{" "}
            <span className="font-mono">decode_log</span> lens to decode raw
            Ethereum event logs. It filters transactions by a given address,
            finds ERC-20 Transfer events, and decodes them to reveal sender,
            receiver, and token contract. The view is registered on-chain to
            ShinzoHub and queried from a Shinzo Host.
          </p>
        </div>

        {/* Address input */}
        <div className="flex flex-col gap-3">
          <SearchInput
            placeholder="Enter Ethereum address (0x...)"
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
              onClick={() => setAddress(VITALIK_ADDRESS)}
              className="rounded-full border border-szo-border px-3 py-1 text-xs font-medium transition-colors hover:border-szo-black"
            >
              vitalik.eth
            </button>
            {isConnected && walletAddress && (
              <button
                type="button"
                onClick={() => setAddress(walletAddress)}
                className="rounded-full border border-szo-border px-3 py-1 text-xs font-medium transition-colors hover:border-szo-black"
              >
                My Wallet
              </button>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          {!isConnected ? (
            <ConnectDialog />
          ) : (
            <>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!address.trim() || isInProgress}
                className="flex items-center gap-2 border border-szo-black bg-szo-black px-5 py-2.5 text-sm font-medium text-szo-bg transition-colors hover:bg-szo-bg hover:text-szo-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isInProgress && <Loader2 className="size-4 animate-spin" />}
                {isInProgress ? STATUS_LABELS[status] : "Deploy & Query"}
              </button>
              {deployedView && status !== "querying" && (
                <button
                  type="button"
                  onClick={handleRequery}
                  disabled={isInProgress}
                  className="border border-szo-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-szo-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Re-query
                </button>
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
