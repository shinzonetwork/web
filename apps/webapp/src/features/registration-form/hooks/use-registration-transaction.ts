"use client";

import { useEffect, useCallback } from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { encodeFunctionData, Hex } from "viem";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { SHINZO_PRECOMPILE_ADDRESS } from "@/shared/lib";
import { REGISTER_TRANSACTION_ABI } from "../abi/register-transaction-abi";
import { useRegistrationContext } from "@/entities/registration-process";
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
  const { isRegistered, setRegistered, handleRegisterFormVisibility } =
    useRegistrationContext();

  // Handle successful transaction confirmation
  useEffect(() => {
    if (isConfirmed && txHash && address && !isRegistered) {
      setRegistered(true);
      handleRegisterFormVisibility(false);
      toast.success(
        "Registration successful! Your transaction has been confirmed.",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed, txHash, address, isRegistered]);

  const sendRegisterTransaction = useCallback(async () => {
    try {
      if (
        !formData.peerId ||
        !formData.peerSignedMessage ||
        !formData.defraPublicKey ||
        !formData.defraSignedMessage ||
        !formData.message
      ) {
        throw new Error("Missing required fields");
      }
      const data = encodeFunctionData({
        abi: REGISTER_TRANSACTION_ABI,
        functionName: "register",
        args: [
          formData.peerId,
          formData.peerSignedMessage,
          formData.defraPublicKey,
          formData.defraSignedMessage,
          formData.message,
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
      toast.error(`Registration failed: ${errorMessage}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
