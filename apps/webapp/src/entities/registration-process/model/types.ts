export type RegistrationContext = {
  isRegistered: boolean;
  isSignedWithWallet: boolean;
  showRegisterForm: boolean;
  setRegistered: (registered: boolean) => void;
  handleSignedWithWallet: (signedWithWallet: boolean) => void;
  handleRegisterFormVisibility: (visible: boolean) => void;
};
