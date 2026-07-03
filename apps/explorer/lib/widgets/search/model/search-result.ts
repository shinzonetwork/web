import type { ExplorerSearchResult } from "./search-query";

export function getExplorerSearchResultKey(
  result: ExplorerSearchResult,
): string {
  switch (result.kind) {
    case "address":
      return `address-${result.hexAddress}`;
    case "view":
      return `view-${result.viewAddress}`;
    case "host":
      return `host-${result.address}`;
    case "generator":
      return `generator-${result.address}`;
    case "transaction":
      return `transaction-${result.cosmosHash}`;
    case "block":
      return `block-${result.height}`;
  }
}

function hasStringProperty(
  value: Record<string, unknown>,
  property: string,
): boolean {
  return typeof value[property] === "string";
}

export function isExplorerSearchResult(
  value: unknown,
): value is ExplorerSearchResult {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Record<string, unknown>;
  if (!hasStringProperty(candidate, "kind")) return false;

  switch (candidate.kind) {
    case "address":
      return hasStringProperty(candidate, "address") &&
        hasStringProperty(candidate, "hexAddress") &&
        hasStringProperty(candidate, "shinzoAddress");
    case "view":
      return hasStringProperty(candidate, "viewAddress") &&
        hasStringProperty(candidate, "name") &&
        hasStringProperty(candidate, "externalUrl");
    case "host":
      return hasStringProperty(candidate, "address") &&
        hasStringProperty(candidate, "did");
    case "generator":
      return hasStringProperty(candidate, "address") &&
        hasStringProperty(candidate, "did") &&
        hasStringProperty(candidate, "sourceChain") &&
        hasStringProperty(candidate, "sourceChainId");
    case "transaction":
      return hasStringProperty(candidate, "cosmosHash") &&
        (
          typeof candidate.evmHash === "string" ||
          candidate.evmHash === null
        ) &&
        (
          candidate.transactionKind === "cosmos" ||
          candidate.transactionKind === "evm"
        ) &&
        hasStringProperty(candidate, "height");
    case "block":
      return hasStringProperty(candidate, "hash") &&
        hasStringProperty(candidate, "height");
    default:
      return false;
  }
}
