"use client";

import { useEffect, useCallback } from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { encodeFunctionData, type Hex } from "viem";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { EntityRole, TOAST_CONFIG } from "@/shared/lib";
import { useRegistrationContext } from "@/entities/registration-process";
import type {
  HostRegistrationFormData,
  IndexerRegistrationFormData,
} from "@/shared/types";
import { INDEXER_REGISTER_TRANSACTION_ABI } from "../abi/indexer-register-transaction-abi";
import { HOST_REGISTER_TRANSACTION_ABI } from "../abi/host-register-transaction-abi";

export const GENERATOR_PRECOMPILE_ADDRESS =
  "0x0000000000000000000000000000000000000212";
export const HOST_PRECOMPILE_ADDRESS =
  "0x0000000000000000000000000000000000000211";
/**
 * Hook to handle registration transaction logic
 */
export function useRegistrationTransaction(
  formData: IndexerRegistrationFormData | HostRegistrationFormData
) {
  const {
    sendTransaction,
    isPending,
    error: sendError,
    data: txHash,
    reset: resetSendTransaction,
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
      toast.error("Registration failed. Please try again.", TOAST_CONFIG);
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
    let precompileAddress;
    try {
      if (formData.entity === EntityRole.Generator) {
        precompileAddress = GENERATOR_PRECOMPILE_ADDRESS;
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
        precompileAddress = HOST_PRECOMPILE_ADDRESS;
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
      toast.error("Registration failed. Please try again.", TOAST_CONFIG);
      throw error;
    }

    try {
      await sendTransaction({
        to: precompileAddress as Hex,
        data: encodedData,
      });
    } catch (error: unknown) {
      toast.error("Registration failed. Please try again.", TOAST_CONFIG);
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
    resetTransactionState: resetSendTransaction,
  };
}
