"use client";

import { useEffect, useCallback } from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { encodeFunctionData } from "viem";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import {
  SHINZO_PRECOMPILE_ADDRESS,
  TOAST_CONFIG,
  validateHexFormat,
} from "@/shared/lib";
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

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isErrorConfirming,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const { address } = useAccount();
  const { isRegistered, setRegistered, handleRegisterFormVisibility } =
    useRegistrationContext();

  // Handle transaction receipt errors (transaction reverted, etc.)
  useEffect(() => {
    if (isErrorConfirming && txHash) {
      toast.error(
        "Transaction failed to confirm. Please check the transaction status.",
        TOAST_CONFIG
      );
    }
  }, [isErrorConfirming, txHash]);

  // Handle sendTransaction errors (wallet rejections, network errors, etc.)
  useEffect(() => {
    if (sendError) {
      const { shortMessage } = sendError as {
        shortMessage?: string;
        message?: string;
      };
      toast.error(`Registration failed: ${shortMessage}`, TOAST_CONFIG);
    }
  }, [sendError]);

  // Handle successful transaction confirmation
  useEffect(() => {
    if (isConfirmed && txHash && address && !isRegistered) {
      setRegistered(true);
      handleRegisterFormVisibility(false);
      toast.success(
        "Registration successful! Your transaction has been confirmed.",
        TOAST_CONFIG
      );
    }
  }, [
    isConfirmed,
    txHash,
    address,
    isRegistered,
    handleRegisterFormVisibility,
    setRegistered,
  ]);

  const sendRegisterTransaction = useCallback(async () => {
    if (
      !formData.peerId ||
      !formData.peerSignedMessage ||
      !formData.defraPublicKey ||
      !formData.defraSignedMessage ||
      !formData.message
    ) {
      throw new Error("Missing required fields");
    }
    if (!validateHexFormat(formData)) {
      throw new Error("Invalid hex fields");
    }
    let encodedData;
    try {
      encodedData = encodeFunctionData({
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
    } catch (error: unknown) {
      const { shortMessage } = error as {
        shortMessage?: string;
        message?: string;
      };
      const errorMessage =
        error instanceof Error
          ? shortMessage
          : "Error encoding data before sending transaction";
      toast.error(`Registration failed - ${errorMessage}`, TOAST_CONFIG);
      throw error;
    }

    try {
      await sendTransaction({
        to: SHINZO_PRECOMPILE_ADDRESS,
        data: encodedData,
      });
    } catch (error: unknown) {
      const { shortMessage } = error as {
        shortMessage?: string;
        message?: string;
      };
      const errorMessage =
        error instanceof Error
          ? shortMessage
          : "Unknown error occurred while sending transaction";
      toast.error(`Registration failed: ${errorMessage}`, TOAST_CONFIG);
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
