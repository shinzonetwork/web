"use client";

import { useState, useCallback, ReactNode, useMemo } from "react";
import { useAccount } from "wagmi";
import { RegistrationContext as RegistrationContextType } from "./types";
import { RegistrationContext } from "./registration-context";
import { isWalletSigned, setWalletSigned } from "@/shared/lib";

/**
 * The provider for the registration context.
 */
export const RegistrationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { address, isConnected } = useAccount();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);

  // Track manual updates separately from localStorage reads
  const [manualSignedState, setManualSignedState] = useState<
    Record<string, boolean>
  >({});

  // Cache localStorage reads per address
  // Store as state to avoid ref access during render
  const [localStorageCache, setLocalStorageCache] = useState<
    Record<string, boolean>
  >({});

  const isSignedWithWallet = useMemo(() => {
    if (!isConnected || !address) {
      return false;
    }

    // Check if manually set (user action)
    if (address in manualSignedState) {
      return manualSignedState[address];
    }

    // Use cached value if available
    if (address in localStorageCache) {
      return localStorageCache[address];
    }

    // Cache miss - read from localStorage directly,only happens once per address change
    const signed = isWalletSigned(address);

    // Update cache asynchronously to avoid setState during render warning
    setTimeout(() => {
      setLocalStorageCache((prev) => {
        if (!(address in prev) && signed) {
          return { ...prev, [address]: signed };
        }
        return prev;
      });
    }, 0);

    return signed;
  }, [isConnected, address, manualSignedState, localStorageCache]);

  const handleSetSignedWithWallet = useCallback(
    (signed: boolean) => {
      if (!address) return;

      // Update manual state
      setManualSignedState((prev) => ({ ...prev, [address]: signed }));
      // Update cache to reflect the new state
      setLocalStorageCache((prev) => ({ ...prev, [address]: signed }));
      // Persist to localStorage for future sessions
      setWalletSigned(address, signed);
    },
    [address]
  );

  const context: RegistrationContextType = useMemo(() => {
    return {
      isRegistered,
      isSignedWithWallet,
      showRegisterForm,
      setRegistered: (registered: boolean) => setIsRegistered(registered),
      handleSignedWithWallet: handleSetSignedWithWallet,
      handleRegisterFormVisibility: (visible: boolean) =>
        setShowRegisterForm(visible),
    };
  }, [
    isRegistered,
    isSignedWithWallet,
    showRegisterForm,
    setIsRegistered,
    handleSetSignedWithWallet,
    setShowRegisterForm,
  ]);

  return (
    <RegistrationContext.Provider value={context}>
      {children}
    </RegistrationContext.Provider>
  );
};
