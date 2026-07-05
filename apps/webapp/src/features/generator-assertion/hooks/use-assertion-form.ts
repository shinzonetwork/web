import { useCallback, useMemo, useState } from "react";
import { GeneratorAssertionFormData } from "../util/form-data";
import { sanitizeString } from "@/shared/lib";

function createInitialValues(): GeneratorAssertionFormData {
  return {
    consensusPubKey: "",
    sourceChain: "",
  };
}

export function useAssertionForm() {
  const [assertionFormData, setAssertionFormData] =
    useState<GeneratorAssertionFormData>(createInitialValues());
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string | undefined>
  >({});

  const isValid = useMemo(() => {
    return (
      assertionFormData.consensusPubKey.trim().length > 0 &&
      Boolean(assertionFormData.sourceChain?.trim())
    );
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
