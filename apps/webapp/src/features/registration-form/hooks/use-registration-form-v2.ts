import { useCallback, useEffect, useState } from "react";
import { EntityRole, sanitizeString } from "@/shared/lib";
import { RegistrationFormDataByEntity } from "@/shared/types";
import {
  PrefillDataV2,
  usePrefillData,
} from "./use-prefill-data";

const getInitialFormData = (
  entity: EntityRole,
  prefillData: PrefillDataV2 | undefined = undefined,
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
      };

export function useRegistrationFormV2({ entity }: { entity: EntityRole }) {
  const prefillData = usePrefillData() as PrefillDataV2;

  const [formData, setFormData] = useState<
    RegistrationFormDataByEntity<typeof entity>
  >(
    () =>
      getInitialFormData(
        entity,
        prefillData,
      ) as RegistrationFormDataByEntity<typeof entity>
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
      getInitialFormData(
        entity,
        prefillData,
      ) as RegistrationFormDataByEntity<typeof entity>
    );
    // Only re-initialize when route-driven entity changes; prefillData is read from latest closure.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- avoid resetting the form every render when prefill is a new object reference
  }, [entity]);

  return {
    formData,
    handleInputChange,
  };
}
