import {
  REGISTRATION_FORM_INPUTS_HOST,
  REGISTRATION_FORM_INPUTS_INDEXER,
} from "../util/registration";
import { EntityRole } from "@/shared/lib";
import { InputField } from "@/widget";
import type {
  HostRegistrationFormData,
  IndexerRegistrationFormData,
} from "@/shared/types";

function v2FieldToString(value: unknown): string {
  if (value === undefined || value === null) return "";
  return String(value);
}

interface RegistrationDataFormProps {
  formData: IndexerRegistrationFormData | HostRegistrationFormData;
  handleInputChange: (field: string, value: string) => void;
  fieldErrors?: Record<string, string | undefined>;
  prefilledFields?: Record<string, boolean>;
}

export function RegistrationDataForm({
  formData,
  handleInputChange,
  fieldErrors = {},
  prefilledFields = {},
}: RegistrationDataFormProps) {
  return (
    <div className="space-y-6 w-full max-w-6xl">
      {formData.entity === EntityRole.Generator
        ? REGISTRATION_FORM_INPUTS_INDEXER.map((input) => {
            const indexerForm = formData as IndexerRegistrationFormData;
            return (
              <InputField
                key={input.id}
                id={input.id}
                label={input.label}
                value={v2FieldToString(
                  indexerForm[input.id as keyof IndexerRegistrationFormData]
                )}
                onChange={(value) => handleInputChange(input.id, value)}
                isTextarea={input.isTextarea}
                error={fieldErrors[input.id]}
                disabled={prefilledFields[input.id] ?? false}
                required={input.required}
                isSelect={input.isSelect}
              />
            );
          })
        : REGISTRATION_FORM_INPUTS_HOST.map((input) => {
            const hostForm = formData as HostRegistrationFormData;
            return (
              <InputField
                key={input.id}
                id={input.id}
                label={input.label}
                value={v2FieldToString(
                  hostForm[input.id as keyof HostRegistrationFormData]
                )}
                onChange={(value) => handleInputChange(input.id, value)}
                isTextarea={input.isTextarea}
                error={fieldErrors[input.id]}
                disabled={prefilledFields[input.id] ?? false}
                required={input.required}
              />
            );
          })}
    </div>
  );
}
