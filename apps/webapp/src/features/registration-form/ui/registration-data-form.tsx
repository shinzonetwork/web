import { Label } from "@/shared/ui/label";

import {
  EntityRole,
  REGISTRATION_FORM_INPUTS,
  REGISTRATION_FORM_INPUTS_HOST,
  REGISTRATION_FORM_INPUTS_INDEXER,
  type RegistrationFormData,
  isRegistrationV2,
} from "@/shared/lib";
import { InputField } from "@/widget";

import { Hex } from "viem";
import { RegistrationRadioButton } from "./registration-radio-button";
import type {
  HostRegistrationFormData,
  IndexerRegistrationFormData,
} from "@/shared/types";

function v2FieldToString(value: unknown): string {
  if (value === undefined || value === null) return "";
  return String(value);
}

interface RegistrationDataFormProps {
  formData:
    | RegistrationFormData
    | IndexerRegistrationFormData
    | HostRegistrationFormData;
  handleInputChange: (field: string, value: string) => void;
  /** V1 only: Host/Indexer radio. Omitted for V2 (entity comes from the registration route). */
  handleUserRoleChange?: (value: string) => void;
  fieldErrors?: Record<string, string | undefined>;
  prefilledFields?: Record<string, boolean>;
}

export function RegistrationDataForm({
  formData,
  handleInputChange,
  handleUserRoleChange,
  fieldErrors = {},
  prefilledFields = {},
}: RegistrationDataFormProps) {
  return (
    <div className="space-y-6 w-full max-w-6xl">
      {!isRegistrationV2() && handleUserRoleChange ? (
        <div className="space-y-4">
          <Label htmlFor="userRole" className="text-sm font-medium">
            Select a role <span className="text-xs text-red-500">*</span>
          </Label>
          <RegistrationRadioButton
            selectedEntityValue={formData.entity.toString()}
            prefilledEntityValue={prefilledFields.entity}
            onChange={handleUserRoleChange}
          />
        </div>
      ) : null}

      {isRegistrationV2()
        ? formData.entity === EntityRole.Indexer
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
            })
        : REGISTRATION_FORM_INPUTS.map((input) => {
            const v1Form = formData as RegistrationFormData;
            return (
              <InputField
                key={input.id}
                id={input.id}
                label={input.label}
                value={
                  (
                    v1Form[input.id as keyof RegistrationFormData] as
                      | Hex
                      | undefined
                  )?.toString() ?? ""
                }
                onChange={(value) => handleInputChange(input.id, value)}
                isTextarea={input.isTextarea}
                error={fieldErrors[input.id]}
                disabled={prefilledFields[input.id] ?? false}
              />
            );
          })}
    </div>
  );
}
