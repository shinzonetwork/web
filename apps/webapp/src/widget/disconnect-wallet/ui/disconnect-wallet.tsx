"use client";

import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { shortenAddress } from "@/shared/lib";

export function DisconnectWallet() {
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();

  if (!isConnected || !address) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="link"
          className="ml-4 w-fit rounded-none text-muted-foreground hover:text-muted-foreground/90"
        >
          {shortenAddress(address)}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto space-y-3 rounded-none">
        <p className="font-mono text-sm text-muted-foreground">
          Disconnect this wallet?
        </p>
        <div className="flex justify-end gap-2">
          <Button
            variant="default"
            className="rounded-none bg-muted-foreground hover:bg-muted-foreground/90"
            onClick={() => disconnect()}
          >
            Confirm
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
