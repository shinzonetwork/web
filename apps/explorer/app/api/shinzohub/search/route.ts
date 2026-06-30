import { NextRequest } from "next/server";
import {
  findTransactionByEvmHash,
  getBlock,
  getGenerator,
  getHost,
  getTransaction,
  getView,
  listViews,
} from "@shinzo/shinzohub";
import { getShinzohubQueryContext } from "@/shared/shinzohub/query-context";
import { optionalLookup } from "@/shared/shinzohub/utils/optional-lookup";
import {
  classifySearchQuery,
  type ExplorerSearchResult,
} from "@/widgets/search";
import { STUDIO_VIEW_BASE_URL } from "@/shared/utils/consts";

const VIEW_NAME_SEARCH_LIMIT = 10;

function toViewSearchResult(view: {
  contractAddress: string;
  name: string;
}): ExplorerSearchResult {
  return {
    kind: "view",
    address: view.contractAddress,
    name: view.name,
    externalUrl: `${STUDIO_VIEW_BASE_URL}/${encodeURIComponent(view.name)}`,
  };
}

export async function GET(request: NextRequest) {
  const query = classifySearchQuery(request.nextUrl.searchParams.get("query") ?? "");
  if (!query) {
    return Response.json(
      {
        error: "Invalid Shinzohub search query.",
        detail: "Enter a Shinzo address, transaction hash, positive block height, consensus block hash, or View name fragment.",
      },
      { status: 400 },
    );
  }

  const { client, cosmosRestUrl, cometRpcUrl } = getShinzohubQueryContext();

  try {
    let results: ExplorerSearchResult[] = [];

    if (query.kind === "address") {
      const [view, host, generator] = await Promise.all([
        optionalLookup(() => getView(client, {
          address: query.hexAddress,
          cosmosRestUrl,
        })),
        optionalLookup(() => getHost(client, {
          address: query.shinzoAddress,
          cosmosRestUrl,
        })),
        optionalLookup(() => getGenerator(client, {
          address: query.shinzoAddress,
          cosmosRestUrl,
        })),
      ]);

      if (view) {
        results.push(toViewSearchResult(view));
      }
      if (host) {
        results.push({ kind: "host", address: host.address, did: host.did });
      }
      if (generator) {
        results.push({
          kind: "generator",
          address: generator.address,
          did: generator.did,
          sourceChain: generator.sourceChain,
          sourceChainId: generator.sourceChainId.toString(),
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
    } else if (query.kind === "view-name") {
      const views = await listViews(client, {
        cosmosRestUrl,
        limit: VIEW_NAME_SEARCH_LIMIT,
        name: query.name,
      });
      results = views.views.map(toViewSearchResult);
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
