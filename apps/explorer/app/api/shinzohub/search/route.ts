import { NextRequest } from "next/server";
import {
  findTransactionByEvmHash,
  getBlock,
  getHost,
  getIndexer,
  getTransaction,
  getView,
} from "@shinzo/shinzohub";
import { getShinzohubQueryContext } from "@/shared/shinzohub/query-context";
import {
  classifySearchQuery,
  type ExplorerSearchResult,
} from "@/widgets/search";

function isNotFound(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const candidate = error as { status?: number; code?: number; message?: string };
  return candidate.status === 404 ||
    candidate.code === 5 ||
    /not found|unknown transaction/i.test(candidate.message ?? "");
}

async function optionalLookup<T>(lookup: () => Promise<T>): Promise<T | null> {
  try {
    return await lookup();
  } catch (error) {
    if (isNotFound(error)) return null;
    throw error;
  }
}

export async function GET(request: NextRequest) {
  const query = classifySearchQuery(request.nextUrl.searchParams.get("query") ?? "");
  if (!query) {
    return Response.json(
      {
        error: "Invalid Shinzohub search query.",
        detail: "Enter a Shinzo address, transaction hash, positive block height, or consensus block hash.",
      },
      { status: 400 },
    );
  }

  const { client, cosmosRestUrl, cometRpcUrl } = getShinzohubQueryContext();

  try {
    let results: ExplorerSearchResult[] = [];

    if (query.kind === "address") {
      const [view, host, indexer] = await Promise.all([
        optionalLookup(() => getView(client, {
          address: query.hexAddress,
          cosmosRestUrl,
        })),
        optionalLookup(() => getHost(client, {
          address: query.shinzoAddress,
          cosmosRestUrl,
        })),
        optionalLookup(() => getIndexer(client, {
          address: query.shinzoAddress,
          cosmosRestUrl,
        })),
      ]);

      if (view) {
        results.push({
          kind: "view",
          address: view.contractAddress,
          name: view.name,
          externalUrl: `https://studio.shinzo.network/views/${view.contractAddress}`,
        });
      }
      if (host) {
        results.push({ kind: "host", address: host.address, did: host.did });
      }
      if (indexer) {
        results.push({
          kind: "indexer",
          address: indexer.address,
          did: indexer.did,
          sourceChain: indexer.sourceChain,
          sourceChainId: indexer.sourceChainId.toString(),
        });
      }
      if (results.length === 0) {
        results = [{
          kind: "address",
          address: query.shinzoAddress,
          hexAddress: query.hexAddress,
          shinzoAddress: query.shinzoAddress,
        }];
      }
    } else if (query.kind === "block-height") {
      const block = await optionalLookup(() => getBlock(client, {
        height: query.height,
        cometRpcUrl,
      }));
      if (block) {
        results = [{ kind: "block", hash: block.hash, height: block.height.toString() }];
      }
    } else {
      const [transaction, block] = await Promise.all([
        (async (): Promise<ExplorerSearchResult | null> => {
          const cosmosTransaction = await optionalLookup(() => getTransaction(client, {
            hash: query.hash,
            cosmosRestUrl,
          }));
          if (cosmosTransaction) {
            return {
              kind: "transaction",
              cosmosHash: cosmosTransaction.cosmosHash,
              evmHash: cosmosTransaction.evmHash,
              transactionKind: cosmosTransaction.kind,
              height: cosmosTransaction.height.toString(),
            };
          }
          const evmTransaction = await findTransactionByEvmHash(client, {
            hash: query.hash,
            cometRpcUrl,
          });
          return evmTransaction ? {
            kind: "transaction",
            cosmosHash: evmTransaction.cosmosHash,
            evmHash: evmTransaction.evmHash,
            transactionKind: evmTransaction.kind,
            height: evmTransaction.height.toString(),
          } : null;
        })(),
        optionalLookup(() => getBlock(client, {
          hash: query.hash,
          cometRpcUrl,
        })),
      ]);

      if (transaction) results.push(transaction);
      if (block) {
        results.push({ kind: "block", hash: block.hash, height: block.height.toString() });
      }
    }

    return Response.json(
      { results },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (error) {
    console.error("Failed to resolve ShinzoHub search:", error);
    return Response.json(
      {
        error: "Shinzohub RPC lookup failed.",
        detail: "One or more chain RPCs did not return enough data to resolve this query reliably. The endpoint may be unavailable or still syncing; try again shortly.",
      },
      { status: 502 },
    );
  }
}
