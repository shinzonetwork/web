"use client";

import { useAccountModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ChevronDown } from "lucide-react";

import { useRegistrationContext } from "@/entities";
import { shortenAddress } from "@/shared/lib";
import { Button } from "@/shared/ui/button";

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
          {shortenAddress(address ? address : undefined)}
          <ChevronDown className="w-4 h-4" />
        </Button>
      )}
    </>
  );
}
