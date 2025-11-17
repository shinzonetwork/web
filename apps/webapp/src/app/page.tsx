"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import useShinzoStore from "@/store/store";
import WalletSignatureHandler from "@/components/handlers/wallet-signature-handler";

export default function LandingPage() {
  const { isConnected } = useAccount();
  const { profileCompleted, registered, signedWithWallet } = useShinzoStore();
  const router = useRouter();

  useEffect(() => {
    if (isConnected && signedWithWallet) {
      if (!registered && !profileCompleted) {
        router.replace("/registration/configuration");
      } else if (registered && !profileCompleted) {
        router.replace("/registration/profile");
      } else if (registered && profileCompleted) {
        router.replace("/dashboard");
      }
    } else {
      router.replace("/");
    }
  }, [isConnected, registered, profileCompleted, router, signedWithWallet]);

  return (
    <>
      {(isConnected && !signedWithWallet) && <WalletSignatureHandler />}
      <div>
        <p>
          The Shinzo webapp allows a user to interact with different parts of
          the Shinzo ecosystem.
        </p>
      </div>
    </>
  );
}
