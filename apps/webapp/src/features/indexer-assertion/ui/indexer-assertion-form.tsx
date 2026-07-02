"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/ui/button";
import { IndexerAssertionDataForm } from "./indexer-assertion-data-form";
import { useIndexerAssertionForm } from "../hooks/use-indexer-assertion-form";
import { useIndexerAssertion } from "../hooks/use-indexer-assertion";
import { getIndexerAssertionButtonText } from "../util/form-data";
import {
  buildIndexerRegistrationUrl,
  INDEXER_ASSERTION_PENDING_KEY,
} from "@/features/indexer-onboarding";

export default function IndexerAssertionForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { assertionFormData, handleInputChange, fieldErrors, isValid } =
    useIndexerAssertionForm();
  const { handleSignDigest, isSigning, isSubmitting, handleAssertion } =
    useIndexerAssertion();

  const handleSubmit = async () => {
    if (!isValid) return;
    const signed = await handleSignDigest();
    if (!signed) return;

    const succeeded = await handleAssertion(assertionFormData, signed);
    if (!succeeded) return;

    sessionStorage.setItem(INDEXER_ASSERTION_PENDING_KEY, "true");
    await queryClient.invalidateQueries({
      queryKey: ["indexer-assertion-verification"],
    });

    const registrationUrl = buildIndexerRegistrationUrl(
      assertionFormData.sourceChain
    );
    router.push(registrationUrl);
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
        className="w-fit rounded-none bg-muted-foreground hover:bg-muted-foreground/90"
        disabled={!isValid || isSubmitting || isSigning}
      >
        {getIndexerAssertionButtonText(isSigning, isSubmitting)}
      </Button>
    </div>
  );
}
