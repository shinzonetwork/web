import type { EntityRole } from "@/shared/lib";

export type RegistrationContext = {
  isPortOpen: boolean;
  isRegistered: boolean;
  isSignedWithWallet: boolean;
  setRegistered: (registered: boolean) => void;
  handleSignedWithWallet: (signedWithWallet: boolean) => void;
  showPortOpen: (open: boolean) => void;
  /** V2 registration entity: derived only from the URL route (host vs indexer registration paths). */
  registrationEntity: EntityRole;
};
