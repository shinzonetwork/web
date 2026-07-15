"use client";

import { Loader2, Wallet } from "lucide-react";
import { useCallback, useState } from "react";
import {
  type Connector,
  useConnect,
  useConnection,
  useConnectors,
  useDisconnect,
} from "wagmi";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import WalletConnectIcon from "./walletconnect.svg";
import { cn } from "@shinzo/ui/cn";

export const ConnectDialog = () => {
  const { address, isConnected } = useConnection();
  const {
    mutateAsync: connectAsync,
    error: connectError,
    isPending: isConnecting,
  } = useConnect();
  const connectors = useConnectors();
  const { mutate: disconnect } = useDisconnect();

  const [isOpen, setIsOpen] = useState(false);
  const [pendingConnectorUid, setPendingConnectorUid] = useState<string | null>(
    null
  );

  const handleConnect = useCallback(
    async (connector: Connector) => {
      setPendingConnectorUid(connector.uid);
      try {
        await connectAsync({ connector });
        setIsOpen(false);
      } catch {
        // The mutation exposes the error in the open dialog.
      } finally {
        setPendingConnectorUid(null);
      }
    },
    [connectAsync]
  );

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const availableConnectors = connectors.filter((c) => c.id !== "injected");

  const getConnectorIcon = useCallback((connector: Connector) => {
    if (connector.id === "walletConnect") {
      return <WalletConnectIcon className="size-6" />;
    }

    if (connector.icon) {
      return (
        <img
          src={connector.icon}
          alt={connector.name}
          width={24}
          height={24}
          className="object-contain"
        />
      );
    }

    return <Wallet className="size-5 text-szo-black/50" />;
  }, []);

  if (isConnected && address) {
    return (
      <Button
        type="button"
        onClick={handleDisconnect}
        variant="secondary"
        className="min-w-[10.5rem]"
      >
        {address.slice(0, 6)}...{address.slice(-4)}
      </Button>
    );
  }

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        <Wallet className="size-4" />
        Connect Wallet
      </Button>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!isConnecting) setIsOpen(open);
        }}
      >
        <DialogContent className="w-[min(calc(100dvw-2rem),900px)] px-6 py-8 md:px-10 md:py-10 lg:px-16 lg:py-14">
          <DialogHeader>
            <DialogTitle id="studio-connect-wallet-title">
              Connect Wallet
            </DialogTitle>
          </DialogHeader>

          <div className="relative flex max-h-[75vh] h-full flex-col gap-3 overflow-y-auto overflow-x-hidden py-3">
            <div className="pointer-events-none sticky -top-3 left-0 z-10 -mb-6 h-6 w-full shrink-0 bg-gradient-to-t from-transparent to-white" />

            {availableConnectors.map((connector) => (
              <div key={connector.uid} className="relative group">
                <button
                  type="button"
                  onClick={() => void handleConnect(connector)}
                  disabled={isConnecting}
                  className={cn(
                    "relative flex w-full items-center gap-3 border-2 border-ui-border bg-white p-4 text-left",
                    "transition-all duration-300",
                    "hover:border-szo-primary focus:border-szo-primary",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-szo-primary focus-visible:ring-offset-2"
                  )}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-ui-border bg-white">
                    {getConnectorIcon(connector)}
                  </div>
                  <span className="font-mono text-sm">/ {connector.name}</span>
                  {pendingConnectorUid === connector.uid && (
                    <Loader2 className="ml-auto size-4 animate-spin" />
                  )}
                </button>

                {/* Pattern background on hover */}
                <div
                  className={cn(
                    "bg-[url('/bg-pattern.png')] bg-repeat-y bg-no-repeat-x bg-right absolute inset-0 translate-0 -z-1 opacity-0",
                    "group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 group-hover:translate-1 group-focus-within:translate-1"
                  )}
                />
              </div>
            ))}

            {availableConnectors.length === 0 && (
              <p className="py-4 text-center font-mono text-sm text-szo-black/50">
                No wallets available
              </p>
            )}

            {connectError && (
              <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {connectError.message}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
