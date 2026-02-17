"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { verifyMessage, type Hex } from "viem";

import { useRegistrationContext } from "@/entities/registration-process";

import { MESSAGE_TO_SIGN } from "@/shared/lib";

export function SignatureVerificationHandler({
  signature,
}: {
  signature: Hex;
}) {
  const { address } = useAccount();
  const { handleSignedWithWallet } = useRegistrationContext();

  // Verify with viem directly so we run as soon as we have address + signature,
  useEffect(() => {
    if (address === undefined) {
      return;
    }
    let unmounted = false;
    verifyMessage({
      address,
      message: MESSAGE_TO_SIGN,
      signature,
    }).then((result) => {
      if (!unmounted) {
        handleSignedWithWallet(result);
      }
    });
    return () => {
      unmounted = true;
    };
  }, [address, signature, handleSignedWithWallet]);

  return null;
}
