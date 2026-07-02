import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { IndexerAssertionFormData } from "../util/form-data";
import { TOAST_CONFIG, getSourceChainMap } from "@/shared/lib";
import { adminIndexerAssertion } from "../util/assertion";
import { useAccount, useSignMessage } from "wagmi";
import { concat, hexToBytes, keccak256, stringToBytes } from "viem";

export type SignedDelegatePayload = { digest: Uint8Array; signature: string };

export function useIndexerAssertion() {
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
      assertionFormData: IndexerAssertionFormData,
      signed: SignedDelegatePayload
    ): Promise<boolean> => {
      const privateKey = process.env.NEXT_PUBLIC_INDEXER_ASSERTION_PRIVATE_KEY;
      const rpcEndpoint =
        process.env.NEXT_PUBLIC_INDEXER_ASSERTION_RPC_ENDPOINT;

      if (!privateKey || !rpcEndpoint) {
        toast.error(
          "Missing assertion config: RPC endpoint or private key.",
          TOAST_CONFIG
        );
        return false;
      }

      const signature = hexToBytes(signed?.signature as `0x${string}`); // 65 bytes
      if (signature[64] >= 27) signature[64] -= 27;

      const availableChains = getSourceChainMap();
      const sourceChainId =
        availableChains[assertionFormData.sourceChain ?? ""];

      try {
        setIsSubmitting(true);
        const result = await adminIndexerAssertion({
          privateKey,
          rpcEndpoint,
          consensusPubKey: assertionFormData.consensusPubKey,
          delegateAddress: address ?? "",
          sourceChain: assertionFormData.sourceChain,
          sourceChainId: sourceChainId,
          assertionId: `assert-${Math.random().toString(36).substring(2, 15)}`,
          delegateDigest: signed?.digest,
          delegateSignature: signature,
        });

        if (result.code !== 0) {
          throw new Error(`Assertion failed (${result.code}): ${result.log}`);
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
