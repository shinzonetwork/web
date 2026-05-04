"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { useRegistrationContext } from "@/entities/registration-process";

import { RegistrationDataForm } from "./registration-data-form";
import { useRegistrationFormV2 } from "../hooks/use-registration-form-v2";
import { useRegistrationTransaction } from "../hooks/use-registration-transaction-v2";
import {
  getRegistrationButtonText,
  EntityRole,
  validateIndexerFields,
  validateIndexerRegistrationForm,
  validateHostRegistrationForm,
  validateHostFields,
} from "@/shared/lib";
import type {
  HostRegistrationFormData,
  IndexerRegistrationFormData,
} from "@/shared/types";

export function RegistrationFormV2() {
  const { registrationEntity } = useRegistrationContext();
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string | undefined>
  >({});
  const { formData, handleInputChange } = useRegistrationFormV2({
    entity: registrationEntity,
  });

  const { sendRegisterTransaction, isPending, isConfirming, isConfirmed } =
    useRegistrationTransaction(formData);

  const handleRegister = async () => {
    const validatedFields =
      formData.entity === EntityRole.Indexer
        ? validateIndexerFields(formData as IndexerRegistrationFormData)
        : validateHostFields(formData as HostRegistrationFormData);

    setFieldErrors(validatedFields.errors);

    if (!validatedFields.isValid) {
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

  let isRegistrationDisabled = false;
  if (formData.entity === EntityRole.Indexer) {
    isRegistrationDisabled = !validateIndexerRegistrationForm(
      formData as IndexerRegistrationFormData
    );
  } else {
    isRegistrationDisabled = !validateHostRegistrationForm(
      formData as HostRegistrationFormData
    );
  }

  return (
    <div className="space-y-6 ml-10">
      <RegistrationDataForm
        formData={formData}
        handleInputChange={handleInputChange}
        fieldErrors={fieldErrors}
        prefilledFields={{}}
      />
      <Button
        onClick={handleRegister}
        className="w-fit rounded-none"
        disabled={isRegistrationDisabled || isPending || isConfirming}
      >
        {getRegistrationButtonText(isPending, isConfirming, isConfirmed)}
      </Button>
    </div>
  );
}
