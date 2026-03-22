export type IndexerContextType = {
  isPortOpen: boolean;
  isIndexerFormOpen: boolean;
  isSignedWithWallet: boolean;
  handleSignedWithWallet: (signedWithWallet: boolean) => void;
  showIndexerForm: (open: boolean) => void;
  showPortOpen: (open: boolean) => void;
};
