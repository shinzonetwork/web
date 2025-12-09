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
  const { formData, handleInputChange, handleUserRoleChange } =
    useRegistrationForm();

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

  return (
    <div className="space-y-6">
      <RegistrationDataForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleUserRoleChange={handleUserRoleChange}
      />
      <Button
        onClick={handleRegister}
        className="w-1/12 rounded-full"
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
