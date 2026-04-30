import { useCallback, useMemo, useState } from "react";
import { IndexerAssertionFormData, SOURCE_CHAIN, SOURCE_CHAIN_ID_MAP } from "../util/form-data";
import { sanitizeString } from "@/shared/lib";

function createInitialValues(): IndexerAssertionFormData {
    return {
      consensusPubKey: "",
      delegateAddress: "",
      sourceChain: "ethereum" as SOURCE_CHAIN,
      sourceChainId: SOURCE_CHAIN_ID_MAP.ethereum,
      assertionId: `assert-${Date.now()}`,
      delegateDigest: "",
      delegateSignature: "",
    };
  }

export function useIndexerAssertionForm() {
    const [assertionFormData, setAssertionFormData] = useState<IndexerAssertionFormData>(createInitialValues());
    const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({});

    const isValid = useMemo(() => {
        return (
            assertionFormData.consensusPubKey.trim().length > 0 &&
            assertionFormData.delegateAddress.trim().length > 0 &&
            assertionFormData.assertionId.trim().length > 0 &&
            assertionFormData.delegateDigest.trim().length > 0 &&
            assertionFormData.delegateSignature.trim().length > 0
        );
    }, [assertionFormData]);

    const handleInputChange = useCallback((field: string, value: string) => {
        const sanitizedValue = sanitizeString(value);
        // Clear previous error for this field when user starts typing
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));

        // Update form data without validation (validation happens on button click)
        setAssertionFormData((prev) => ({ ...prev, [field]: sanitizedValue || undefined }));
        
        if (field === "sourceChain" && value in SOURCE_CHAIN_ID_MAP) {
            setAssertionFormData((prev) => ({ ...prev, sourceChainId: SOURCE_CHAIN_ID_MAP[value as SOURCE_CHAIN] }));
        }
    }, []);

    return {
        assertionFormData,
        handleInputChange,
        fieldErrors,
        isValid,
    };
}