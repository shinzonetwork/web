import { createContext } from "react";
import { EntityRole } from "@/shared/lib";
import { RegistrationContext as RegistrationContextType } from "./types";

/**
 * The context for the registration process.
 */
export const RegistrationContext = createContext<RegistrationContextType>({
  isRegistered: false,
  isSignedWithWallet: false,
  setRegistered: () => {},
  handleSignedWithWallet: () => {},
  registrationEntity: EntityRole.Host,
});
