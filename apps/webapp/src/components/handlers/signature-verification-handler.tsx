"use client";

import { useAccount, useVerifyMessage } from "wagmi";
import { useEffect } from "react";
import useShinzoStore from "@/store/store";
import { MESSAGE_TO_SIGN } from "@/lib/constants";
import { Hex } from "viem";

export function SignatureVerificationHandler({
  signature,
}: {
  signature: Hex;
}) {
  const { address } = useAccount();
  const { isSignedWithWallet } = useShinzoStore();

  const { data } = useVerifyMessage({
    address,
    message: MESSAGE_TO_SIGN,
    signature: signature,
  });

  useEffect(() => {
    isSignedWithWallet(Boolean(data));
  }, [data]);

  return null;
}
