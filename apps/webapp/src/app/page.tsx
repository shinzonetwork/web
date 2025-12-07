"use client";

import { useAccount } from "wagmi";

import { useRegistrationContext } from "@/entities";
import { Registration } from "@/page-components";
import WalletSignatureHandler from "@/features/wallet-signature/ui/wallet-signature-handler";

export default function LandingPage() {
  const { isConnected } = useAccount();
  const { isSignedWithWallet, isRegistered } = useRegistrationContext();
  console.log(isConnected, isSignedWithWallet, isRegistered);

  const isRegistrationVisible =
    isConnected && isSignedWithWallet && !isRegistered;
  return (
    <>
      <div>
        <p>
          The Shinzo webapp allows a user to interact with different parts of
          the Shinzo ecosystem.
        </p>
        {isConnected && !isSignedWithWallet && <WalletSignatureHandler />}
        {isRegistrationVisible && <Registration />}
      </div>
    </>
  );
}
