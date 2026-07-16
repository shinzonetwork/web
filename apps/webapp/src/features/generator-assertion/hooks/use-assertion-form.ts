"use client";

import { useCallback, useMemo, useState } from "react";
import { GeneratorAssertionFormData } from "../util/form-data";
import { sanitizeString } from "@/shared/lib";
import {
  getAssertionFormPrefilledFields,
  getGeneratorAssertionFormPrefill,
  type GeneratorAssertionFormPrefill,
} from "@/shared/lib/utils/prefill-data";

function createInitialValues(
  urlPrefill: GeneratorAssertionFormPrefill
): GeneratorAssertionFormData {
  return {
    validatorPublicKey: urlPrefill.validatorPublicKey ?? "",
    assertionAuthority: urlPrefill.assertionAuthority ?? "",
    sourceChain: urlPrefill.sourceChain ?? "",
  };
}

export function useAssertionForm() {
  const urlPrefill = useMemo(() => getGeneratorAssertionFormPrefill(), []);
  const prefilledFields = useMemo(
    () => getAssertionFormPrefilledFields(urlPrefill),
    [urlPrefill]
  );

  const [assertionFormData, setAssertionFormData] =
    useState<GeneratorAssertionFormData>(() => createInitialValues(urlPrefill));
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string | undefined>
  >({});

  const isValid = useMemo(() => {
    return (
      assertionFormData.validatorPublicKey.trim().length > 0 &&
      assertionFormData.assertionAuthority.trim().length > 0 &&
      Boolean(assertionFormData.sourceChain?.trim())
    );
  }, [assertionFormData]);

  const handleInputChange = useCallback((field: string, value: string) => {
    const sanitizedValue = sanitizeString(value);

    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));

    setAssertionFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
  }, []);

  return {
    assertionFormData,
    handleInputChange,
    fieldErrors,
    prefilledFields,
    isValid,
  };
}
