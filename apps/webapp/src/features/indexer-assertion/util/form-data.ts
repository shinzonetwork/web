export type IndexerAssertionFormData = {
  consensusPubKey: string;
  delegateAddress: string;
  sourceChain: string;
  sourceChainId: number;
};

/** Delegate digest is a fixed-length payload (32 characters). */
export const DELEGATE_DIGEST_MAX_LENGTH = 32;

export type SOURCE_CHAIN = "ethereum" | "shinzohub";

export const SOURCE_CHAIN_ID_MAP: Record<SOURCE_CHAIN, number> = {
  ethereum: 1,
  shinzohub: 91273002,
};

export const SOURCE_CHAIN_OPTIONS = [
  { value: "ethereum", label: "Ethereum" },
  { value: "shinzohub", label: "Shinzohub" },
];

export const INDEXER_ASSERTION_FORM_INPUTS = [
  {
    id: "delegateAddress",
    label: "Delegate Address",
    isTextarea: false,
    isSelect: false,
    description:
      "The delegate address should be the Shinzo address of the indexer, starting with the prefix 'shinzo'",
  },
  {
    id: "consensusPubKey",
    label: "Consensus Public Key",
    isTextarea: false,
    isSelect: false,
  },
  {
    id: "sourceChain",
    label: "Source Chain",
    isTextarea: false,
    isSelect: true,
    selectOptions: SOURCE_CHAIN_OPTIONS,
  },
  {
    id: "sourceChainId",
    label: "Source Chain ID",
    isTextarea: false,
    isSelect: false,
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
