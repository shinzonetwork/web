import { useCallback, useMemo, useState } from "react";
import {
  IndexerAssertionFormData,
  SOURCE_CHAIN,
  SOURCE_CHAIN_ID_MAP,
} from "../util/form-data";
import { sanitizeString } from "@/shared/lib";
import { useAccount } from "wagmi";

function createInitialValues(connectedAddress: string): IndexerAssertionFormData {
  return {
    consensusPubKey: "",
    delegateAddress: connectedAddress,
    sourceChain: "ethereum" as SOURCE_CHAIN,
    sourceChainId: SOURCE_CHAIN_ID_MAP.ethereum,
  };
}

export function useIndexerAssertionForm() {
  const { address: connectedAddress } = useAccount();
  const [assertionFormData, setAssertionFormData] =
    useState<IndexerAssertionFormData>(createInitialValues(connectedAddress ?? ""));
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string | undefined>
  >({});

  const isValid = useMemo(() => {
    return (
      assertionFormData.consensusPubKey.trim().length > 0 &&
      assertionFormData.delegateAddress.trim().length > 0
    );
  }, [assertionFormData]);

  const handleInputChange = useCallback((field: string, value: string) => {
    const sanitizedValue = sanitizeString(value);

    // Clear previous error for this field when user starts typing
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));

    setAssertionFormData((prev) => {
      const updatedData = { ...prev, [field]: sanitizedValue };

      if (field === "sourceChain" && value in SOURCE_CHAIN_ID_MAP) {
        updatedData.sourceChainId = SOURCE_CHAIN_ID_MAP[value as SOURCE_CHAIN];
      }

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
