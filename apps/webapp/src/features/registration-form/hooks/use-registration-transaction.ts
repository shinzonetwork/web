"use client";

import { useEffect, useCallback } from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { encodeFunctionData, Hex } from "viem";
import { useAccount } from "wagmi";
import { SHINZO_PRECOMPILE_ADDRESS } from "@/shared/lib";
import { REGISTER_TRANSACTION_ABI } from "../abi/register-transaction-abi";
import { useRegistrationContext } from "@/entities";
import type { RegistrationFormData } from "@/shared/lib";

/**
 * Hook to handle registration transaction logic
 */
export function useRegistrationTransaction(formData: RegistrationFormData) {
  const {
    sendTransaction,
    isPending,
    error: sendError,
    data: txHash,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash as Hex,
    });

  const { address } = useAccount();
  const { isRegistered, setRegistered } = useRegistrationContext();

  // Handle successful transaction confirmation
  useEffect(() => {
    if (isConfirmed && txHash && address && !isRegistered) {
      setRegistered(true);
    }
  }, [isConfirmed, txHash, address, isRegistered, setRegistered]);

  const sendRegisterTransaction = useCallback(async () => {
    try {
      const data = encodeFunctionData({
        abi: REGISTER_TRANSACTION_ABI,
        functionName: "register",
        args: [
          formData.peerId as Hex,
          formData.peerSignedMessage as Hex,
          formData.defraPublicKey as Hex,
          formData.defraSignedMessage as Hex,
          formData.message as Hex,
          formData.entity,
        ],
      });

      await sendTransaction({
        to: SHINZO_PRECOMPILE_ADDRESS,
        data,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      alert(`Transaction failed: ${errorMessage}`);
      throw error;
    }
  }, [formData, sendTransaction]);

  return {
    sendRegisterTransaction,
    isPending,
    isConfirming,
    isConfirmed,
    sendError,
    txHash,
  };
}
