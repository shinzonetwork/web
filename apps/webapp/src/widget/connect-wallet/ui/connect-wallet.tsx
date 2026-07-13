"use client";

import { shinzoHubTestnet } from "@shinzo/shinzohub";
import { Button } from "@/shared/ui/button";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export function ConnectWallet() {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();

  if (isConnected && address) {
    return null;
  }
  return (
    <div>
      <Button
        onClick={() =>
          connect({ connector: injected(), chainId: shinzoHubTestnet.id })
        }
        className="ml-2 w-fit rounded-none  bg-muted-foreground text-muted hover:bg-muted-foreground/90"
      >
        Connect
      </Button>
    </div>
  );
}
