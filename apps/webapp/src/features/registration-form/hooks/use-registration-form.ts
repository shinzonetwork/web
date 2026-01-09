"use client";

import { useState, useCallback, useMemo } from "react";
import { EntityRole, sanitizeString } from "@/shared/lib";
import type { RegistrationFormData } from "@/shared/lib";
import { isHex } from "viem";
import { usePrefillData } from "./use-prefill-data";

/**
 * Hook to manage configuration form state with input sanitization
 */
export function useRegistrationForm() {
  const prefillData = usePrefillData();

  // Convert prefill role string to EntityRole enum
  const getInitialEntity = (): EntityRole => {
    if (prefillData.role === "host") return EntityRole.Host;
    if (prefillData.role === "indexer") return EntityRole.Indexer;
    return EntityRole.Host;
  };

  // Determine which fields are prefilled (non-empty values from global data)
  const prefilledFields = useMemo(
    () => ({
      entity: prefillData.role !== undefined,
      message: prefillData.signedMessage !== undefined,
      defraPublicKey: prefillData.defraPublicKey !== undefined,
      defraSignedMessage: prefillData.defraPublicKeySignedMessage !== undefined,
      peerId: prefillData.peerId !== undefined,
      peerSignedMessage: prefillData.peerSignedMessage !== undefined,
    }),
    [prefillData]
  );

  const [formData, setFormData] = useState<RegistrationFormData>({
    message: prefillData.signedMessage,
    defraPublicKey: prefillData.defraPublicKey,
    defraSignedMessage: prefillData.defraPublicKeySignedMessage,
    peerId: prefillData.peerId,
    peerSignedMessage: prefillData.peerSignedMessage,
    entity: getInitialEntity(),
  });

  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string | undefined>
  >({});

  const handleInputChange = useCallback((field: string, value: string) => {
    const sanitizedValue = sanitizeString(value);

    // Clear previous error for this field when user starts typing
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));

    // Update form data without validation (validation happens on button click)
    setFormData((prev) => ({ ...prev, [field]: sanitizedValue || undefined }));
  }, []);

  const validateHexFields = useCallback(() => {
    const errors: Record<string, string> = {};
    const hexFields = [
      "message",
      "defraPublicKey",
      "defraSignedMessage",
      "peerId",
      "peerSignedMessage",
    ] as const;

    for (const field of hexFields) {
      const value = formData[field];

      // Skip validation if field is empty
      if (!value) {
        continue;
      }

      // Validate hex format
      if (!isHex(value)) {
        errors[field] =
          "Invalid hex format. Please enter a valid hex string (e.g., 0x1234abcd)";
        continue;
      }

      // Validate even length (each byte = 2 hex chars)
      const hexContent = value.startsWith("0x") ? value.slice(2) : value;
      if (hexContent.length > 0 && hexContent.length % 2 !== 0) {
        errors[field] =
          "Hex string must have even length (each byte requires 2 hex characters)";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleUserRoleChange = useCallback((value: string) => {
    const parsed = parseInt(value, 10);
    if (
      isNaN(parsed) ||
      (parsed !== EntityRole.Host && parsed !== EntityRole.Indexer)
    ) {
      return;
    }
    const newEntity = parsed as EntityRole;
    setFormData((prev) => ({ ...prev, entity: newEntity }));
  }, []);

  return {
    formData,
    handleInputChange,
    handleUserRoleChange,
    fieldErrors,
    validateHexFields,
    prefilledFields,
  };
}
