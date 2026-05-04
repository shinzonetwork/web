export type IndexerAssertionFormData = {
  consensusPubKey: string;
  delegateAddress: string;
  sourceChain: string;
  sourceChainId: number;
  assertionId: string;
  delegateDigest: string;
  delegateSignature: string;
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
  {
    id: "assertionId",
    label: "Assertion ID",
    isTextarea: false,
    isSelect: false,
  },
  {
    id: "delegateDigest",
    label: "Delegate Digest",
    isTextarea: false,
    isSelect: false,
    maxLength: DELEGATE_DIGEST_MAX_LENGTH,
    description:
      "The delegate digest must consist of exactly 32 characters; values shorter or longer than this length are not permitted.",
  },
  {
    id: "delegateSignature",
    label: "Delegate Signature",
    isTextarea: false,
    isSelect: false,
  },
] as const;
