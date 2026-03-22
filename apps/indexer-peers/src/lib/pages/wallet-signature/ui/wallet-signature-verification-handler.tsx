"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { verifyMessage, type Hex } from "viem";

import { useIndexerContext } from "@/lib/context";

export const MESSAGE_TO_SIGN = "Shinzo Indexer Verification";

export function SignatureVerificationHandler({
  signature,
}: {
  signature: Hex;
}) {
  const { address } = useAccount();
  const { handleSignedWithWallet, showIndexerForm } = useIndexerContext();

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
        showIndexerForm(true);
      }
    });
    return () => {
      unmounted = true;
    };
  }, [address, signature, handleSignedWithWallet, showIndexerForm]);

  return null;
}
