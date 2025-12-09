"use client";

import { Button } from "@/shared/ui/button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export function ConnectWallet() {
  const { openConnectModal } = useConnectModal();
  const { isConnected, address } = useAccount();

  if (isConnected && address) {
    return null;
  }
  return (
    <div className="my-2">
      <Button onClick={openConnectModal} className="w-1/12 rounded-full">
        Connect Wallet
      </Button>
    </div>
  );
}
