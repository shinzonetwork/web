"use client";

import { useAccount, useVerifyMessage } from "wagmi";
import { useEffect } from "react";
import { Hex } from "viem";

import { useRegistrationContext } from "@/entities";

import { MESSAGE_TO_SIGN } from "@/shared/lib";

export function SignatureVerificationHandler({
  signature,
}: {
  signature: Hex;
}) {
  const { address } = useAccount();
  const { setSignedWithWallet } = useRegistrationContext();

  const { data } = useVerifyMessage({
    address,
    message: MESSAGE_TO_SIGN,
    signature: signature,
  });

  useEffect(() => {
    const verified = Boolean(data);
    if (verified && address) {
      setSignedWithWallet(verified);
    }
  }, [data, address, setSignedWithWallet]);

  return null;
}
