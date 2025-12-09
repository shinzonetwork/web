"use client";

import { useState, useCallback, ReactNode, useMemo, useRef } from "react";
import { useAccount } from "wagmi";
import { RegistrationContext as RegistrationContextType } from "./types";
import { RegistrationContext } from "./registration-context";
import { isWalletSigned, setWalletSigned } from "@/shared/lib";

/**
 * Cache for localStorage reads to avoid synchronous reads during render
 */
type LocalStorageCache = {
  address: string | null;
  value: boolean;
};

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

  // Cache localStorage reads to avoid synchronous reads during render
  // This ref stores the last read value for the current address
  const localStorageCacheRef = useRef<LocalStorageCache>({
    address: null,
    value: false,
  });

  const isSignedWithWallet = useMemo(() => {
    if (!isConnected || !address) {
      // Reset cache when disconnected
      localStorageCacheRef.current = { address: null, value: false };
      return false;
    }

    // Check if manually set (user action)
    if (address in manualSignedState) {
      return manualSignedState[address];
    }

    // Check cache - if address matches, use cached value 
    if (localStorageCacheRef.current.address === address) {
      return localStorageCacheRef.current.value;
    }

    // Address changed or cache miss - read from localStorage and cache it
    const signed = isWalletSigned(address);
    localStorageCacheRef.current = { address, value: signed };
    return signed;
  }, [isConnected, address, manualSignedState]);

  const handleSetSignedWithWallet = useCallback(
    (signed: boolean) => {
      if (!address) return;

      // Update manual state (takes precedence over localStorage)
      setManualSignedState((prev) => ({ ...prev, [address]: signed }));
      // Update cache to reflect the new state
      localStorageCacheRef.current = { address, value: signed };
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
