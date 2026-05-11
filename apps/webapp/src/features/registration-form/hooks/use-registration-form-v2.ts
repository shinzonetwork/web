import { useCallback, useState } from "react";
import { EntityRole, sanitizeString } from "@/shared/lib";
import { RegistrationFormDataByEntity } from "@/shared/types";

const getInitialFormData = (entity: EntityRole) =>
  entity === EntityRole.Indexer
    ? {
        entity: EntityRole.Indexer,
        message: "",
        defraPublicKey: "",
        defraSignedMessage: "",
        connectionString: "",
        sourceChain: "",
        sourceChainId: 0,
      }
    : {
        entity: EntityRole.Host,
        message: "",
        defraPublicKey: "",
        defraSignedMessage: "",
        connectionString: "",
      };

export function useRegistrationForm({ entity }: { entity: EntityRole }) {
  const [formData, setFormData] = useState<
    RegistrationFormDataByEntity<typeof entity>
  >(
    () =>
      getInitialFormData(entity) as RegistrationFormDataByEntity<typeof entity>
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
