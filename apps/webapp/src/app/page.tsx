"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import useShinzoStore from "@/store/store";
import WalletSignatureHandler from "@/components/handlers/wallet-signature-handler";

export default function LandingPage() {
  const { isConnected } = useAccount();
  const { signedWithWallet, registered, profileCompleted } = useShinzoStore();
  const router = useRouter();

  useEffect(() => {
    if (isConnected && signedWithWallet && !(registered || profileCompleted)) {
      router.replace("/registration");
    } else {
      router.replace("/");
    }
  }, [isConnected, router, signedWithWallet, registered, profileCompleted]);

  return (
    <>
      {isConnected && !signedWithWallet && <WalletSignatureHandler />}
      <div>
        <p>
          The Shinzo webapp allows a user to interact with different parts of
          the Shinzo ecosystem.
        </p>
      </div>
    </>
  );
}
