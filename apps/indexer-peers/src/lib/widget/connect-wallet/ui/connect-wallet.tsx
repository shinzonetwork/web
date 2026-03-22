"use client";

import { useIndexerContext } from "@/lib/context";
import { useAccount, useConnect } from "wagmi";

type ConnectWalletProps = {
  title: string;
};

function addressFromConnectAccounts(
  accounts: readonly unknown[],
): string | undefined {
  const first = accounts[0];
  if (typeof first === "string") return first;
  if (
    first &&
    typeof first === "object" &&
    "address" in first &&
    typeof (first as { address: unknown }).address === "string"
  ) {
    return (first as { address: string }).address;
  }
  return undefined;
}

export function ConnectWallet({ title }: ConnectWalletProps) {
  const { isConnected, address } = useAccount();
  const { isSignedWithWallet, isIndexerFormOpen, showIndexerForm } =
    useIndexerContext();

  const { connect, connectors } = useConnect({
    mutation: {
      onSuccess(data) {
        const connectedAddress = addressFromConnectAccounts(data.accounts);
        if (connectedAddress && isSignedWithWallet) {
          showIndexerForm(true);
        }
      },
    },
  });

  const handleConnect = () => {
    if (!isConnected || !address) {
      const connector =
        connectors.find((c) => c.id === "injected" && c.type === "injected") ??
        connectors[0];
      if (connector) connect({ connector });
      return;
    }

    // Connected and already signed: same click opens the indexer form
    if (isConnected && isSignedWithWallet) {
      showIndexerForm(true);
    }
  };

  return (
    <div className="my-2">
      {!isIndexerFormOpen && (
        <button
          onClick={handleConnect}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
        >
          {title}
        </button>
      )}
    </div>
  );
}
