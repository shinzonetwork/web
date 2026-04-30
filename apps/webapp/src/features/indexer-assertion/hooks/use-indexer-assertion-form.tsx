import { useCallback, useEffect, useMemo, useState } from "react";
import { IndexerAssertionFormData, SOURCE_CHAIN, SOURCE_CHAIN_ID_MAP } from "../util/form-data";
import { sanitizeString } from "@/shared/lib";
import { useAccount, useSignMessage } from "wagmi";

function createInitialValues(delegateAddress: string = ""): IndexerAssertionFormData {
    return {
      consensusPubKey: "",
      delegateAddress,
      sourceChain: "ethereum" as SOURCE_CHAIN,
      sourceChainId: SOURCE_CHAIN_ID_MAP.ethereum,
      assertionId: `assert-${Date.now()}`,
      delegateDigest: "",
      delegateSignature: "",
    };
  }

export function useIndexerAssertionForm() {
    const { address } = useAccount();
    const { signMessageAsync, isPending: isSigning } = useSignMessage();
    const [assertionFormData, setAssertionFormData] = useState<IndexerAssertionFormData>(
        createInitialValues(address ?? "")
    );
    const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({});

    useEffect(() => {
        setAssertionFormData((prev) => ({
            ...prev,
            delegateAddress: address ?? "",
        }));
    }, [address]);

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

        setAssertionFormData((prev) => ({ ...prev, [field]: sanitizedValue || undefined }));
        
        if (field === "sourceChain" && value in SOURCE_CHAIN_ID_MAP) {
            setAssertionFormData((prev) => ({ ...prev, sourceChainId: SOURCE_CHAIN_ID_MAP[value as SOURCE_CHAIN] }));
        }
    }, []);

    const handleSignDigest = useCallback(async () => {
        const digest = assertionFormData.delegateDigest?.trim();

        if (!digest) {
            setFieldErrors((prev) => ({ ...prev, delegateDigest: "Enter delegate digest before signing." }));
            return;
        }

        try {
            const signature = await signMessageAsync({ message: digest });
            setAssertionFormData((prev) => ({ ...prev, delegateSignature: signature }));
            setFieldErrors((prev) => ({ ...prev, delegateDigest: undefined, delegateSignature: undefined }));
        } catch {
            setFieldErrors((prev) => ({ ...prev, delegateSignature: "Failed to sign digest. Please try again." }));
        }
    }, [assertionFormData.delegateDigest, signMessageAsync]);

    return {
        assertionFormData,
        handleInputChange,
        handleSignDigest,
        fieldErrors,
        isValid,
        isSigning,
    };
}