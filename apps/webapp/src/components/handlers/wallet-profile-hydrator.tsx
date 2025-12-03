"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { useStoredProfile } from "@/hooks/useStoredProfile";
import { useRegistrationContext } from "@/hooks/useRegistrationContext";
import WalletSignatureHandler from "./wallet-signature-handler";

/**
 * Handler that fetches profile from GCS when wallet connects
 * and updates the store with signed and registered status
 */
export function WalletProfileHydrator() {
  const [isHydrated, setIsHydrated] = useState(false);
  const { address, isConnected } = useAccount();
  const { fetchUserStatus } = useStoredProfile();
  const {
    isSignedWithWallet,
    isRegistered,
    isProfileCompleted,
    setProfileCompleted,
    setRegistered,
    setSignedWithWallet,
  } = useRegistrationContext();

  const fetchedAddressRef = useRef<string | null>(null);

  // Reset hydration state when address changes
  useEffect(() => {
    if (
      address &&
      fetchedAddressRef.current &&
      fetchedAddressRef.current !== address
    ) {
      setIsHydrated(false);
      fetchedAddressRef.current = null;
    }
  }, [address]);

  useEffect(() => {
    // Skip if already hydrated
    if (isHydrated) {
      return;
    }

    // Skip if wallet not connected or no address
    if (!isConnected || !address) {
      fetchedAddressRef.current = null;
      return;
    }

    // Skip if we already fetched for this address - to avoid multiple requests for same address
    if (fetchedAddressRef.current === address) {
      return;
    }

    fetchedAddressRef.current = address;

    const loadProfile = async () => {
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

        setIsHydrated(true);
      } catch (error) {
        console.error("Error loading profile from GCS:", error);
        // Reset on error so it can retry
        fetchedAddressRef.current = null;
      }
    };

    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);

  return <>{isHydrated && !isSignedWithWallet && <WalletSignatureHandler />}</>;
}
