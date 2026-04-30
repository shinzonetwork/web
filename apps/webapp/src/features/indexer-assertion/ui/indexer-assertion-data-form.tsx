"use client";

import { RegistrationInputField } from "@/features/registration-form/ui/registration-input-field";
import { INDEXER_ASSERTION_FORM_INPUTS, IndexerAssertionFormData } from "../util/form-data";

type IndexerAssertionDataFormProps = React.PropsWithChildren<{
  formData: IndexerAssertionFormData;
  isValid: boolean;
  handleInputChange: (field: string, value: string) => void;
  fieldErrors: Record<string, string | undefined>;
}>;

export function IndexerAssertionDataForm({ formData, isValid, handleInputChange, fieldErrors }: IndexerAssertionDataFormProps) {
  const disabledFields = ["sourceChainId", "delegateAddress", "delegateSignature"];
  return (
    <div className="space-y-6 w-full max-w-6xl">
      {INDEXER_ASSERTION_FORM_INPUTS.map((input) => (
        <RegistrationInputField
          key={input.id}
          id={input.id}
          label={input.label}
          value={String(formData[input.id as keyof IndexerAssertionFormData])}
          onChange={(value) => handleInputChange(input.id as keyof IndexerAssertionFormData, value)}
          isTextarea={input.isTextarea}
          isSelect={input.isSelect}
          selectOptions={input.isSelect ? input.selectOptions : []}
          error={fieldErrors[input.id]}
          disabled={disabledFields.includes(input.id)}
        />
      ))}
    </div>
  );
}
