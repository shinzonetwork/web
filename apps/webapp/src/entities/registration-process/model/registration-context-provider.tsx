"use client";

import { useState, useCallback, ReactNode, useMemo, useEffect } from "react";
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
  const [signedState, setSignedState] = useState<Record<string, boolean>>({});
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);

  useEffect(() => {
    const loadSignedState = () => {
      if (!isConnected || !address) {
        return;
      }

      // Check if signed with wallet
      if (address in signedState) {
        return;
      }

      // Check localStorage for this address
      const signed = isWalletSigned(address);

      //update signed state
      setSignedState((prev: Record<string, boolean>) => ({
        ...prev,
        [address]: signed,
      }));
    };
    loadSignedState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);

  // Derive isSignedWithWallet from address and localStorage
  const isSignedWithWallet = useMemo(() => {
    if (!isConnected || !address) {
      return false;
    }

    // Check if signed with wallet
    if (address in signedState) {
      return signedState[address];
    }

    // Check localStorage for this address
    return isWalletSigned(address);
  }, [isConnected, address, signedState]);

  const handleSignedWithWallet = useCallback(
    (signed: boolean) => {
      if (!address) return;
      // Update signed state (takes precedence over localStorage)
      setSignedState((prev: Record<string, boolean>) => ({
        ...prev,
        [address]: signed,
      }));
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
      handleSignedWithWallet: handleSignedWithWallet,
      handleRegisterFormVisibility: (visible: boolean) =>
        setShowRegisterForm(visible),
    };
  }, [
    isRegistered,
    isSignedWithWallet,
    showRegisterForm,
    setIsRegistered,
    handleSignedWithWallet,
    setShowRegisterForm,
  ]);

  return (
    <RegistrationContext.Provider value={context}>
      {children}
    </RegistrationContext.Provider>
  );
};
