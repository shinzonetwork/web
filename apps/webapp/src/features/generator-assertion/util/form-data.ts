import { getSourceChainOptions } from "@/shared/lib";

export type GeneratorAssertionFormData = {
  consensusPubKey: string;
  sourceChain: string;
};

/** Delegate digest is a fixed-length payload (32 characters). */
export const DELEGATE_DIGEST_MAX_LENGTH = 32;

export const GENERATOR_ASSERTION_FORM_INPUTS = [
  {
    id: "consensusPubKey",
    label: "Consensus Public Key",
    isTextarea: false,
    isSelect: false,
    description: "The consensus public key of the generator",
  },
  {
    id: "sourceChain",
    label: "Source Chain",
    isTextarea: false,
    isSelect: true,
    selectOptions: getSourceChainOptions(),
  },
] as const;

/**
 * Get button text based on transaction state
 */
export function getGeneratorAssertionButtonText(
  isSigning: boolean,
  isSubmitting: boolean
): string {
  if (isSigning) return "Signing...";
  if (isSubmitting) return "Processing submission...";
  return "Sign & Submit";
}
