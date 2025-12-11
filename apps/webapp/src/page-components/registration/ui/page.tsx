"use client";

import { useAccount } from "wagmi";

import { useRegistrationContext } from "@/entities/registration-process";
import WalletSignatureHandler from "@/features/wallet-signature/ui/wallet-signature-handler";
import { Registration } from "@/features/registration-form";
import { ConnectWallet } from "@/widget/connect-wallet";
import { FormHeader } from "@/widget/form-header";

export default function Register() {
  const { isConnected } = useAccount();
  const { isSignedWithWallet } = useRegistrationContext();

  return (
    <div className="my-12 flex flex-col gap-4">
      <FormHeader />
      <ConnectWallet />
      {isConnected && !isSignedWithWallet && <WalletSignatureHandler />}
      {isConnected && isSignedWithWallet && <Registration />}
    </div>
  );
}
