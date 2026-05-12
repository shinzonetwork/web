export type IndexerAssertionFormData = {
  consensusPubKey: string;
  sourceChain: string;
};

/** Delegate digest is a fixed-length payload (32 characters). */
export const DELEGATE_DIGEST_MAX_LENGTH = 32;

export type SOURCE_CHAIN = "ethereum" | "sepolia" | "polygon";

export const SOURCE_CHAIN_ID_MAP: Record<SOURCE_CHAIN, number> = {
  ethereum: 1,
  sepolia: 11155111,
  polygon: 137,
};

export const SOURCE_CHAIN_OPTIONS = [
  { value: "ethereum", label: "Ethereum" },
  { value: "sepolia", label: "Sepolia" },
  { value: "polygon", label: "Polygon" },
];

export const INDEXER_ASSERTION_FORM_INPUTS = [
  {
    id: "consensusPubKey",
    label: "Consensus Public Key",
    isTextarea: false,
    isSelect: false,
    description: "The consensus public key of the indexer",
  },
  {
    id: "sourceChain",
    label: "Source Chain",
    isTextarea: false,
    isSelect: true,
    selectOptions: SOURCE_CHAIN_OPTIONS,
  },
] as const;

/**
 * Get button text based on transaction state
 */
export function getIndexerAssertionButtonText(
  isSigning: boolean,
  isSubmitting: boolean
): string {
  if (isSigning) return "Signing...";
  if (isSubmitting) return "Processing submission...";
  return "Sign & Submit";
}
