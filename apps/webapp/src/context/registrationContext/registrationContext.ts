import { createContext } from "react";

export type RegistrationContext = {
  isProfileCompleted: boolean;
  isRegistered: boolean;
  isSignedWithWallet: boolean;
  setProfileCompleted: (profileCompleted: boolean) => void;
  setRegistered: (registered: boolean) => void;
  setSignedWithWallet: (signedWithWallet: boolean) => void;
};

export const RegistrationContext = createContext<RegistrationContext>({
  isProfileCompleted: false,
  isRegistered: false,
  isSignedWithWallet: false,
  setProfileCompleted: () => {},
  setRegistered: () => {},
  setSignedWithWallet: () => {},
});
