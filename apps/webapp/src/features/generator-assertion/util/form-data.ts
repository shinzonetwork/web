import { getSourceChainOptions } from "@/shared/lib";

export type GeneratorAssertionFormData = {
  validatorPublicKey: string;
  assertionAuthority: string;
  sourceChain: string;
};

/** Delegate digest is a fixed-length payload (32 characters). */
export const DELEGATE_DIGEST_MAX_LENGTH = 32;

export const GENERATOR_ASSERTION_FORM_INPUTS = [
  {
    id: "validatorPublicKey",
    label: "Validator Public Key",
    isTextarea: false,
    isSelect: false,
    description: "The validator public key or BLS key for the generator",
  },
  {
    id: "assertionAuthority",
    label: "Withdrawal Address",
    isTextarea: false,
    isSelect: false,
    description: "The withdrawal address for the source chain",
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
export function getGeneratorAssertionButtonText(isSubmitting: boolean): string {
  if (isSubmitting) return "Processing submission...";
  return "Submit Assertion";
}
