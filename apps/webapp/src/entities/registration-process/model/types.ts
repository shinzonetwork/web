export type RegistrationContext = {
  isPortOpen: boolean;
  isRegistered: boolean;
  isSignedWithWallet: boolean;
  setRegistered: (registered: boolean) => void;
  handleSignedWithWallet: (signedWithWallet: boolean) => void;
  showPortOpen: (open: boolean) => void;
};
