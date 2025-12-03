"use client";

import { useAccount, useVerifyMessage } from "wagmi";
import { useEffect } from "react";
import { MESSAGE_TO_SIGN } from "@/lib/constants";
import { Hex } from "viem";
import { useStoredProfile } from "@/hooks/useStoredProfile";
import { useRegistrationContext } from "@/hooks/useRegistrationContext";

export function SignatureVerificationHandler({
  signature,
}: {
  signature: Hex;
}) {
  const { address } = useAccount();
  const { setSignedWithWallet } = useRegistrationContext();
  const { initializeProfile } = useStoredProfile();

  const { data } = useVerifyMessage({
    address,
    message: MESSAGE_TO_SIGN,
    signature: signature,
  });

  useEffect(() => {
    const verified = Boolean(data);
    if (verified && address) {
      setSignedWithWallet(verified);
      // Initialize profile in GCS when wallet signs
      initializeProfile(address, verified);
    }
  }, [data, address, setSignedWithWallet, initializeProfile]);

  return null;
}
