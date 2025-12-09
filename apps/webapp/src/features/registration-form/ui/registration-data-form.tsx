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

interface RegistrationDataFormProps {
  formData: RegistrationFormData;
  handleInputChange: (field: string, value: string) => void;
  handleUserRoleChange: (value: string) => void;
}

export function RegistrationDataForm({
  formData,
  handleInputChange,
  handleUserRoleChange,
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
          className="flex gap-4"
          value={formData.entity.toString()}
          onValueChange={handleUserRoleChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="host" />
            <Label htmlFor="host">Host</Label>
          </div>
          {isIndexerWhitelisted && (
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="indexer" />
              <Label htmlFor="indexer">Indexer</Label>
            </div>
          )}
        </RadioGroup>
      </div>

      {REGISTRATION_FORM_INPUTS.map((input) => (
        <Inputfield
          key={input.id}
          id={input.id}
          label={input.label}
          value={formData[input.id as keyof typeof formData]?.toString() ?? ""}
          onChange={(value) => handleInputChange(input.id, value)}
          isTextarea={input.isTextarea}
        />
      ))}
    </div>
  );
}
