import { createContext } from "react";
import { IndexerContextType } from "../types/types";

/**
 * The context for the indexer process.
 */
export const IndexerContext = createContext<IndexerContextType>({
  isPortOpen: false,
  isIndexerFormOpen: false,
  isSignedWithWallet: false,
  handleSignedWithWallet: () => {},
  showIndexerForm: () => {},
  showPortOpen: () => {},
});
