"use client";

import { useEffect, useCallback } from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { encodeFunctionData, type Hex } from "viem";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import {
  EntityRole,
  SHINZO_PRECOMPILE_ADDRESS,
  TOAST_CONFIG,
} from "@/shared/lib";
import { useRegistrationContext } from "@/entities/registration-process";
import type { HostRegistrationFormData, IndexerRegistrationFormData } from "@/shared/types";
import { INDEXER_REGISTER_TRANSACTION_ABI } from "../abi/indexer-register-transaction-abi";
import { HOST_REGISTER_TRANSACTION_ABI } from "../abi/host-register-transaction-abi";

/**
 * Hook to handle registration transaction logic
 */
export function useRegistrationTransaction(formData: IndexerRegistrationFormData | HostRegistrationFormData) {
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
  const { isRegistered, setRegistered } = useRegistrationContext();

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
      toast.success(
        "Registration successful! Your transaction has been confirmed.",
        TOAST_CONFIG
      );
    }
  }, [isConfirmed, txHash, address, isRegistered, setRegistered]);

  const sendRegisterTransaction = useCallback(async () => {
    let encodedData;
    try {
      if (formData.entity === EntityRole.Indexer) {
        console.log("Indexer registration");
        const indexer = formData as IndexerRegistrationFormData;
        encodedData = encodeFunctionData({
          abi: INDEXER_REGISTER_TRANSACTION_ABI,
          functionName: "register",
          args: [
            indexer.defraPublicKey as Hex,
            indexer.defraSignedMessage as Hex,
            indexer.message as Hex,
            indexer.connectionString,
            indexer.sourceChain,
            BigInt(indexer.sourceChainId),
          ],
        });
      } else if (formData.entity === EntityRole.Host) {
        console.log("Host registration");
        const host = formData as HostRegistrationFormData;
        encodedData = encodeFunctionData({
          abi: HOST_REGISTER_TRANSACTION_ABI,
          functionName: "register",
          args: [
            host.defraPublicKey as Hex,
            host.defraSignedMessage as Hex,
            host.message as Hex,
            host.connectionString ?? "",
          ],
        });
      }

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
