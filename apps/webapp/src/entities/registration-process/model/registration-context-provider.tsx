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

  // Compute signed state: manual override takes precedence, then localStorage
  // This is computed during render, not in an effect, so it updates when address changes
  const isSignedWithWallet = useMemo(() => {
    if (!isConnected || !address) return false;

    // Check if manually set (user action)
    if (address in manualSignedState) {
      return manualSignedState[address];
    }

    // Fall back to localStorage (persistent state)
    return isWalletSigned(address);
  }, [isConnected, address, manualSignedState]);

  const handleSetSignedWithWallet = useCallback(
    (signed: boolean) => {
      if (!address) return;

      // Update manual state (takes precedence over localStorage)
      setManualSignedState((prev) => ({ ...prev, [address]: signed }));
      // Persist to localStorage for future sessions
      setWalletSigned(address, signed);
    },
    [address]
  );

  const context: RegistrationContextType = {
    isRegistered,
    isSignedWithWallet,
    showRegisterForm,
    setRegistered: (registered: boolean) => setIsRegistered(registered),
    handleSignedWithWallet: handleSetSignedWithWallet,
    handleRegisterFormVisibility: (visible: boolean) =>
      setShowRegisterForm(visible),
  };

  return (
    <RegistrationContext.Provider value={context}>
      {children}
    </RegistrationContext.Provider>
  );
};
