import { Button } from "@/shared/ui/button";
import { IndexerAssertionDataForm } from "./indexer-assertion-data-form";
import { useIndexerAssertionForm } from "../hooks/use-indexer-assertion-form";
import { getAssertionButtonText } from "../util/form-data";

export function IndexerAssertionForm() {
    const { assertionFormData, handleInputChange, fieldErrors, isValid } = useIndexerAssertionForm();
    
      const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        // event.preventDefault();
        // if (!onSubmit) return;
    
        // try {
        //   setIsSubmitting(true);
        //   await onSubmit(formValues);
        // } finally {
        //   setIsSubmitting(false);
        // }
      };
    return (
        <div className="space-y-6 ml-10">
          <IndexerAssertionDataForm
            formData={assertionFormData}
            isValid={isValid}
            handleInputChange={handleInputChange}
            fieldErrors={fieldErrors}
          />
          <Button
            onClick={handleSubmit}
            className="w-fit rounded-full"
            disabled={!isValid}
          >
            {/* {getAssertionButtonText(isPending, isConfirming, isConfirmed)} */}
            Submit Assertion
          </Button>
        </div>
      );
}