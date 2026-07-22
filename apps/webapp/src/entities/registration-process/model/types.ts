import type { EntityRole } from "@/shared/lib";

export type RegistrationContext = {
  isRegistered: boolean;
  isSignedWithWallet: boolean;
  setRegistered: (registered: boolean) => void;
  handleSignedWithWallet: (signedWithWallet: boolean) => void;
  /** V2 registration entity: derived only from the URL route (host vs generator registration paths). */
  registrationEntity: EntityRole;
};
