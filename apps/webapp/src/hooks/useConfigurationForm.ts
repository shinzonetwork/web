"use client";

import { useState, useCallback } from "react";
import { EntityRole } from "@/lib/constants";
import { sanitizeString } from "@/lib/utils/validate";
import type { ConfigurationFormData } from "@/lib/utils/configuration";

/**
 * Hook to manage configuration form state with input sanitization
 */
export function useConfigurationForm() {
  const [formData, setFormData] = useState<ConfigurationFormData>({
    message: undefined,
    defraPublicKey: undefined,
    defraSignedMessage: undefined,
    peerId: undefined,
    peerSignedMessage: undefined,
    entity: EntityRole.Host,
  });

  const handleInputChange = useCallback((field: string, value: string) => {
    const sanitizedValue = sanitizeString(value);
    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
  }, []);

  const handleUserRoleChange = useCallback((value: string) => {
    const newEntity = parseInt(value) as EntityRole;
    setFormData((prev) => ({ ...prev, entity: newEntity }));
  }, []);

  return {
    formData,
    handleInputChange,
    handleUserRoleChange,
  };
}
