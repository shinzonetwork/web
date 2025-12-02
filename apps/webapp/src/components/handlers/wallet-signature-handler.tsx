"use client";

import { SignatureVerificationHandler } from "@/components/handlers/signature-verification-handler";
import { useWalletSignature } from "@/hooks/useWalletSignature";
import { useRegistrationContext } from "@/hooks/useRegistrationContext";
import { useEffect } from "react";

/**
 * Handler for wallet signature when not signed with wallet
 * The hook handles preventing duplicate signing attempts internally
 */
export default function WalletSignatureHandler() {
  const { signature, signMessage, isSigning, error } = useWalletSignature();
  const { isSignedWithWallet } = useRegistrationContext();

  useEffect(() => {
    // Skip if already signed, have signature, is signing, or have error
    if (isSignedWithWallet || signature || isSigning || error) {
      return;
    }

    signMessage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedWithWallet, signature, isSigning, error]);

  // Render SignatureVerificationHandler when we have a valid signature
  // and haven't already verified
  if (signature && signature.length > 2 && !isSignedWithWallet) {
    return <SignatureVerificationHandler signature={signature} />;
  }

  return null;
}
