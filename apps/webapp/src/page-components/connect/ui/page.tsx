"use client";

import { useRegistrationContext } from "@/entities";
import WalletSignatureHandler from "@/features/wallet-signature/ui/wallet-signature-handler";
import { ConnectWallet, DisconnectWallet } from "@/widget";
import { useAccount } from "wagmi";

export function Connect() {
  const { isConnected } = useAccount();
  const { isSignedWithWallet } = useRegistrationContext();

  if (isConnected && isSignedWithWallet) {
    return (
      <div className="flex flex-row items-center justify-end">
        <DisconnectWallet />
      </div>
    );
  }
  return (
    <div>
      <ConnectWallet />
      {isConnected && !isSignedWithWallet && <WalletSignatureHandler />}
    </div>
  );
}
