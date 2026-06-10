"use client";

interface DeployNetworkNoticeProps {
  isConnected: boolean;
  isOnShinzoDevnet: boolean;
}

export const DeployNetworkNotice = ({
  isConnected,
  isOnShinzoDevnet,
}: DeployNetworkNoticeProps) =>
  isConnected && !isOnShinzoDevnet ? (
    <p className="text-sm text-amber-600">
      Switch your wallet to Shinzo Devnet before deploying. Custom network
      wallets like Rabby can be stricter about when they allow chain add/switch
      requests.
    </p>
  ) : null;
