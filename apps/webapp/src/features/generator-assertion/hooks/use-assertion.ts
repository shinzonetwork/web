import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import { GeneratorAssertionFormData } from "../util/form-data";
import { TOAST_CONFIG, getSourceChainMap } from "@/shared/lib";

export function useAssertion() {
  const { address } = useAccount();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAssertion = useCallback(
    async (
      assertionFormData: GeneratorAssertionFormData,
    ): Promise<boolean> => {
      if (!address) {
        toast.error(
          "Connect a wallet before submitting assertion.",
          TOAST_CONFIG
        );
        return false;
      }

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
            validatorPublicKey: assertionFormData.validatorPublicKey,
            assertionAuthority: assertionFormData.assertionAuthority,
            sourceChain: assertionFormData.sourceChain,
            sourceChainId,
            nonce: 1,
            operatorAddress: address,
            payoutAddress: address,
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
    handleAssertion,
    isSubmitting,
  };
}
