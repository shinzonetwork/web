import { createContext } from "react";
import { RegistrationContext as RegistrationContextType } from "./types";

/**
 * The context for the registration process.
 */
export const RegistrationContext = createContext<RegistrationContextType>({
  isPortOpen: false,
  isIndexerFormOpen: false,
  isRegistrationFormOpen: false,
  isRegistered: false,
  isSignedWithWallet: false,
  setRegistered: () => {},
  handleSignedWithWallet: () => {},
  handleRegistrationFormOpen: () => {},
  showIndexerForm: () => {},
  showPortOpen: () => {},
});