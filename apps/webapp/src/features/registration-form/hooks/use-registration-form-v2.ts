"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { EntityRole, sanitizeString } from "@/shared/lib";
import { RegistrationFormDataByEntity } from "@/shared/types";
import {
  getRegistrationPrefilledFieldsV2,
  getRegistrationPrefillV2,
  type PrefillDataV2,
} from "../lib/prefill-data";

const getInitialFormData = (
  entity: EntityRole,
  prefillData: PrefillDataV2 | undefined = undefined
) =>
  entity === EntityRole.Generator
    ? {
        entity: EntityRole.Generator,
        message: prefillData?.signedMessage ?? "",
        defraPublicKey: prefillData?.defraPublicKey ?? "",
        defraSignedMessage: prefillData?.defraPublicKeySignedMessage ?? "",
        connectionString: prefillData?.connectionString ?? "",
      }
    : {
        entity: EntityRole.Host,
        message: prefillData?.signedMessage ?? "",
        defraPublicKey: prefillData?.defraPublicKey ?? "",
        defraSignedMessage: prefillData?.defraPublicKeySignedMessage ?? "",
        connectionString: prefillData?.connectionString ?? "",
        endpointAddress: prefillData?.endpointAddress ?? "",
      };

export function useRegistrationFormV2({ entity }: { entity: EntityRole }) {
  const prefillData = useMemo(() => getRegistrationPrefillV2(), []);
  const prefilledFields = useMemo(
    () => getRegistrationPrefilledFieldsV2(prefillData),
    [prefillData]
  );

  const [formData, setFormData] = useState<
    RegistrationFormDataByEntity<typeof entity>
  >(
    () =>
      getInitialFormData(entity, prefillData) as RegistrationFormDataByEntity<
        typeof entity
      >
  );

  const handleInputChange = useCallback((field: string, value: string) => {
    if (field === "entity") {
      return;
    }
    const sanitizedValue = sanitizeString(value);
    setFormData((prev) => ({ ...prev, [field]: sanitizedValue || undefined }));
  }, []);

  useEffect(() => {
    setFormData(
      getInitialFormData(entity, prefillData) as RegistrationFormDataByEntity<
        typeof entity
      >
    );
  }, [entity, prefillData]);

  return {
    formData,
    handleInputChange,
    prefilledFields,
  };
}
