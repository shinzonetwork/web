import { useRegistrationContext } from "@/entities/registration-process";
import WalletSignatureHandler from "@/features/wallet-signature/ui/wallet-signature-handler";
import { DisconnectWallet } from "@/widget";
import { ConnectWallet } from "@/widget/connect-wallet";
import { useAccount } from "wagmi";

export function Connect() {
  const { isConnected } = useAccount();
  const { isSignedWithWallet } = useRegistrationContext();

  if (isConnected && isSignedWithWallet) {
    return (
      <div className="flex flex-row items-center justify-end">
        <DisconnectWallet />
      </div>
    );
  }
  return (
    <div>
      <ConnectWallet />
      {isConnected && !isSignedWithWallet && <WalletSignatureHandler />}
    </div>
  );
}
