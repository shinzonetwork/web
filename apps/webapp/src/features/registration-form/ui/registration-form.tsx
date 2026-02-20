"use client";

import { Button } from "@/shared/ui/button";

import { RegistrationDataForm } from "./registration-data-form";
import { useRegistrationForm } from "../hooks/use-registration-form";
import { useRegistrationTransaction } from "../hooks/use-registration-transaction";
import {
  getRegistrationButtonText,
  TOAST_CONFIG,
  validateRegistrationForm,
  validateRequiredFields,
  isIndexerWhitelisted,
} from "@/shared/lib";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

export function RegistrationForm() {
  const { address } = useAccount();
  const {
    formData,
    handleInputChange,
    handleUserRoleChange,
    fieldErrors,
    validateHexFields,
    prefilledFields,
  } = useRegistrationForm();

  const { sendRegisterTransaction, isPending, isConfirming, isConfirmed } =
    useRegistrationTransaction(formData);

  const handleRegister = async () => {
    // Validate required fields first
    const { isValid } = validateRequiredFields(formData);
    if (!isValid) {
      toast.error("Please fill in all required fields", TOAST_CONFIG);
      return;
    }

    // Validate hex format on button click
    const isHexValid = validateHexFields();
    if (!isHexValid) {
      toast.error("Please fill in with valid hex strings", TOAST_CONFIG);
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

  const isRegistrationDisabled = !validateRegistrationForm(address, formData);

  return (
    <div className="space-y-6 ml-10">
      <RegistrationDataForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleUserRoleChange={handleUserRoleChange}
        fieldErrors={fieldErrors}
        prefilledFields={prefilledFields}
      />
      <Button
        onClick={handleRegister}
        className="w-fit rounded-full"
        disabled={isRegistrationDisabled || isPending || isConfirming}
      >
        {getRegistrationButtonText(isPending, isConfirming, isConfirmed)}
      </Button>
      {!isIndexerWhitelisted(address) && (
        <div className="text-sm text-red-500">
          You are not whitelisted as an indexer. Please contact the Shinzo team to be whitelisted.
        </div>
      )}
    </div>
  );
}
