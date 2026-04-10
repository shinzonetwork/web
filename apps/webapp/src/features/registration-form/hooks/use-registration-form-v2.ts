import { useCallback, useMemo, useState } from "react";
import { EntityRole, sanitizeString } from "@/shared/lib";
import { RegistrationFormDataByEntity } from "@/shared/types";

export function useRegistrationForm({ entity }: { entity: EntityRole }) {
    const initialFormData = useMemo<RegistrationFormDataByEntity<typeof entity>>(() => entity === EntityRole.Indexer ? {
        entity: EntityRole.Indexer,
        message: "",
        defraPublicKey: "",
        defraSignedMessage: "",
        connectionString: "",
        sourceChain: "",
        sourceChainId: 0,
    } : {
        entity: EntityRole.Host,
        message: "",
        defraPublicKey: "",
        defraSignedMessage: "",
        connectionString: "",
    }, [entity]);
    // Initialize form data with prefill values
    const [formData, setFormData] = useState<RegistrationFormDataByEntity<typeof entity>>(() => initialFormData);

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
        setFormData((prev) => {
            if (newEntity === EntityRole.Indexer) {
                return {
                    ...prev,
                    entity: EntityRole.Indexer,
                    connectionString: prev.connectionString ?? "",
                    sourceChain: "sourceChain" in prev ? prev.sourceChain : "",
                    sourceChainId: "sourceChainId" in prev ? prev.sourceChainId : 0,
                };
            }
            return {
                entity: EntityRole.Host,
                message: prev.message,
                defraPublicKey: prev.defraPublicKey,
                defraSignedMessage: prev.defraSignedMessage,
                connectionString: prev.connectionString ?? "",
            };
        });
    }, []);

    return {
    formData,
    handleInputChange,
    handleUserRoleChange,
  };
}