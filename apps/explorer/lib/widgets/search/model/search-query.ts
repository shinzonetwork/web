import {
  normalizeShinzoAddress,
  shinzoAddressToHex,
} from "@shinzo/shinzohub";

export type ExplorerSearchQuery =
  | {
      kind: "address";
      cacheKey: string;
      value: string;
      shinzoAddress: string;
      hexAddress: string;
    }
  | {
      kind: "block-height";
      cacheKey: string;
      value: string;
      height: string;
    }
  | {
      kind: "hash";
      cacheKey: string;
      value: string;
      hash: string;
    };

export type ExplorerSearchResult =
  | {
      kind: "address";
      address: string;
      hexAddress: string;
      shinzoAddress: string;
    }
  | {
      kind: "view";
      address: string;
      name: string;
      externalUrl: string;
    }
  | {
      kind: "host";
      address: string;
      did: string;
    }
  | {
      kind: "indexer";
      address: string;
      did: string;
      sourceChain: string;
      sourceChainId: string;
    }
  | {
      kind: "transaction";
      cosmosHash: string;
      evmHash: string | null;
      transactionKind: "cosmos" | "evm";
      height: string;
    }
  | {
      kind: "block";
      hash: string;
      height: string;
    };

export interface ExplorerSearchResponse {
  results: ExplorerSearchResult[];
}

type QueryClassifier = (value: string) => ExplorerSearchQuery | null;

const HEX_ADDRESS_RE = /^(?:0[xX])?[0-9a-fA-F]{40}$/;
const SHINZO_ADDRESS_RE = /^shinzo1/i;
const HASH_RE = /^(?:0[xX])?([0-9a-fA-F]{64})$/;
const BLOCK_HEIGHT_RE = /^\d+$/;

/**
 * Converts every supported address spelling into the same Bech32 value, hex
 * value, and cache key. This makes `shinzo1…`, `0x…`, and bare hex aliases
 * share one React Query cache entry and one RPC lookup path.
 */
function classifyAddress(value: string): ExplorerSearchQuery | null {
  const looksLikeAddress = HEX_ADDRESS_RE.test(value) ||
    SHINZO_ADDRESS_RE.test(value);
  if (!looksLikeAddress) return null;

  try {
    const shinzoAddress = normalizeShinzoAddress(value);
    const hexAddress = shinzoAddressToHex(shinzoAddress);

    return {
      kind: "address",
      cacheKey: `address:${hexAddress}`,
      value: shinzoAddress,
      shinzoAddress,
      hexAddress,
    };
  } catch {
    return null;
  }
}

/** Canonicalizes a complete 32-byte hash to lower-case, `0x`-prefixed hex. */
function classifyHash(value: string): ExplorerSearchQuery | null {
  const match = value.match(HASH_RE);
  if (!match) return null;

  const hash = `0x${match[1].toLowerCase()}`;
  return {
    kind: "hash",
    cacheKey: `hash:${hash}`,
    value: hash,
    hash,
  };
}

/**
 * Validates a positive decimal height and removes insignificant leading zeroes.
 */
function classifyBlockHeight(value: string): ExplorerSearchQuery | null {
  if (!BLOCK_HEIGHT_RE.test(value)) return null;

  try {
    const height = BigInt(value);
    if (height < 1n) return null;

    const normalizedHeight = height.toString();
    return {
      kind: "block-height",
      cacheKey: `block-height:${normalizedHeight}`,
      value: normalizedHeight,
      height: normalizedHeight,
    };
  } catch {
    return null;
  }
}

const QUERY_CLASSIFIERS: QueryClassifier[] = [
  classifyAddress,
  classifyHash,
  classifyBlockHeight,
];

/**
 * Reads a raw search value from most-specific shape to least-specific shape:
 * address, 32-byte hash, then positive block height. Each successful step
 * returns a canonical value suitable for both the API request and cache key.
 * Incomplete or malformed input returns `null`, so it never reaches an RPC.
 */
export function classifySearchQuery(input: string): ExplorerSearchQuery | null {
  const value = input.trim();
  if (!value) return null;

  for (const classify of QUERY_CLASSIFIERS) {
    const query = classify(value);
    if (query) return query;
  }

  return null;
}
