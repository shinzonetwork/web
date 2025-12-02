"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import { useRegistrationContext } from "@/hooks/useRegistrationContext";
import { WalletProfileHydrator } from "@/components/handlers/wallet-profile-hydrator";

export default function LandingPage() {
  const { isConnected } = useAccount();
  const { isSignedWithWallet, isRegistered, isProfileCompleted } =
    useRegistrationContext();
  const router = useRouter();

  useEffect(() => {
    if (
      isConnected &&
      isSignedWithWallet &&
      (!isRegistered || !isProfileCompleted)
    ) {
      router.replace("/registration");
    } else {
      router.replace("/");
    }
  }, [
    isConnected,
    router,
    isSignedWithWallet,
    isRegistered,
    isProfileCompleted,
  ]);

  return (
    <>
      {isConnected && <WalletProfileHydrator />}
      <div>
        <p>
          The Shinzo webapp allows a user to interact with different parts of
          the Shinzo ecosystem.
        </p>
      </div>
    </>
  );
}
