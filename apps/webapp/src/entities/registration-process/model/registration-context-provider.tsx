"use client";

import { useState, ReactNode } from "react";
import { RegistrationContext as RegistrationContextType } from "./types";
import { RegistrationContext } from "./registration-context";

/**
 * The provider for the registration context.
 */
export const RegistrationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isSignedWithWallet, setIsSignedWithWallet] = useState<boolean>(false);

  const context: RegistrationContextType = {
    isRegistered,
    isSignedWithWallet,
    setRegistered: (registered: boolean) => setIsRegistered(registered),
    setSignedWithWallet: (signedWithWallet: boolean) =>
      setIsSignedWithWallet(signedWithWallet),
  };

  return (
    <RegistrationContext.Provider value={context}>
      {children}
    </RegistrationContext.Provider>
  );
};
