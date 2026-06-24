import type {
  RegisteredIndexer,
  RegisteredIndexerDetailsResponse,
  RegisteredIndexersListResponse,
} from "@/shared/shinzohub/types";
import type {
  ListIndexersResult,
  RegisteredIndexer as ShinzoHubRegisteredIndexer,
} from "@shinzo/shinzohub";

export function serializeIndexer(
  indexer: ShinzoHubRegisteredIndexer,
): RegisteredIndexer {
  return {
    address: indexer.address,
    did: indexer.did,
    connectionString: indexer.connectionString,
    sourceChain: indexer.sourceChain,
    sourceChainId: indexer.sourceChainId,
  };
}

export function serializeIndexersList(
  result: ListIndexersResult,
): RegisteredIndexersListResponse {
  return {
    indexers: result.indexers.map((indexer) => serializeIndexer(indexer)),
    pagination: {
      next_key: result.pagination.nextKey,
      total: result.pagination.total ?? 0,
    },
  };
}

export function serializeIndexerDetails(
  indexer: ShinzoHubRegisteredIndexer,
): RegisteredIndexerDetailsResponse {
  return {
    indexer: serializeIndexer(indexer),
  };
}
