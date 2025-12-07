export type RegistrationContext = {
  isRegistered: boolean;
  isSignedWithWallet: boolean;
  setRegistered: (registered: boolean) => void;
  setSignedWithWallet: (signedWithWallet: boolean) => void;
};
