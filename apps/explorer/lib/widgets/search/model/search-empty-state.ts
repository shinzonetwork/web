import type { ExplorerSearchQuery } from "./search-query";

interface SearchEmptyState {
  description: string;
  title: string;
}

const HEXISH_RE = /^(?:0[xX])?[0-9a-fA-F]+$/;
const DECIMAL_RE = /^\d+$/;

/**
 * Turns incomplete input into a useful next hint without issuing an RPC. The
 * search pipeline still only queries fully classified values, while this copy
 * tells the user which shape Explorer thinks they are trying to enter.
 */
export function getIncompleteSearchState(
  input: string,
  submitted: boolean,
): SearchEmptyState {
  const value = input.trim();
  const title = submitted
    ? "That search is incomplete"
    : "Keep typing…";

  if (/^shinzo1/i.test(value)) {
    return {
      title,
      description: "This looks like a Shinzo address, but it is incomplete or it has an invalid checksum.",
    };
  }

  if (/^0[xX]/.test(value) || HEXISH_RE.test(value)) {
    return {
      title,
      description: "Paste a full 20-byte address or 32-byte transaction/block hash to search hex values.",
    };
  }

  if (DECIMAL_RE.test(value)) {
    return {
      title,
      description: "Block heights must be positive decimal numbers.",
    };
  }

  return {
    title,
    description: "Search supports View name fragments, Shinzo addresses, EVM hex addresses, transaction hashes, block heights, and consensus block hashes.",
  };
}

export function getNoResultsSearchState(
  query: ExplorerSearchQuery | null,
): SearchEmptyState {
  switch (query?.kind) {
    case "address":
      return {
        title: "No address match found",
        description: "Explorer could not resolve this address to a View, Host, Generator, or generic account page.",
      };
    case "block-height":
      return {
        title: `No block at height ${query.height}`,
        description: "That height is valid, but Shinzohub RPCs did not return a confirmed block for it.",
      };
    case "hash":
      return {
        title: "No hash match found",
        description: "That 32-byte hash did not match a confirmed Cosmos/EVM transaction or consensus block.",
      };
    case "view-name":
      return {
        title: "No View names matched",
        description: "No registered Shinzohub Views matched that name fragment.",
      };
    default:
      return {
        title: "No results found",
        description: "The query is valid, but it did not match a supported Shinzohub entity.",
      };
  }
}
