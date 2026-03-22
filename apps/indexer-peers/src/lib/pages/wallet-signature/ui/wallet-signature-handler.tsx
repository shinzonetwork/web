"use client";

import { useEffect, useRef } from "react";

import { SignatureVerificationHandler } from "./wallet-signature-verification-handler";
import { useWalletSignature } from "../hooks/use-wallet-signature";
import { useIndexerContext } from "@/lib/context";

/**
 * Handler for wallet signature when not signed with wallet
 * The hook handles preventing duplicate signing attempts internally
 */
export default function WalletSignatureHandler() {
  const { signature, signMessage, isSigning, error } = useWalletSignature();
  const { isSignedWithWallet } = useIndexerContext();
  const hasInitiatedSigningRef = useRef(false);

  useEffect(() => {
    // Skip if already signed, have signature, is signing, or have error
    if (isSignedWithWallet || signature || isSigning || error) {
      // Reset the ref when we're in a state that allows signing again
      if (error) {
        hasInitiatedSigningRef.current = false;
      }
      return;
    }

    // Prevent multiple signing attempts
    if (hasInitiatedSigningRef.current) {
      return;
    }

    // Mark that we've initiated signing
    hasInitiatedSigningRef.current = true;
    signMessage();
  }, [isSignedWithWallet, signature, isSigning, error, signMessage]);

  // Reset the ref when signature is successfully obtained
  useEffect(() => {
    if (signature) {
      hasInitiatedSigningRef.current = false;
    }
  }, [signature]);

  // Render SignatureVerificationHandler when we have a valid signature
  // and haven't already verified
  if (signature && signature.length > 2 && !isSignedWithWallet) {
    return <SignatureVerificationHandler signature={signature} />;
  }

  return null;
}
