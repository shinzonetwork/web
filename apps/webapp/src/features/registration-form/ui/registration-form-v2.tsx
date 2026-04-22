"use client";

import { useCallback, useState } from "react";
import { Button } from "@/shared/ui/button";

import { RegistrationDataForm } from "./registration-data-form";
import { useRegistrationForm } from "../hooks/use-registration-form-v2";
import { useRegistrationTransaction } from "../hooks/use-registration-transaction-v2";
import {
  getRegistrationButtonText,
  TOAST_CONFIG,
  validateEntity,
  EntityRole,
  validateIndexerFields,
  validateSharedFieldsV2,
  validateIndexerRegistrationForm,
  validateHostRegistrationForm,
} from "@/shared/lib";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import type {
  HostRegistrationFormData,
  IndexerRegistrationFormData,
} from "@/shared/types";

export function RegistrationFormV2() {
  const { address } = useAccount();
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string | undefined>
  >({});
  const { formData, handleInputChange, handleUserRoleChange } =
    useRegistrationForm({ entity: EntityRole.Host });

  const {
    sendRegisterTransaction,
    isPending,
    isConfirming,
    isConfirmed,
    resetTransactionState,
  } = useRegistrationTransaction(formData);

  const handleEntityChange = useCallback(
    (value: string) => {
      handleUserRoleChange(value);
      setFieldErrors({});
      resetTransactionState();
    },
    [handleUserRoleChange, resetTransactionState]
  );

  const handleRegister = async () => {
    const validatedFields =
      formData.entity === EntityRole.Indexer
        ? validateIndexerFields(formData as IndexerRegistrationFormData)
        : validateSharedFieldsV2(formData as HostRegistrationFormData);

    setFieldErrors(validatedFields.errors);

    if (!validatedFields.isValid) {
      toast.error(
        Object.values(validatedFields.errors).filter(Boolean).join("\n"),
        TOAST_CONFIG
      );
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
        handleUserRoleChange={handleEntityChange}
        fieldErrors={fieldErrors}
        prefilledFields={{}}
      />
      <Button
        onClick={handleRegister}
        className="w-fit rounded-full"
        disabled={isRegistrationDisabled || isPending || isConfirming}
      >
        {getRegistrationButtonText(isPending, isConfirming, isConfirmed)}
      </Button>
      {!validateEntity(address, formData.entity) && (
        <div className="text-sm text-red-500">
          You are not whitelisted as an indexer. Please contact the Shinzo team
          to be whitelisted.
        </div>
      )}
    </div>
  );
}
