"use client";

import { useAccount, useVerifyMessage } from "wagmi";
import { useEffect } from "react";
import { Hex } from "viem";

import { useRegistrationContext } from "@/entities/registration-process";

import { MESSAGE_TO_SIGN } from "@/shared/lib";

export function SignatureVerificationHandler({
  signature,
}: {
  signature: Hex;
}) {
  const { address } = useAccount();
  const { handleSignedWithWallet } = useRegistrationContext();

  const { data } = useVerifyMessage({
    address,
    message: MESSAGE_TO_SIGN,
    signature: signature,
  });

  useEffect(() => {
    const verified = Boolean(data);
    if (verified && address) {
      handleSignedWithWallet(verified);
    }
  }, [data, address, handleSignedWithWallet]);

  return null;
}
