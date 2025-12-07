"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Hex } from "viem";
import { useSignMessage, useAccount } from "wagmi";

import { useRegistrationContext } from "@/entities";

import { MESSAGE_TO_SIGN } from "@/shared/lib";

interface UseWalletSignatureReturn {
  signature: Hex | null;
  signMessage: () => Promise<void>;
  isSigning: boolean;
  error: Error | null;
}

/**
 * Custom hook for wallet message signing with explicit control
 * Returns a signMessage function that can be called explicitly
 */
export function useWalletSignature(): UseWalletSignatureReturn {
  const [signature, setSignature] = useState<Hex | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const signingAttemptRef = useRef(false);

  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { isSignedWithWallet } = useRegistrationContext();

  const signMessage = useCallback(async () => {
    // Skip if already signed
    if (isSignedWithWallet) {
      signingAttemptRef.current = false;
      return;
    }

    // Skip if already attempting to sign
    if (signingAttemptRef.current || isSigning) {
      return;
    }

    // Skip if wallet not connected or no address
    if (!isConnected || !address) {
      setError(new Error("Wallet not connected"));
      return;
    }

    // Check if signMessageAsync is available
    if (!signMessageAsync) {
      setError(new Error("Sign message function not available"));
      return;
    }

    // Mark as attempting
    signingAttemptRef.current = true;
    setError(null);
    setIsSigning(true);

    try {
      const signedMessage = await signMessageAsync({
        message: MESSAGE_TO_SIGN,
      });
      setSignature(signedMessage);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err : new Error("Failed to sign message");
      setError(errorMessage);
      setSignature(null);
      signingAttemptRef.current = false;
    } finally {
      setIsSigning(false);
    }
  }, [address, isConnected, signMessageAsync, isSignedWithWallet, isSigning]);

  // Reset attempt ref when signature is set or signed status changes
  useEffect(() => {
    if (signature || isSignedWithWallet) {
      signingAttemptRef.current = false;
    }
  }, [signature, isSignedWithWallet]);

  return {
    signature,
    signMessage,
    isSigning,
    error,
  };
}
