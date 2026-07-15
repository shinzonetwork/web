"use client";

interface DeployNetworkNoticeProps {
  isConnected: boolean;
  isOnShinzo: boolean;
}

export const DeployNetworkNotice = ({
  isConnected,
  isOnShinzo,
}: DeployNetworkNoticeProps) =>
  isConnected && !isOnShinzo ? (
    <p className="text-sm text-amber-600">
      Switch your wallet to Shinzo before deploying. Custom network
      wallets like Rabby can be stricter about when they allow chain add/switch
      requests.
    </p>
  ) : null;
