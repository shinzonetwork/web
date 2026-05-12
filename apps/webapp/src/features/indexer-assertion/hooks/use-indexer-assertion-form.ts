import { useCallback, useMemo, useState } from "react";
import { IndexerAssertionFormData, SOURCE_CHAIN } from "../util/form-data";
import { sanitizeString } from "@/shared/lib";

function createInitialValues(): IndexerAssertionFormData {
  return {
    consensusPubKey: "",
    sourceChain: "ethereum" as SOURCE_CHAIN,
  };
}

export function useIndexerAssertionForm() {
  const [assertionFormData, setAssertionFormData] =
    useState<IndexerAssertionFormData>(createInitialValues());
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string | undefined>
  >({});

  const isValid = useMemo(() => {
    return assertionFormData.consensusPubKey.trim().length > 0;
  }, [assertionFormData]);

  const handleInputChange = useCallback((field: string, value: string) => {
    const sanitizedValue = sanitizeString(value);

    // Clear previous error for this field when user starts typing
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));

    setAssertionFormData((prev) => {
      const updatedData = { ...prev, [field]: sanitizedValue };

      return updatedData;
    });
  }, []);

  return {
    assertionFormData,
    handleInputChange,
    fieldErrors,
    isValid,
  };
}
