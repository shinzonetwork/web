import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useSignMessage } from "wagmi";
import {
  bytesToHex,
  concat,
  Hex,
  hexToBytes,
  keccak256,
  stringToBytes,
} from "viem";
import { GeneratorAssertionFormData } from "../util/form-data";
import { TOAST_CONFIG, getSourceChainMap } from "@/shared/lib";

export type SignedDelegatePayload = { digest: Uint8Array; signature: string };

export function useAssertion() {
  const { signMessageAsync, isPending: isSigning } = useSignMessage();
  const { address } = useAccount();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const randomHexString32 = useCallback(() => {
    const bytes = new Uint8Array(16); // 16 bytes => 32 hex chars
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  }, []);

  const handleSignDigest = useCallback(async (): Promise<
    SignedDelegatePayload | undefined
  > => {
    try {
      const preDigest = randomHexString32();
      const msgBytes = stringToBytes(preDigest);
      const prefix = `\x19Ethereum Signed Message:\n${msgBytes.length}`;
      const eip191 = concat([stringToBytes(prefix), msgBytes]);
      const digest = hexToBytes(keccak256(eip191));

      const signature = await signMessageAsync({ message: preDigest });

      return { digest, signature };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Sign digest failed: ${message}`, TOAST_CONFIG);
      return undefined;
    }
  }, [randomHexString32, signMessageAsync]);

  const handleAssertion = useCallback(
    async (
      assertionFormData: GeneratorAssertionFormData,
      signed: SignedDelegatePayload
    ): Promise<boolean> => {
      if (!address) {
        toast.error(
          "Connect a wallet before submitting assertion.",
          TOAST_CONFIG
        );
        return false;
      }

      const signature = hexToBytes(signed.signature as Hex); // 65 bytes
      if (signature[64] >= 27) signature[64] -= 27;

      const availableChains = getSourceChainMap();
      const sourceChainId =
        availableChains[assertionFormData.sourceChain ?? ""];

      if (!sourceChainId) {
        toast.error("Unsupported source chain.", TOAST_CONFIG);
        return false;
      }

      try {
        setIsSubmitting(true);
        const response = await fetch("/api/shinzohub/generators/assert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            consensusPubKey: assertionFormData.consensusPubKey,
            delegateAddress: address,
            sourceChain: assertionFormData.sourceChain,
            sourceChainId,
            assertionId: `assert-${Math.random().toString(36).substring(2, 15)}`,
            delegateDigest: bytesToHex(signed.digest),
            delegateSignature: bytesToHex(signature),
          }),
        });

        const payload = (await response.json()) as {
          error?: string;
          hash?: string;
          code?: number;
          log?: string;
        };

        if (!response.ok) {
          throw new Error(payload.error ?? "Assertion request failed");
        }

        toast.success(
          "Assertion complete. Continuing to registration…",
          TOAST_CONFIG
        );
        return true;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        toast.error(`Submit failed: ${message}`, TOAST_CONFIG);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [address]
  );
  return {
    handleSignDigest,
    handleAssertion,
    isSubmitting,
    isSigning,
  };
}
