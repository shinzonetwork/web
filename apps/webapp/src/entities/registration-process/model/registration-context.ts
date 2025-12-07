import { createContext } from "react";
import { RegistrationContext as RegistrationContextType } from "./types";

/**
 * The context for the registration process.
 */
export const RegistrationContext = createContext<RegistrationContextType>({
  isRegistered: false,
  isSignedWithWallet: false,
  setRegistered: () => {},
  setSignedWithWallet: () => {},
});
