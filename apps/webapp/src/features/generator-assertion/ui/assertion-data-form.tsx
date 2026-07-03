import { InputField } from "@/widget/input-field";
import {
  GENERATOR_ASSERTION_FORM_INPUTS,
  GeneratorAssertionFormData,
} from "../util/form-data";

type AssertionDataFormProps = React.PropsWithChildren<{
  formData: GeneratorAssertionFormData;
  handleInputChange: (field: string, value: string) => void;
  fieldErrors: Record<string, string | undefined>;
  onSignDigest: () => void;
  isSigning: boolean;
}>;

export function AssertionDataForm({
  formData,
  handleInputChange,
  fieldErrors,
}: AssertionDataFormProps) {
  const disabledFields = [
    "delegateAddress",
    "sourceChainId",
    "delegateSignature",
  ];
  return (
    <div className="space-y-6 w-full max-w-6xl">
      {GENERATOR_ASSERTION_FORM_INPUTS.map((input) => (
        <InputField
          key={input.id}
          id={input.id}
          label={input.label}
          description={"description" in input ? input.description : undefined}
          value={String(formData[input.id as keyof GeneratorAssertionFormData])}
          onChange={(value) =>
            handleInputChange(
              input.id as keyof GeneratorAssertionFormData,
              value
            )
          }
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
