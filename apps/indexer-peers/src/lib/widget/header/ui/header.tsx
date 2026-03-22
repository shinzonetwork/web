"use client";

import { useAccount } from "wagmi";
import { ConnectWallet } from "../../connect-wallet/ui/connect-wallet";
import WalletSignatureHandler from "@/lib/pages/wallet-signature/ui/wallet-signature-handler";
import { useIndexerContext } from "@/lib/context";

export function Header() {
  const { isConnected } = useAccount();
  const { isSignedWithWallet } = useIndexerContext();

  return (
    <header className="flex justify-between items-center mb-4 mt-8">
      <h1 className="text-2xl font-bold mb-2">Devnet Indexers</h1>
      <ConnectWallet title="Join Devnet" />
      {isConnected && !isSignedWithWallet && <WalletSignatureHandler />}
    </header>
  );
}
