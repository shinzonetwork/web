"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";

import { useAccount } from "wagmi";
import { Hex } from "viem";

import { REGISTRATION_FORM_INPUTS } from "@/lib/utils/configuration";
import {
  validateRegistrationForm,
  getRegistrationButtonText,
  validateRequiredFields,
} from "@/lib/utils/configuration";
import { useConfigurationForm } from "@/hooks/useConfigurationForm";
import { useRegistrationTransaction } from "@/hooks/useRegistrationTransaction";
import { ConfigurationFormField as FormField } from "./configuration-form-field";
import FormHeader from "@/components/header/form-header";
import { isIndexerWhitelisted as isIndexerWhitelistedFunction } from "@/lib/indexer-whitelist";

export default function Configuration() {
  const { address } = useAccount();

  const { formData, handleInputChange, handleUserRoleChange } =
    useConfigurationForm();

  const {
    sendRegisterTransaction,
    isPending,
    isConfirming,
    isConfirmed,
    sendError,
  } = useRegistrationTransaction(formData);

  const handleRegister = async () => {
    // Validate inputs before sending transaction
    const { isValid, errors } = validateRequiredFields(formData);
    if (!isValid) {
      alert(errors.join("\n"));
      return;
    }

    try {
      await sendRegisterTransaction();
    } catch (error) {
      // Error is already handled in the hook
      console.error("Registration failed:", error);
    }
  };

  const isRegistrationDisabled = !validateRegistrationForm(formData);

  const isIndexerWhitelisted = isIndexerWhitelistedFunction(address as Hex);

  return (
    <div className="space-y-6 mx-12 my-12">
      <FormHeader
        title="Configuration"
        description="Subtext on why we need this configuration information."
      />

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="userRole" className="text-sm font-medium">
            Select a role
          </Label>
          <RadioGroup
            className="flex gap-4"
            value={formData.entity.toString()}
            onValueChange={handleUserRoleChange}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="indexer" />
              <Label htmlFor="indexer">Host</Label>
            </div>
            {isIndexerWhitelisted && (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="host" />
                <Label htmlFor="host">Indexer</Label>
              </div>
            )}
          </RadioGroup>
        </div>

        {REGISTRATION_FORM_INPUTS.map((input) => (
          <FormField
            key={input.id}
            id={input.id}
            label={input.label}
            value={formData[input.id as keyof typeof formData] as string}
            onChange={(value) => handleInputChange(input.id, value)}
            isTextarea={input.isTextarea}
          />
        ))}

        <Button
          onClick={handleRegister}
          className="w-full"
          disabled={isRegistrationDisabled || isPending || isConfirming}
        >
          {getRegistrationButtonText(isPending, isConfirming, isConfirmed)}
        </Button>

        {sendError && (
          <div className="text-sm text-destructive mt-2">
            Error: {sendError.message}
          </div>
        )}
      </div>
    </div>
  );
}
