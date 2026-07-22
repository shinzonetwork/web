"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Button } from "@/shared/ui/button";
import { AssertionDataForm } from "./assertion-data-form";
import { useAssertionForm } from "../hooks/use-assertion-form";
import { useAssertion } from "../hooks/use-assertion";
import { getGeneratorAssertionButtonText } from "../util/form-data";
import { waitForGeneratorAssertionVerification } from "@/features/registration-form";
import { getRegistrationPrefillV2Params } from "@/shared/lib/utils/prefill-data";
import { buildGeneratorRegistrationUrl } from "@/shared/lib/utils/build-generator-url";
import { TOAST_CONFIG, validatorPublicKeyToBase64 } from "@/shared/lib";

export default function AssertionForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    assertionFormData,
    handleInputChange,
    fieldErrors,
    prefilledFields,
    isValid,
  } = useAssertionForm();
  const { isSubmitting, handleAssertion } = useAssertion();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async () => {
    if (!isValid || isVerifying) return;

    const assertionResult = await handleAssertion(assertionFormData);
    if (!assertionResult) return;

    setIsVerifying(true);
    try {
      const validatorPublicKey = validatorPublicKeyToBase64(
        assertionResult.validatorPublicKey
      );
      const sourceChainId = String(assertionResult.sourceChainId);

      const verified = await waitForGeneratorAssertionVerification(
        validatorPublicKey,
        sourceChainId
      );

      if (!verified) {
        toast.error(
          "Assertion was submitted but could not be verified yet. Please try again shortly.",
          TOAST_CONFIG
        );
        return;
      }

      toast.success(
        "Assertion complete. Continuing to registration…",
        TOAST_CONFIG
      );

      queryClient.setQueryData(
        ["generator-assertion-verification", validatorPublicKey, sourceChainId],
        true
      );

      await queryClient.invalidateQueries({
        queryKey: ["generator-assertion-verification"],
      });

      const registrationUrl = buildGeneratorRegistrationUrl(
        assertionResult.sourceChain,
        assertionResult.validatorPublicKey,
        assertionResult.sourceChainId,
        getRegistrationPrefillV2Params()
      );
      router.push(registrationUrl);
    } finally {
      setIsVerifying(false);
    }
  };

  const isBusy = isSubmitting || isVerifying;

  return (
    <div className="space-y-6 ml-10">
      <AssertionDataForm
        formData={assertionFormData}
        handleInputChange={handleInputChange}
        fieldErrors={fieldErrors}
        prefilledFields={prefilledFields}
      />
      <Button
        onClick={handleSubmit}
        className="w-fit rounded-none bg-muted-foreground hover:bg-muted-foreground/90"
        disabled={!isValid || isBusy}
      >
        {isVerifying
          ? "Verifying assertion…"
          : getGeneratorAssertionButtonText(isSubmitting)}
      </Button>
    </div>
  );
}
