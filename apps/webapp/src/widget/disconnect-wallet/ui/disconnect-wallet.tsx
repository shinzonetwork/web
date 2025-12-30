"use client";

import { useAccount, useDisconnect } from "wagmi";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";

import { useRegistrationContext } from "@/entities";
import { shortenAddress, TOAST_CONFIG } from "@/shared/lib";
import { Button } from "@/shared/ui/button";

export function DisconnectWallet() {
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();

  const { handleRegisterFormVisibility } = useRegistrationContext();

  const handleDisconnectWallet = () => {
    handleRegisterFormVisibility(false);
    disconnect();
  };

  const handleCopyAddress = async () => {
    if (!address) return;

    try {
      await navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard!", TOAST_CONFIG);
    } catch (error) {
      toast.error("Failed to copy address", TOAST_CONFIG);
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
    }
  };

  return (
    <>
      {isConnected && address && (
        <div className="my-2 gap-4">
          <button
            onClick={handleCopyAddress}
            className="font-mono text-sm underline hover:text-[#D32C34] cursor-pointer transition-colors"
            type="button"
            title="Click to copy address"
          >
            <div className="flex items-center gap-1">
              {shortenAddress(address)}
              <Copy className="w-4 h-4" />
            </div>
          </button>
          <Button
            onClick={handleDisconnectWallet}
            className="ml-4 w-fit rounded-full"
          >
            Disconnect Wallet
          </Button>
        </div>
      )}
    </>
  );
}
