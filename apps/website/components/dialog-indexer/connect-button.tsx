"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import WalletConnectIcon from "../svg/walletconnect.svg";
import { Info, Loader2, Wallet } from "lucide-react";
import { useState } from "react";
import { Connector, useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";

const SIGN_MESSAGE =
  "I confirm that I am the owner of this wallet and want to become an Indexer on Shinzo Network.";

interface WalletConnectButtonProps {
  onSuccess: (address: string, signature: string) => void;
  onDisconnect: () => void;
}

export function ConnectButton({
  onSuccess,
  onDisconnect,
}: WalletConnectButtonProps) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync, isPending: isSigning } = useSignMessage();

  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter out injected connector and get available connectors
  const availableConnectors = connectors.filter((c) => c.id !== "injected");

  const handleConnect = async (connector: Connector) => {
    setError(null);
    setIsModalOpen(false);

    connect(
      { connector },
      {
        onSuccess: async (data) => {
          const connectedAddress = data.accounts[0];

          try {
            const signature = await signMessageAsync({
              message: SIGN_MESSAGE,
            });

            onSuccess(connectedAddress, signature);
          } catch {
            setError("Message signing was cancelled or failed");
            disconnect();
          }
        },
        onError: () => {
          setError("Failed to connect wallet");
        },
      }
    );
  };

  const handleDisconnect = () => {
    disconnect();
    onDisconnect();
    setError(null);
  };

  const getConnectorIcon = (connector: Connector) => {
    // WalletConnect icon
    if (connector.id === "walletConnect") {
      return <WalletConnectIcon className="size-6" />;
    }

    // Use connector's icon if available
    if (connector.icon) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={connector.icon}
          alt={connector.name}
          width={24}
          height={24}
          className="object-contain"
        />
      );
    }

    // Fallback icon
    return <Wallet className="size-5 text-szo-gray" />;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end">
        {isConnected && address ? (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleDisconnect}
            className="text-xs"
          >
            Disconnect
          </Button>
        ) : isConnecting || isSigning ? (
          <Button type="button" size="sm" disabled className="gap-1">
            <Loader2 className="size-3 animate-spin" />
            {isSigning ? "Sign message..." : "Connecting..."}
          </Button>
        ) : (
          <>
            <Button
              type="button"
              size="sm"
              className="gap-1"
              onClick={() => setIsModalOpen(true)}
            >
              <Wallet className="size-3" />
              Connect
            </Button>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Connect Wallet</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3 py-4">
                  {availableConnectors.map((connector) => (
                    <div key={connector.uid} className="relative group">
                      <button
                        type="button"
                        onClick={() => handleConnect(connector)}
                        className={cn(
                          "relative flex items-center gap-3 w-full p-4 bg-white border-2 border-szo-border-light text-left",
                          "transition-all duration-300",
                          "hover:border-szo-primary focus:border-szo-primary",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-szo-primary focus-visible:ring-offset-2"
                        )}
                      >
                        <div className="size-10 rounded-md overflow-hidden border border-szo-border-light bg-white flex items-center justify-center shrink-0">
                          {getConnectorIcon(connector)}
                        </div>
                        <span className="font-mono text-px-14">/ {connector.name}</span>
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
                    <p className="text-center text-szo-gray py-4">
                      No wallets available
                    </p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
      {error && (
        <div className="text-szo-primary font-mono text-sm font-normal flex items-center gap-2">
          <Info className="size-4" />
          {error}
        </div>
      )}
    </div>
  );
}
