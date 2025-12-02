"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { useProfile } from "@/hooks/useProfile";
import { useRegistrationContext } from "@/hooks/useRegistrationContext";
import WalletSignatureHandler from "./wallet-signature-handler";

/**
 * Handler that fetches profile from GCS when wallet connects
 * and updates the store with signed and registered status
 */
export function WalletProfileHydrator() {
  const [isHydrated, setIsHydrated] = useState(false);
  const { address, isConnected } = useAccount();
  const { fetchUserStatus } = useProfile();
  const {
    isSignedWithWallet,
    isRegistered,
    isProfileCompleted,
    setProfileCompleted,
    setRegistered,
    setSignedWithWallet,
  } = useRegistrationContext();

  const hasFetchedRef = useRef<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (isHydrated) {
        return;
      }

      // Skip if wallet not connected or no address
      if (!isConnected || !address) {
        hasFetchedRef.current = null;
        return;
      }

      // Skip if we already fetched for this address
      if (hasFetchedRef.current === address) {
        return;
      }

      try {
        // Fetch profile from GCS
        const userStatus = await fetchUserStatus(address);

        if (userStatus) {
          if (userStatus.signedWithWallet && !isSignedWithWallet) {
            setSignedWithWallet(userStatus.signedWithWallet);
          }
          if (userStatus.registered && !isRegistered) {
            setRegistered(userStatus.registered);
          }
          if (userStatus.profileCompleted && !isProfileCompleted) {
            setProfileCompleted(userStatus.profileCompleted);
          }
        }

        // Mark as fetched for this address
        hasFetchedRef.current = address;
        setIsHydrated(true);
      } catch (error) {
        console.error("Error loading profile from GCS:", error);
      }
    };

    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isConnected,
    address,
    fetchUserStatus,
    isSignedWithWallet,
    isRegistered,
    setIsHydrated,
    setProfileCompleted,
    setRegistered,
    setSignedWithWallet,
  ]);

  return <>{isHydrated && !isSignedWithWallet && <WalletSignatureHandler />}</>;
}
