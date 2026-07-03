"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/ui/button";
import { AssertionDataForm } from "./assertion-data-form";
import { useAssertionForm } from "../hooks/use-assertion-form";
import { useAssertion } from "../hooks/use-assertion";
import { getGeneratorAssertionButtonText } from "../util/form-data";
import {
  buildGeneratorRegistrationUrl,
  GENERATOR_ASSERTION_PENDING_KEY,
} from "@/features/generator-onboarding";

export default function AssertionForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { assertionFormData, handleInputChange, fieldErrors, isValid } =
    useAssertionForm();
  const { handleSignDigest, isSigning, isSubmitting, handleAssertion } =
    useAssertion();

  const handleSubmit = async () => {
    if (!isValid) return;
    const signed = await handleSignDigest();
    if (!signed) return;

    const succeeded = await handleAssertion(assertionFormData, signed);
    if (!succeeded) return;

    sessionStorage.setItem(GENERATOR_ASSERTION_PENDING_KEY, "true");
    await queryClient.invalidateQueries({
      queryKey: ["generator-assertion-verification"],
    });

    const registrationUrl = buildGeneratorRegistrationUrl(
      assertionFormData.sourceChain
    );
    router.push(registrationUrl);
  };

  return (
    <div className="space-y-6 ml-10">
      <AssertionDataForm
        formData={assertionFormData}
        handleInputChange={handleInputChange}
        fieldErrors={fieldErrors}
        onSignDigest={handleSignDigest}
        isSigning={isSigning}
      />
      <Button
        onClick={handleSubmit}
        className="w-fit rounded-none bg-muted-foreground hover:bg-muted-foreground/90"
        disabled={!isValid || isSubmitting || isSigning}
      >
        {getGeneratorAssertionButtonText(isSigning, isSubmitting)}
      </Button>
    </div>
  );
}
