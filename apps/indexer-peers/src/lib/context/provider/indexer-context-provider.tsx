"use client";

import { useState, useCallback, ReactNode, useMemo, useEffect } from "react";
import { useAccount } from "wagmi";
import { IndexerContext } from "../model/indexer-context";
import { IndexerContextType } from "../types/types";
import {
  isWalletSigned,
  setWalletSigned,
} from "../storgae/indexer-local-storage";

/**
 * The provider for the registration context.
 */
export const IndexerContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { address, isConnected } = useAccount();
  const [isIndexerFormOpen, setIsIndexerFormOpen] = useState<boolean>(false);
  const [signedState, setSignedState] = useState<Record<string, boolean>>({});
  const [isPortOpen, setIsPortOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadSignedState = () => {
      if (!isConnected || !address) {
        return;
      }

      // Check if signed with wallet
      if (address in signedState) {
        return;
      }

      // Check localStorage for this address
      const signed = isWalletSigned(address);

      //update signed state
      setSignedState((prev: Record<string, boolean>) => ({
        ...prev,
        [address]: signed,
      }));
    };
    loadSignedState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);

  // Derive isSignedWithWallet from address and localStorage
  const isSignedWithWallet = useMemo(() => {
    if (!isConnected || !address) {
      return false;
    }

    // Check if signed with wallet
    if (address in signedState) {
      return signedState[address];
    }

    // Check localStorage for this address
    return isWalletSigned(address);
  }, [isConnected, address, signedState]);

  const handleSignedWithWallet = useCallback(
    (signed: boolean) => {
      if (!address) return;
      // Update signed state (takes precedence over localStorage)
      setSignedState((prev: Record<string, boolean>) => ({
        ...prev,
        [address]: signed,
      }));
      // Persist to localStorage for future sessions
      setWalletSigned(address, signed);
    },
    [address],
  );

  const context: IndexerContextType = useMemo(() => {
    return {
      isPortOpen,
      isIndexerFormOpen,
      isSignedWithWallet,
      handleSignedWithWallet,
      showIndexerForm: (open: boolean) => setIsIndexerFormOpen(open),
      showPortOpen: (open: boolean) => setIsPortOpen(open),
    };
  }, [
    isIndexerFormOpen,
    isSignedWithWallet,
    setIsIndexerFormOpen,
    handleSignedWithWallet,
    isPortOpen,
    setIsPortOpen,
  ]);

  return (
    <IndexerContext.Provider value={context}>
      {children}
    </IndexerContext.Provider>
  );
};
