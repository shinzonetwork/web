"use client";

import { useRegistrationContext } from "@/entities";
import { shortenAddress } from "@/shared/lib";
import { Button } from "@/shared/ui/button";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { ChevronDown } from "lucide-react";
import { Hex } from "viem";
import { useAccount } from "wagmi";

export function DisconnectWallet() {
  const { openAccountModal } = useAccountModal();
  const { isConnected, address } = useAccount();
  const { handleRegisterFormVisibility } = useRegistrationContext();

  const handleDisconnectWallet = () => {
    handleRegisterFormVisibility(false);
    openAccountModal?.();
  };
  return (
    <>
      {isConnected && address && (
        <Button
          variant="link"
          onClick={handleDisconnectWallet}
          className="ml-auto"
        >
          {shortenAddress(address ? (address as Hex) : undefined)}
          <ChevronDown className="w-4 h-4" />
        </Button>
      )}
    </>
  );
}
