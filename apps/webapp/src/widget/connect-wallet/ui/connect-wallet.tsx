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
    <div className="my-2">
      <Button
        onClick={() => connect({ connector: injected() })}
        className="w-fit rounded-full"
      >
        Connect Wallet
      </Button>
    </div>
  );
}
