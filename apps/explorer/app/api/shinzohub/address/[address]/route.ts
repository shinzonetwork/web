import {
  getAccount,
  getAccountBalance,
  getEvmAccount,
  getGenerator,
  getHost,
  getView,
  listViews,
  normalizeShinzoAddress,
  shinzoAddressToHex,
  type ShinzoHubAccount,
  type ShinzoHubEvmAccount,
  type ShinzoHubView,
} from "@shinzo/shinzohub";
import { getShinzohubQueryContext } from "@/shared/shinzohub/query-context";
import type {
  ShinzohubAddressAccount,
  ShinzohubAddressDetailsResponse,
  ShinzohubAddressView,
} from "@/shared/shinzohub/types";

const STUDIO_VIEW_BASE_URL = "https://studio.shinzo.network/views";
const CREATED_VIEWS_LIMIT = 10;

function isNotFound(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const candidate = error as { status?: number; code?: number; message?: string };
  return candidate.status === 404 ||
    candidate.code === 5 ||
    /not found|unknown/i.test(candidate.message ?? "");
}

async function optionalLookup<T>(lookup: () => Promise<T>): Promise<T | null> {
  try {
    return await lookup();
  } catch (error) {
    if (isNotFound(error)) return null;
    throw error;
  }
}

function toViewAddressResult(view: ShinzoHubView): ShinzohubAddressView {
  return {
    name: view.name,
    contractAddress: view.contractAddress,
    creator: view.creator,
    height: view.height.toString(),
    externalUrl: `${STUDIO_VIEW_BASE_URL}/${encodeURIComponent(view.name)}`,
  };
}

function toTypeLabel(
  account: ShinzoHubAccount | null,
  evmAccount: ShinzoHubEvmAccount,
): string {
  if (evmAccount.isContract) return "Contract";
  if (!account) return "Uninitialized";
  if (account.typeUrl.includes("ModuleAccount")) return "Module";
  if (account.typeUrl.includes("Vesting")) return "Vesting";
  if (account.typeUrl === "/cosmos.auth.v1beta1.BaseAccount") return "EOA";
  return "Account";
}

function toAddressAccount(
  account: ShinzoHubAccount | null,
  evmAccount: ShinzoHubEvmAccount,
): ShinzohubAddressAccount {
  return {
    exists: !!account,
    typeUrl: account?.typeUrl ?? null,
    typeLabel: toTypeLabel(account, evmAccount),
    accountNumber: account?.accountNumber ?? null,
    transactionsCount: account?.sequence ?? evmAccount.nonce,
    publicKeyType: account?.publicKeyType ?? null,
    codeHash: evmAccount.codeHash,
    isContract: evmAccount.isContract,
  };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ address: string }> },
) {
  const { address: rawAddress } = await params;
  let inputAddress: string;
  let shinzoAddress: string;
  let hexAddress: string;

  try {
    inputAddress = decodeURIComponent(rawAddress).trim();
    shinzoAddress = normalizeShinzoAddress(inputAddress);
    hexAddress = shinzoAddressToHex(shinzoAddress);
  } catch {
    return Response.json(
      { error: "Invalid ShinzoHub address" },
      { status: 400 },
    );
  }

  try {
    const { client, cosmosRestUrl } = getShinzohubQueryContext();
    const [
      account,
      evmAccount,
      nativeBalance,
      host,
      generator,
      viewContract,
      createdViews,
    ] = await Promise.all([
      optionalLookup(() => getAccount(client, { address: shinzoAddress, cosmosRestUrl })),
      getEvmAccount(client, { address: hexAddress, cosmosRestUrl }),
      getAccountBalance(client, { address: shinzoAddress, cosmosRestUrl }),
      optionalLookup(() => getHost(client, { address: shinzoAddress, cosmosRestUrl })),
      optionalLookup(() => getGenerator(client, { address: shinzoAddress, cosmosRestUrl })),
      optionalLookup(() => getView(client, { address: hexAddress, cosmosRestUrl })),
      listViews(client, {
        creator: shinzoAddress,
        countTotal: true,
        cosmosRestUrl,
        limit: CREATED_VIEWS_LIMIT,
      }),
    ]);

    const response: ShinzohubAddressDetailsResponse = {
      inputAddress,
      shinzoAddress,
      hexAddress,
      nativeBalance: {
        amount: nativeBalance.amount,
        denom: nativeBalance.denom,
      },
      account: toAddressAccount(account, evmAccount),
      related: {
        host: host
          ? {
              address: host.address,
              did: host.did,
            }
          : null,
        generator: generator
          ? {
              address: generator.address,
              did: generator.did,
              sourceChain: generator.sourceChain,
              sourceChainId: generator.sourceChainId,
            }
          : null,
        viewContract: viewContract ? toViewAddressResult(viewContract) : null,
        createdViews: {
          total: createdViews.pagination.total?.toString() ?? null,
          items: createdViews.views.map(toViewAddressResult),
        },
      },
    };

    return Response.json(response, {
      headers: { "cache-control": "no-store" },
    });
  } catch (error) {
    console.error("Failed to load ShinzoHub address:", error);
    return Response.json(
      { error: "Failed to load ShinzoHub address" },
      { status: 502 },
    );
  }
}
