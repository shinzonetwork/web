"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { useRegistrationContext } from "@/entities/registration-process";

import { RegistrationDataForm } from "./registration-data-form";
import { useRegistrationFormV2 } from "../hooks/use-registration-form-v2";
import { useRegistrationTransaction } from "../hooks/use-registration-transaction-v2";
import {
  getRegistrationButtonText,
  validateIndexerFields,
  validateIndexerRegistrationForm,
  validateHostRegistrationForm,
  validateHostFields,
} from "../util/registration";
import { EntityRole } from "@/shared/lib";
import type {
  HostRegistrationFormData,
  IndexerRegistrationFormData,
} from "@/shared/types";

export function RegistrationFormV2() {
  const { registrationEntity } = useRegistrationContext();
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string | undefined>
  >({});
  const { formData, handleInputChange, prefilledFields } =
    useRegistrationFormV2({
      entity: registrationEntity,
    });

  const { sendRegisterTransaction, isPending, isConfirming, isConfirmed } =
    useRegistrationTransaction(formData);

  const handleRegister = async () => {
    const validatedFields =
      formData.entity === EntityRole.Generator
        ? validateIndexerFields(formData as IndexerRegistrationFormData)
        : validateHostFields(formData as HostRegistrationFormData);

    setFieldErrors(validatedFields.errors);

    if (!validatedFields.isValid) {
      return;
    }

    try {
      await sendRegisterTransaction();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Registration failed:", error);
      }
    }
  };

  const isRegistrationDisabled =
    formData.entity === EntityRole.Generator
      ? !validateIndexerRegistrationForm(
          formData as IndexerRegistrationFormData
        )
      : !validateHostRegistrationForm(formData as HostRegistrationFormData);

  return (
    <div className="space-y-6 ml-10">
      <RegistrationDataForm
        formData={formData}
        handleInputChange={handleInputChange}
        fieldErrors={fieldErrors}
        prefilledFields={prefilledFields}
      />
      <Button
        onClick={handleRegister}
        className="w-fit rounded-none bg-muted-foreground hover:bg-muted-foreground/90"
        disabled={isRegistrationDisabled || isPending || isConfirming}
      >
        {getRegistrationButtonText(isPending, isConfirming, isConfirmed)}
      </Button>
    </div>
  );
}
