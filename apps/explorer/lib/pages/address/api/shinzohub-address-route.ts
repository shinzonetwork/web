import {
  getAccount,
  getAccountBalance,
  getEvmAccount,
  getGenerator,
  getHost,
  getView,
  listViews,
  type ShinzoHubAccount,
  type ShinzoHubEvmAccount,
} from "@shinzo/shinzohub";
import {
  normalizeAddressParam,
  toFilteredViewsTotal,
  toViewAddressResult,
  type NormalizedShinzohubAddress,
} from "@/pages/address/api/shinzohub-address-api-utils";
import { getShinzohubQueryContext } from "@/shared/shinzohub/query-context";
import { optionalLookup } from "@/shared/shinzohub/utils/optional-lookup";
import type {
  ShinzohubAddressAccount,
  ShinzohubAddressDetailsResponse,
} from "@/shared/shinzohub/types";

const CREATED_VIEWS_PREVIEW_LIMIT = 20;

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
  let address: NormalizedShinzohubAddress;

  try {
    address = normalizeAddressParam(rawAddress);
  } catch {
    return Response.json(
      { error: "Invalid ShinzoHub address" },
      { status: 400 },
    );
  }

  try {
    const { client, cosmosRestUrl } = getShinzohubQueryContext();
    const { inputAddress, shinzoAddress, hexAddress } = address;
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
        limit: CREATED_VIEWS_PREVIEW_LIMIT,
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
          total: toFilteredViewsTotal(createdViews, {
            limit: CREATED_VIEWS_PREVIEW_LIMIT,
          }),
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
