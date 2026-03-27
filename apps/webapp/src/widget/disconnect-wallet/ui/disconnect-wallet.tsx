"use client";

import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/shared/ui/button";

export function DisconnectWallet() {
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();

  const handleDisconnectWallet = () => {
    disconnect();
  };

  return (
    <>
      {isConnected && address && (
        <div className="gap-4">
          <Button
            onClick={handleDisconnectWallet}
            className="ml-4 w-fit rounded-md bg-muted-foreground text-muted hover:bg-muted-foreground/90"
          >
            Disconnect
          </Button>
        </div>
      )}
    </>
  );
}
