"use client";

import { useEffect, useCallback } from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { encodeFunctionData, Hex } from "viem";
import { useAccount } from "wagmi";
import { SHINZO_PRECOMPILE_ADDRESS } from "@/lib/constants";
import { REGISTER_TRANSACTION_ABI } from "@/components/registration/configuration/register-transaction-abi";
import { useProfile } from "@/hooks/useStoredProfile";
import { useRegistrationContext } from "@/hooks/useRegistrationContext";
import type { ConfigurationFormData } from "@/lib/utils/configuration";

/**
 * Hook to handle registration transaction logic
 */
export function useRegistrationTransaction(formData: ConfigurationFormData) {
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
  const { updateRegisteredStatus } = useProfile();

  // Handle successful transaction confirmation
  useEffect(() => {
    if (isConfirmed && txHash && address && !isRegistered) {
      setRegistered(true);
      updateRegisteredStatus(address, true);
    }
  }, [
    isConfirmed,
    txHash,
    address,
    isRegistered,
    setRegistered,
    updateRegisteredStatus,
  ]);

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
