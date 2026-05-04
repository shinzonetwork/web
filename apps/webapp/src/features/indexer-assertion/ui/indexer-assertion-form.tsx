import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { IndexerAssertionDataForm } from "./indexer-assertion-data-form";
import { useIndexerAssertionForm } from "../hooks/use-indexer-assertion-form";
import { adminIndexerAssertion } from "../util/assertion";
import { fromHex } from "@cosmjs/encoding";
import { toast } from "react-toastify";
import { TOAST_CONFIG } from "@/shared/lib";

export function IndexerAssertionForm() {
  const {
    assertionFormData,
    handleInputChange,
    fieldErrors,
    isValid,
    handleSignDigest,
    isSigning,
  } = useIndexerAssertionForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const privateKey = process.env.NEXT_PUBLIC_INDEXER_ASSERTION_PRIVATE_KEY;
    const rpcEndpoint = process.env.NEXT_PUBLIC_INDEXER_ASSERTION_RPC_ENDPOINT;

    if (!privateKey || !rpcEndpoint) {
      toast.error(
        "Missing assertion config: RPC endpoint or private key.",
        TOAST_CONFIG
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await adminIndexerAssertion({
        privateKey,
        rpcEndpoint,
        consensusPubKey: assertionFormData.consensusPubKey,
        delegateAddress: assertionFormData.delegateAddress,
        sourceChain: assertionFormData.sourceChain,
        sourceChainId: Number(assertionFormData.sourceChainId),
        assertionId: assertionFormData.assertionId,
        delegateDigest: new TextEncoder().encode(
          assertionFormData.delegateDigest
        ),
        delegateSignature: fromHex(
          assertionFormData.delegateSignature.replace(/^0x/, "")
        ),
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
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Submit failed: ${message}`, TOAST_CONFIG);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="space-y-6 ml-10">
      <IndexerAssertionDataForm
        formData={assertionFormData}
        handleInputChange={handleInputChange}
        fieldErrors={fieldErrors}
        onSignDigest={handleSignDigest}
        isSigning={isSigning}
      />
      <Button
        onClick={handleSubmit}
        className="w-fit rounded-none"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Assertion"}
      </Button>
    </div>
  );
}
