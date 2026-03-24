export type RegistrationContext = {
  isPortOpen: boolean;
  isIndexerFormOpen: boolean;
  isRegistrationFormOpen: boolean;
  isRegistered: boolean;
  isSignedWithWallet: boolean;
  setRegistered: (registered: boolean) => void;
  handleSignedWithWallet: (signedWithWallet: boolean) => void;
  showIndexerForm: (open: boolean) => void;
  showPortOpen: (open: boolean) => void;
  handleRegistrationFormOpen: (open: boolean) => void;
};
