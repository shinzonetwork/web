"use client";

import { Button } from "@/shared/ui/button";

import { RegistrationDataForm } from "./registration-data-form";
import { useRegistrationForm } from "../hooks/use-registration-form";
import { useRegistrationTransaction } from "../hooks/use-registration-transaction";
import {
  getRegistrationButtonText,
  validateRegistrationForm,
  validateRequiredFields,
} from "@/shared/lib";

export function RegistrationForm() {
  const {
    formData,
    handleInputChange,
    handleUserRoleChange,
    fieldErrors,
    validateHexFields,
  } = useRegistrationForm();

  const {
    sendRegisterTransaction,
    isPending,
    isConfirming,
    isConfirmed,
    sendError,
  } = useRegistrationTransaction(formData);

  const handleRegister = async () => {
    // Validate required fields first
    const { isValid } = validateRequiredFields(formData);
    if (!isValid) {
      return;
    }

    // Validate hex format on button click
    const isHexValid = validateHexFields();
    if (!isHexValid) {
      return;
    }

    try {
      await sendRegisterTransaction();
    } catch (error) {
      // Error is already handled in the hook
      if (process.env.NODE_ENV === "development") {
        console.error("Registration failed:", error);
      }
    }
  };

  const isRegistrationDisabled = !validateRegistrationForm(formData);

  return (
    <div className="space-y-6">
      <RegistrationDataForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleUserRoleChange={handleUserRoleChange}
        fieldErrors={fieldErrors}
      />
      <Button
        onClick={handleRegister}
        className="w-fit rounded-full"
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
  );
}
