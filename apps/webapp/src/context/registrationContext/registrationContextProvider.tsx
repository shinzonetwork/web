"use client";

import { useState, ReactNode } from "react";
import { RegistrationContext } from "./registrationContext";
import type { RegistrationContext as RegistrationContextType } from "./registrationContext";

export const RegistrationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isProfileCompleted, setIsProfileCompleted] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isSignedWithWallet, setIsSignedWithWallet] = useState<boolean>(false);

  const context: RegistrationContextType = {
    isProfileCompleted,
    isRegistered,
    isSignedWithWallet,
    setProfileCompleted: (profileCompleted: boolean) =>
      setIsProfileCompleted(profileCompleted),
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
