import { useCallback, useState } from "react";
import { fromHex } from "@cosmjs/encoding";
import { toast } from "react-toastify";
import { IndexerAssertionFormData } from "../util/form-data";
import { TOAST_CONFIG } from "@/shared/lib";
import { adminIndexerAssertion } from "../util/assertion";
import { useSignMessage } from "wagmi";

export type SignedDelegatePayload = { digest: string; signature: string };

// function ethereumSignatureHexToBytes(signature: string): Uint8Array {
//   const hex = signature.trim().replace(/^0x/i, "");
//   if (!/^[0-9a-fA-F]+$/.test(hex)) {
//     throw new Error("Delegate signature must be hex (with optional 0x prefix).");
//   }
//   if (hex.length !== 130) {
//     throw new Error(
//       `Delegate signature must decode to exactly 65 bytes (${hex.length / 2} decoded).`
//     );
//   }
//   return fromHex(hex);
// }

export function useIndexerAssertion() {
  const { signMessageAsync, isPending: isSigning } = useSignMessage();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [delegateDigest, setDelegateDigest] = useState<string>("");
  const [delegateSignature, setDelegateSignature] = useState<string>("");

  const randomHexString32 = useCallback(() => {
    const bytes = new Uint8Array(16); // 16 bytes => 32 hex chars
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  }, []);

  const handleSignDigest = useCallback(async (): Promise<
    SignedDelegatePayload | undefined
  > => {
    try {
      const digest = randomHexString32();
      const signature = await signMessageAsync({ message: digest });
      setDelegateDigest(digest);
      setDelegateSignature(signature);
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
      signed?: SignedDelegatePayload
    ) => {
      const privateKey = process.env.NEXT_PUBLIC_INDEXER_ASSERTION_PRIVATE_KEY;
      const rpcEndpoint =
        process.env.NEXT_PUBLIC_INDEXER_ASSERTION_RPC_ENDPOINT;

      if (!privateKey || !rpcEndpoint) {
        toast.error(
          "Missing assertion config: RPC endpoint or private key.",
          TOAST_CONFIG
        );
        return;
      }

      const digestStr = signed?.digest ?? delegateDigest;
      const sigStr = signed?.signature ?? delegateSignature;

      try {
        //   const delegateSignatureBytes = ethereumSignatureHexToBytes(sigStr);
        setIsSubmitting(true);
        const result = await adminIndexerAssertion({
          privateKey,
          rpcEndpoint,
          consensusPubKey: assertionFormData.consensusPubKey,
          delegateAddress: assertionFormData.delegateAddress,
          sourceChain: assertionFormData.sourceChain,
          sourceChainId: Number(assertionFormData.sourceChainId),
          assertionId: `assert-${Math.random().toString(36).substring(2, 15)}`,
          delegateDigest: new TextEncoder().encode(digestStr),
          delegateSignature: fromHex(sigStr.replace(/^0x/, "")),
        });

        if (result.code === 0) {
          toast.success(`Assertion submitted: ${result.hash}`, TOAST_CONFIG);
          return;
        }

        toast.error(
          `Assertion failed (${result.code}): ${result.log}`,
          TOAST_CONFIG
        );
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        toast.error(`Submit failed: ${message}`, TOAST_CONFIG);
      } finally {
        setIsSubmitting(false);
      }
    },
    [delegateDigest, delegateSignature]
  );
  return {
    handleSignDigest,
    handleAssertion,
    isSubmitting,
    isSigning,
  };
}
