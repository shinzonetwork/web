"use client";

import { useAccount } from "wagmi";

import { Label } from "@/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";

import {
  REGISTRATION_FORM_INPUTS,
  type RegistrationFormData,
} from "@/shared/lib";
import { RegistrationInputField as Inputfield } from "./registration-input-field";

import { isIndexerWhitelisted as isIndexerWhitelistedFunction } from "@/shared/lib";
import { Hex } from "viem";

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
  const { address } = useAccount();
  const isIndexerWhitelisted = isIndexerWhitelistedFunction(
    address ? address : undefined
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="userRole" className="text-sm font-medium">
          Select a role
        </Label>
        <RadioGroup
          className={`flex gap-4 ${prefilledFields.entity ? "opacity-70 cursor-not-allowed" : ""}`}
          value={formData.entity.toString()}
          onValueChange={handleUserRoleChange}
          disabled={prefilledFields.entity}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="1"
              id="host"
              disabled={prefilledFields.entity}
            />
            <Label htmlFor="host">Host</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="2"
              id="indexer"
              disabled={!isIndexerWhitelisted || prefilledFields.entity}
            />
            <Label htmlFor="indexer">Indexer</Label>
          </div>
        </RadioGroup>
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
