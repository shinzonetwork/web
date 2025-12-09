"use client";

import { shortenAddress } from "@/shared/lib";
import { Button } from "@/shared/ui/button";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { ChevronDown } from "lucide-react";
import { useAccount } from "wagmi";

export function DisconnectWallet() {
  const { openAccountModal } = useAccountModal();
  const { isConnected, address } = useAccount();

  return (
    <>
      {isConnected && address && (
        <Button variant="link" onClick={openAccountModal} className="ml-auto">
          {shortenAddress(address as string)}
          <ChevronDown className="w-4 h-4" />
        </Button>
      )}
    </>
  );
}
