import { useCallback, useState } from "react";
import { EntityRole, sanitizeString } from "@/shared/lib";
import { RegistrationFormDataByEntity } from "@/shared/types";
import { PrefillDataV2, usePrefillData } from "./use-prefill-data";

const getInitialFormData = (entity: EntityRole, prefillData: PrefillDataV2 | undefined = undefined) =>
  entity === EntityRole.Indexer
    ? {
        entity: EntityRole.Indexer,
        message: prefillData?.signedMessage ?? "",
        defraPublicKey: prefillData?.defraPublicKey ?? "",
        defraSignedMessage: prefillData?.defraPublicKeySignedMessage ?? "",
        connectionString: prefillData?.connectionString ?? "",
        sourceChain: prefillData?.sourceChain ?? "",
        sourceChainId: prefillData?.sourceChainId ?? 0,
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
      getInitialFormData(entity, prefillData) as RegistrationFormDataByEntity<typeof entity>
  );

  const handleInputChange = useCallback((field: string, value: string) => {
    const sanitizedValue = sanitizeString(value);
    // Update form data without validation (validation happens on button click)
    setFormData((prev) => ({ ...prev, [field]: sanitizedValue || undefined }));
  }, []);

  const handleUserRoleChange = useCallback((value: string) => {
    const parsed = parseInt(value, 10);
    if (
      isNaN(parsed) ||
      (parsed !== EntityRole.Indexer && parsed !== EntityRole.Host)
    ) {
      return;
    }
    const newEntity = parsed as EntityRole;
    setFormData(
      getInitialFormData(newEntity) as RegistrationFormDataByEntity<
        typeof entity
      >
    );
  }, []);

  return {
    formData,
    handleInputChange,
    handleUserRoleChange,
  };
}
