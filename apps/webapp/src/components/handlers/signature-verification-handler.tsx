"use client";

import { useAccount, useVerifyMessage } from "wagmi";
import { useEffect } from "react";
import useShinzoStore from "@/store/store";
import { MESSAGE_TO_SIGN } from "@/lib/constants";
import { Hex } from "viem";
import { useProfile } from "@/hooks/useProfile";

export function SignatureVerificationHandler({
  signature,
}: {
  signature: Hex;
}) {
  const { address } = useAccount();
  const { isSignedWithWallet } = useShinzoStore();
  const { initializeProfile } = useProfile();

  const { data } = useVerifyMessage({
    address,
    message: MESSAGE_TO_SIGN,
    signature: signature,
  });

  useEffect(() => {
    const verified = Boolean(data);
    if (verified && address) {
      isSignedWithWallet(verified);
      // Initialize profile in GCS when wallet signs
      initializeProfile(address, verified);
    }
  }, [data, address, isSignedWithWallet, initializeProfile]);

  return null;
}
