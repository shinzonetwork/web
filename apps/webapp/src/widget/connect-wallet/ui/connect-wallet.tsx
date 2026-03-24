"use client";

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
        onClick={() => connect({ connector: injected() })}
        className="ml-2 w-fit rounded-md  bg-primary text-primary-foreground"
      >
        Connect
      </Button>
    </div>
  );
}
