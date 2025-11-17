"use client";

import { SignatureVerificationHandler } from "@/components/handlers/signature-verification-handler";
import { MESSAGE_TO_SIGN } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Hex } from "viem";
import { useSignMessage, useWalletClient } from "wagmi";
import useShinzoStore from "@/store/store";

export default function WalletSignatureHandler() {
  const [signature, setSignature] = useState<Hex>("0x");

  const { signMessageAsync } = useSignMessage();
  const { data: walletClientData, isSuccess } = useWalletClient();
  const { signedWithWallet } = useShinzoStore();

  useEffect(() => {
    const signMessage = async () => {
      try {
        if (isSuccess) {
          if (!walletClientData?.account.address) {
            console.error("No wallet connected.");
            return;
          }
          console.log(
            "Signing message with wallet address:",
            walletClientData.account.address,
          );
          const signedMessage = await signMessageAsync({
            account: walletClientData.account.address,
            message: MESSAGE_TO_SIGN,
          });
          setSignature(signedMessage);
        }
      } catch (err: unknown) {
        console.error("Error signing message:", err);
      }
    };
    signMessage();
  }, [isSuccess, signMessageAsync, walletClientData]);

  // Render SignatureVerificationHandler when we have a valid signature
  // and haven't already verified (to avoid re-verification)
  if (signature.length > 2 && !signedWithWallet) {
    return <SignatureVerificationHandler signature={signature} />;
  }

  return null;
}
