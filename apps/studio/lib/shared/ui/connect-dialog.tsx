"use client";

import { Loader2, Wallet } from "lucide-react";
import { useCallback, useState } from "react";
import { type Connector, useAccount, useConnect, useDisconnect } from "wagmi";

export function ConnectDialog() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = useCallback(
    (connector: Connector) => {
      setIsOpen(false);
      connect({ connector });
    },
    [connect]
  );

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const availableConnectors = connectors.filter((c) => c.id !== "injected");

  if (isConnecting) {
    return (
      <button
        type="button"
        disabled
        className="flex items-center gap-2 rounded-none border border-szo-border bg-szo-bg px-4 py-2 text-sm font-medium opacity-60"
      >
        <Loader2 className="size-4 animate-spin" />
        Connecting...
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <button
        type="button"
        onClick={handleDisconnect}
        className="rounded-none border border-szo-border bg-szo-bg px-4 py-2 text-sm font-medium transition-colors hover:border-szo-black"
      >
        {address.slice(0, 6)}...{address.slice(-4)}
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-none border border-szo-black bg-szo-black px-4 py-2 text-sm font-medium text-szo-bg transition-colors hover:bg-szo-bg hover:text-szo-black"
      >
        <Wallet className="size-4" />
        Connect Wallet
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-szo-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-10 w-full max-w-sm border border-szo-border bg-szo-bg p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Connect Wallet</h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-szo-border transition-colors hover:text-szo-black"
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {availableConnectors.map((connector) => (
                <button
                  key={connector.uid}
                  type="button"
                  onClick={() => handleConnect(connector)}
                  className="flex items-center gap-3 border border-szo-border p-3 text-left transition-colors hover:border-szo-black"
                >
                  <div className="flex size-8 items-center justify-center overflow-hidden">
                    {connector.icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={connector.icon}
                        alt={connector.name}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    ) : (
                      <Wallet className="size-5" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{connector.name}</span>
                </button>
              ))}
              {availableConnectors.length === 0 && (
                <p className="py-4 text-center text-sm text-szo-border">
                  No wallets available
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
