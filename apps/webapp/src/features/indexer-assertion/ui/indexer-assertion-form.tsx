import { Button } from "@/shared/ui/button";
import { IndexerAssertionDataForm } from "./indexer-assertion-data-form";
import { useIndexerAssertionForm } from "../hooks/use-indexer-assertion-form";
import { useIndexerAssertion } from "../hooks/use-indexer-assertion";
import { getIndexerAssertionButtonText } from "../util/form-data";

export function IndexerAssertionForm() {
  const { assertionFormData, handleInputChange, fieldErrors, isValid } =
    useIndexerAssertionForm();
  const { handleSignDigest, isSigning, isSubmitting, handleAssertion } =
    useIndexerAssertion();

  const handleSubmit = async () => {
    if (!isValid) return;
    const signed = await handleSignDigest();
    if (!signed) return;
    await handleAssertion(assertionFormData, signed);
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
        {getIndexerAssertionButtonText(isSigning, isSubmitting)}
      </Button>
    </div>
  );
}
