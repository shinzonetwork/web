export type RegistrationContext = {
  isRegistered: boolean;
  isSignedWithWallet: boolean;
  setRegistered: (registered: boolean) => void;
  handleSignedWithWallet: (signedWithWallet: boolean) => void;
};
