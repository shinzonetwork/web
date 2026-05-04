"use client";

import { InputField } from "@/widget/input-field";
import {
  DELEGATE_DIGEST_MAX_LENGTH,
  INDEXER_ASSERTION_FORM_INPUTS,
  IndexerAssertionFormData,
} from "../util/form-data";
import { Button } from "@/shared/ui/button";

type IndexerAssertionDataFormProps = React.PropsWithChildren<{
  formData: IndexerAssertionFormData;
  handleInputChange: (field: string, value: string) => void;
  fieldErrors: Record<string, string | undefined>;
  onSignDigest: () => void;
  isSigning: boolean;
}>;

export function IndexerAssertionDataForm({
  formData,
  handleInputChange,
  fieldErrors,
  onSignDigest,
  isSigning,
}: IndexerAssertionDataFormProps) {
  const disabledFields = [
    "sourceChainId",
    "delegateAddress",
    "delegateSignature",
  ];
  return (
    <div className="space-y-6 w-full max-w-6xl">
      {INDEXER_ASSERTION_FORM_INPUTS.map((input) => (
        <InputField
          key={input.id}
          id={input.id}
          label={input.label}
          description={"description" in input ? input.description : undefined}
          maxLength={"maxLength" in input ? input.maxLength : undefined}
          value={String(formData[input.id as keyof IndexerAssertionFormData])}
          onChange={(value) =>
            handleInputChange(input.id as keyof IndexerAssertionFormData, value)
          }
          isTextarea={input.isTextarea}
          isSelect={input.isSelect}
          selectOptions={input.isSelect ? input.selectOptions : []}
          error={fieldErrors[input.id]}
          disabled={disabledFields.includes(input.id)}
          action={
            input.id === "delegateDigest" ? (
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={onSignDigest}
                disabled={
                  formData.delegateDigest?.trim().length !==
                    DELEGATE_DIGEST_MAX_LENGTH || isSigning
                }
              >
                {isSigning ? "Signing..." : "Sign"}
              </Button>
            ) : undefined
          }
        />
      ))}
    </div>
  );
}
