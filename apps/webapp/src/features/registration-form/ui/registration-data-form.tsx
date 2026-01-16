import { Label } from "@/shared/ui/label";

import {
  REGISTRATION_FORM_INPUTS,
  type RegistrationFormData,
} from "@/shared/lib";
import { RegistrationInputField as Inputfield } from "./registration-input-field";

import { Hex } from "viem";
import { RegistrationRadioButton } from "./registration-radio-button";

interface RegistrationDataFormProps {
  formData: RegistrationFormData;
  handleInputChange: (field: string, value: string) => void;
  handleUserRoleChange: (value: string) => void;
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

      {REGISTRATION_FORM_INPUTS.map((input) => (
        <Inputfield
          key={input.id}
          id={input.id}
          label={input.label}
          value={
            (
              formData[input.id as keyof RegistrationFormData] as
                | Hex
                | undefined
            )?.toString() ?? ""
          }
          onChange={(value) => handleInputChange(input.id, value)}
          isTextarea={input.isTextarea}
          error={fieldErrors[input.id]}
          disabled={prefilledFields[input.id] ?? false}
        />
      ))}
    </div>
  );
}
