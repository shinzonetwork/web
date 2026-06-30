import type { Account, Address, Client, Hex, TransactionReceipt } from "viem";
import { decodeEventLog, encodeFunctionData, getAddress } from "viem";
import { sendTransaction } from "viem/actions";
import { normalizeHexAddress, shinzoAddressToHex } from "../addresses/index";
import { buildUrl, requestJson } from "../internal/fetch";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { bytesLikeToHex, normalizeHex } from "../internal/hex";

/**
 * ShinzoHub ViewRegistry precompile address.
 *
 * Most applications should call `createView` instead of using this address
 * directly. It is exported for advanced Viem users who need custom
 * `readContract`, `writeContract`, or log filtering flows.
 *
 * @example
 * ```ts
 * import { getContract } from "viem";
 * import { viewRegistryAbi, viewRegistryAddress } from "@shinzo/shinzohub";
 *
 * const registry = getContract({
 *   address: viewRegistryAddress,
 *   abi: viewRegistryAbi,
 *   client: publicClient,
 * });
 * ```
 */
export const viewRegistryAddress =
  "0x0000000000000000000000000000000000000210" as const satisfies Hex;

/**
 * Viem-compatible ABI for the ShinzoHub ViewRegistry precompile.
 *
 * The high-level SDK methods cover common workflows, but this ABI lets power
 * users call the precompile through Viem directly when they need custom reads,
 * writes, simulations, or event decoding.
 *
 * @example
 * ```ts
 * import { decodeEventLog } from "viem";
 * import { viewRegistryAbi } from "@shinzo/shinzohub";
 *
 * const event = decodeEventLog({
 *   abi: viewRegistryAbi,
 *   eventName: "ViewCreated",
 *   topics: log.topics,
 *   data: log.data,
 * });
 * ```
 */
export const viewRegistryAbi = [
  {
    type: "function",
    name: "register",
    stateMutability: "nonpayable",
    inputs: [{ name: "data", type: "bytes" }],
    outputs: [{ name: "viewAddress", type: "address" }],
  },
  {
    type: "function",
    name: "registerWithPricing",
    stateMutability: "nonpayable",
    inputs: [
      { name: "data", type: "bytes" },
      { name: "pricing", type: "address" },
    ],
    outputs: [{ name: "viewAddress", type: "address" }],
  },
  {
    type: "function",
    name: "getView",
    stateMutability: "view",
    inputs: [{ name: "viewAddress", type: "address" }],
    outputs: [{ name: "creator", type: "string" }],
  },
  {
    type: "event",
    name: "ViewCreated",
    anonymous: false,
    inputs: [
      { name: "viewAddress", type: "address", indexed: true },
      { name: "creator", type: "address", indexed: true },
      { name: "name", type: "string", indexed: false },
    ],
  },
] as const;

/**
 * Parameters for creating a ShinzoHub view.
 *
 * The same shape is used by the standalone `createView(client, parameters)`
 * function and the decorated `client.createView(parameters)` action.
 */
export interface CreateViewParameters {
  /**
   * Raw viewbundle bytes to register.
   *
   * Pass `0x` hex when loading a bundle from a build artifact, or pass
   * `Uint8Array`/`readonly number[]` when the bundle was produced in memory.
   */
  bundle: Hex | Uint8Array | readonly number[];
  /**
   * Optional custom pricing contract address.
   *
   * Omit this to use the built-in ShinzoHub view pricing model. Provide an EVM
   * hex address or Shinzo bech32 address to call `registerWithPricing`.
   */
  pricing?: string;
  /**
   * Optional Viem account override.
   *
   * Leave this unset when the wallet client was created with an `account`.
   * Pass it when one wallet client may submit transactions from multiple
   * accounts.
   */
  account?: Account | Address;
}

/** Parsed metadata derived from a registered viewbundle. */
export interface ViewMetadata {
  /** GraphQL query included in the registered viewbundle. */
  query: string;
  /** SDL schema included in the registered viewbundle. */
  sdl: string;
  /** Root GraphQL type derived from the bundle metadata. */
  rootType: string;
  /** Derived lens metadata for the registered viewbundle. */
  lenses: readonly {
    /** Numeric lens identifier from the bundle metadata. */
    id: number;
    /** Serialized lens arguments. */
    args: string;
    /** Lens hash as reported by ShinzoHub. */
    hash: string;
  }[];
  /** Parse error returned by ShinzoHub, or an empty string when parsing succeeded. */
  parseError: string;
}

/** Registered ShinzoHub view record returned by the REST API. */
export interface ShinzoHubView {
  /** Human-readable view name derived from the viewbundle SDL resource. */
  name: string;
  /** Creator address as returned by the ShinzoHub REST API. */
  creator: string;
  /** EVM address of the deployed View contract. */
  contractAddress: Hex;
  /** Raw viewbundle data when requested with `includeData`, otherwise `null`. */
  data: string | null;
  /** Block height at which the view was registered. */
  height: bigint;
  /** Parsed view metadata when requested with `includeMetadata`, otherwise `null`. */
  metadata: ViewMetadata | null;
}

/**
 * Filters, pagination, and response-shaping options for `listViews`.
 *
 * Common app usage is just `{ limit: 25, includeMetadata: true }`. The
 * metadata filters are useful for catalog/search screens.
 */
export interface ListViewsParameters {
  /** Maximum number of views to return. Use this for the common "first page" case. */
  limit?: number | bigint | string;
  /** Numeric pagination offset for REST gateways that support offset paging. */
  offset?: number | bigint | string;
  /** Opaque pagination key returned as `pagination.nextKey` from a previous response. */
  pageKey?: string;
  /** Ask the REST API to include the total view count in the pagination response. */
  countTotal?: boolean;
  /** Return results in reverse registration order when supported by the REST API. */
  reverse?: boolean;
  /** Include raw viewbundle bytes in each `view.data` field. */
  includeData?: boolean;
  /** Only return views registered at or after this block height. */
  sinceBlock?: number | bigint | string;
  /** Include parsed bundle metadata in each `view.metadata` field. */
  includeMetadata?: boolean;
  /** Filter views whose registered name contains this text, case-insensitively. */
  name?: string;
  /** Filter views by creator address, using the API's creator address format. */
  creator?: string;
  /** Filter views by exact metadata root type. */
  metadataRootType?: string;
  /** Filter views that include a lens with this hash. */
  metadataLensHash?: string;
  /** Filter views whose metadata query contains this text. */
  metadataQueryContains?: string;
  /** Filter views whose metadata SDL contains this text. */
  metadataSdlContains?: string;
  /** Filter views whose serialized lens args contain this text. */
  metadataLensArgsContains?: string;
  /** Override the chain's configured Cosmos REST endpoint for this request. */
  cosmosRestUrl?: string;
}

/** Page of registered ShinzoHub views returned by `listViews`. */
export interface ListViewsResult {
  /** Registered views returned for this page. */
  views: readonly ShinzoHubView[];
  /** Pagination data returned by the ShinzoHub REST gateway. */
  pagination: {
    /** Opaque key to pass as `pageKey` for the next page, or `null` when absent. */
    nextKey: string | null;
    /** Total count when `countTotal` was requested and the API returned it. */
    total: bigint | null;
  };
}

interface GetViewParameters {
  /**
   * View contract address to fetch.
   *
   * Accepts a 20-byte EVM hex address, bare hex address, or Shinzo bech32
   * address. The request is sent to the REST API using canonical EVM hex.
   */
  address: string;
  /** Include raw viewbundle bytes in `view.data`. */
  includeData?: boolean;
  /** Include parsed bundle metadata in `view.metadata`. */
  includeMetadata?: boolean;
  /** Override the chain's configured Cosmos REST endpoint for this request. */
  cosmosRestUrl?: string;
}

interface CountViewsParameters {
  /**
   * Override the chain's configured Cosmos REST endpoint for this request.
   *
   * Use this for custom deployments, tests, or clients whose chain definition
   * only contains EVM RPC URLs.
   */
  cosmosRestUrl?: string;
}

interface ViewRegistryTransaction {
  to: Hex;
  data: Hex;
}

interface ViewWire {
  name?: string;
  creator?: string;
  contract_address?: string;
  data?: string | null;
  height?: string | number;
  metadata?: ViewMetadataWire | null;
}

interface ViewMetadataWire {
  query?: string;
  sdl?: string;
  root_type?: string;
  lenses?: ViewLensMetadataWire[];
  parse_error?: string;
}

interface ViewLensMetadataWire {
  id?: number | string;
  args?: string;
  hash?: string;
}

interface PageResponseWire {
  next_key?: string | null;
  total?: string | number | null;
}

interface ListViewsWireResponse {
  views?: ViewWire[];
  pagination?: PageResponseWire;
}

interface GetViewWireResponse {
  view?: ViewWire;
}

interface CountViewsWireResponse {
  count?: string | number;
}

/**
 * Creates a ShinzoHub view by sending a ViewRegistry transaction.
 *
 * The method chooses the correct precompile call from the parameters:
 * `register(bytes)` when `pricing` is omitted, or
 * `registerWithPricing(bytes,address)` when `pricing` is provided.
 *
 * @param client - Viem wallet client configured with a ShinzoHub chain,
 * transport, and account.
 * @param parameters - View creation options, including the raw `bundle` bytes
 * and optional custom `pricing` contract address.
 * @returns Transaction hash for the submitted ViewRegistry transaction.
 *
 * @example
 * ```ts
 * import { createWalletClient, http } from "viem";
 * import { createView, shinzoHubDevelop } from "@shinzo/shinzohub";
 *
 * const client = createWalletClient({
 *   account: "0x1234567890AbcdEF1234567890aBcdef12345678",
 *   chain: shinzoHubDevelop,
 *   transport: http(),
 * });
 *
 * const hash = await createView(client, {
 *   bundle: "0x68656c6c6f",
 * });
 * ```
 *
 * @example
 * ```ts
 * const hash = await client.createView({
 *   bundle: compiledViewBundle,
 *   pricing: "0x0000000000000000000000000000000000000000",
 * });
 * ```
 */
export async function createView(client: Client, parameters: CreateViewParameters): Promise<Hex> {
  const tx = buildCreateViewTransaction(parameters);
  return sendTransaction(client, {
    to: tx.to,
    data: tx.data,
    chain: client.chain,
    account: parameters.account ?? (client as { account?: Account | Address }).account,
  } as any);
}

/**
 * Reads the deployed View contract address from a ViewRegistry transaction receipt.
 *
 * Use this after `createView` and `publicClient.waitForTransactionReceipt` when
 * your app needs the new view address without manually decoding logs.
 *
 * @param receipt - Transaction receipt returned by Viem after the create view
 * transaction is confirmed.
 * @returns The `viewAddress` emitted by the ViewRegistry `ViewCreated` event.
 * @throws When the receipt does not contain a decodable `ViewCreated` log from
 * the ViewRegistry precompile.
 *
 * @example
 * ```ts
 * import { createView, getCreatedViewAddress } from "@shinzo/shinzohub";
 *
 * const hash = await createView(walletClient, { bundle });
 * const receipt = await publicClient.waitForTransactionReceipt({ hash });
 * const viewAddress = getCreatedViewAddress(receipt);
 * ```
 */
export function getCreatedViewAddress(receipt: TransactionReceipt): Hex {
  for (const log of receipt.logs) {
    if (log.address.toLowerCase() !== viewRegistryAddress.toLowerCase()) {
      continue;
    }

    try {
      const decoded = decodeEventLog({
        abi: viewRegistryAbi,
        eventName: "ViewCreated",
        topics: log.topics,
        data: log.data,
        strict: false,
      });

      if (decoded.eventName === "ViewCreated" && typeof decoded.args.viewAddress === "string") {
        return decoded.args.viewAddress as Hex;
      }
    } catch {
      // Ignore unrelated logs emitted by the same transaction.
    }
  }

  throw new Error("Transaction receipt does not contain a ViewCreated log from the ViewRegistry.");
}

/**
 * Lists registered ShinzoHub views through the Cosmos REST gateway.
 *
 * The method reads the REST endpoint from `client.chain.rpcUrls.cosmosRest`
 * when available. Pass `cosmosRestUrl` for custom deployments, tests, or
 * clients whose chain definition only contains EVM RPC URLs.
 *
 * @param client - Viem public or wallet client configured with a ShinzoHub
 * chain, or any Viem client when `parameters.cosmosRestUrl` is provided.
 * @param parameters - Optional filters, pagination options, metadata/data
 * inclusion flags, and REST endpoint override.
 * @returns A page of registered views plus pagination data.
 *
 * @example
 * ```ts
 * import { createPublicClient, http } from "viem";
 * import { listViews, shinzoHubDevelop } from "@shinzo/shinzohub";
 *
 * const client = createPublicClient({
 *   chain: shinzoHubDevelop,
 *   transport: http(),
 * });
 *
 * const result = await listViews(client, {
 *   limit: 25,
 *   includeMetadata: true,
 *   metadataQueryContains: "Transfer",
 * });
 *
 * for (const view of result.views) {
 *   console.log(view.name, view.contractAddress);
 * }
 * ```
 */
export async function listViews(
  client: ShinzoHubQueryClient,
  parameters: ListViewsParameters = {},
): Promise<ListViewsResult> {
  const fetchFn = globalThis.fetch?.bind(globalThis);
  if (!fetchFn) {
    throw new Error("No fetch implementation is available.");
  }

  const response = await requestJson<ListViewsWireResponse>(
    fetchFn,
    buildListViewsUrl(getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl), parameters),
  );

  return {
    views: (response.views ?? []).map(toView),
    pagination: toPageResponse(response.pagination),
  };
}

/**
 * Fetches one registered ShinzoHub view through the Cosmos REST gateway.
 *
 * Use this when you already know a view contract address and need the
 * registry record, creator, registration height, or optional bundle metadata.
 *
 * @param client - Viem public or wallet client configured with a ShinzoHub
 * chain, or any Viem client when `parameters.cosmosRestUrl` is provided.
 * @param parameters - View lookup options. `address` accepts an EVM hex
 * address or Shinzo bech32 address.
 * @returns The registered view record.
 *
 * @example
 * ```ts
 * const view = await client.getView({
 *   address: "0x018a06d78e0802db5bc055b4527d7b481c3e9932",
 *   includeMetadata: true,
 * });
 *
 * console.log(view.name, view.metadata?.rootType);
 * ```
 */
export async function getView(
  client: ShinzoHubQueryClient,
  parameters: GetViewParameters,
): Promise<ShinzoHubView> {
  const fetchFn = globalThis.fetch?.bind(globalThis);
  if (!fetchFn) {
    throw new Error("No fetch implementation is available.");
  }

  const response = await requestJson<GetViewWireResponse>(
    fetchFn,
    buildGetViewUrl(getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl), parameters),
  );

  if (!response.view) {
    throw new Error("ShinzoHub view response did not include a view.");
  }
  return toView(response.view);
}

/**
 * Counts registered ShinzoHub views through the Cosmos REST gateway.
 *
 * This is useful for dashboards, health checks, and lightweight "is the view
 * module responding?" checks where fetching full view records would be wasteful.
 *
 * @param client - Viem public or wallet client configured with a ShinzoHub
 * chain, or any Viem client when `parameters.cosmosRestUrl` is provided.
 * @param parameters - Optional REST endpoint override.
 * @returns Total number of registered views as a `bigint`.
 *
 * @example
 * ```ts
 * const totalViews = await client.countViews();
 * console.log(`ShinzoHub has ${totalViews} registered views`);
 * ```
 */
export async function countViews(
  client: ShinzoHubQueryClient,
  parameters?: CountViewsParameters,
): Promise<bigint> {
  const fetchFn = globalThis.fetch?.bind(globalThis);
  if (!fetchFn) {
    throw new Error("No fetch implementation is available.");
  }

  const response = await requestJson<CountViewsWireResponse>(
    fetchFn,
    buildUrl(
      getRpcEndpoint(client, "cosmosRest", parameters?.cosmosRestUrl),
      "/shinzonetwork/view/v1/view_count",
    ),
  );

  return BigInt(response.count ?? 0);
}

function buildCreateViewTransaction(parameters: CreateViewParameters): ViewRegistryTransaction {
  const bundle = bytesLikeToHex(parameters.bundle, "bundle");

  if (parameters.pricing) {
    return {
      to: viewRegistryAddress,
      data: encodeFunctionData({
        abi: viewRegistryAbi,
        functionName: "registerWithPricing",
        args: [bundle, normalizeAnyAddress(parameters.pricing)],
      }),
    };
  }

  return {
    to: viewRegistryAddress,
    data: encodeFunctionData({
      abi: viewRegistryAbi,
      functionName: "register",
      args: [bundle],
    }),
  };
}

function buildListViewsUrl(baseUrl: string, parameters: ListViewsParameters): URL {
  const url = buildUrl(baseUrl, "/shinzonetwork/view/v1/views");
  setOptional(url, "pagination.key", parameters.pageKey);
  setOptional(url, "pagination.offset", parameters.offset);
  setOptional(url, "pagination.limit", parameters.limit);
  setOptional(url, "pagination.count_total", parameters.countTotal);
  setOptional(url, "pagination.reverse", parameters.reverse);
  setOptional(url, "include_data", parameters.includeData);
  setOptional(url, "since_block", parameters.sinceBlock);
  setOptional(url, "include_metadata", parameters.includeMetadata);
  setOptional(url, "name", parameters.name);
  setOptional(url, "creator", parameters.creator);
  setOptional(url, "metadata_root_type", parameters.metadataRootType);
  setOptional(url, "metadata_lens_hash", parameters.metadataLensHash);
  setOptional(url, "metadata_query_contains", parameters.metadataQueryContains);
  setOptional(url, "metadata_sdl_contains", parameters.metadataSdlContains);
  setOptional(url, "metadata_lens_args_contains", parameters.metadataLensArgsContains);
  return url;
}

function buildGetViewUrl(baseUrl: string, parameters: GetViewParameters): URL {
  const address = normalizeAnyAddress(parameters.address);
  const url = buildUrl(baseUrl, `/shinzonetwork/view/v1/views/${encodeURIComponent(address)}`);
  setOptional(url, "include_data", parameters.includeData);
  setOptional(url, "include_metadata", parameters.includeMetadata);
  return url;
}

function setOptional(url: URL, key: string, value: string | number | bigint | boolean | undefined): void {
  if (value === undefined || value === "") {
    return;
  }
  url.searchParams.set(key, String(value));
}

function toPageResponse(wire: PageResponseWire | null | undefined): ListViewsResult["pagination"] {
  const total = wire?.total ?? null;
  return {
    nextKey: wire?.next_key ?? null,
    total: total === null ? null : BigInt(total),
  };
}

function toView(wire: ViewWire): ShinzoHubView {
  if (!wire.name) {
    throw new Error("View response is missing name.");
  }
  if (!wire.contract_address) {
    throw new Error("View response is missing contract_address.");
  }

  return {
    name: wire.name,
    creator: wire.creator ?? "",
    contractAddress: normalizeHex(wire.contract_address, "contract_address", 20) as Hex,
    data: wire.data ?? null,
    height: BigInt(wire.height ?? 0),
    metadata: wire.metadata ? toMetadata(wire.metadata) : null,
  };
}

function toMetadata(wire: ViewMetadataWire): ViewMetadata {
  return {
    query: wire.query ?? "",
    sdl: wire.sdl ?? "",
    rootType: wire.root_type ?? "",
    lenses: (wire.lenses ?? []).map((lens) => ({
      id: Number(lens.id ?? 0),
      args: lens.args ?? "",
      hash: lens.hash ?? "",
    })),
    parseError: wire.parse_error ?? "",
  };
}

function normalizeAnyAddress(value: string): Hex {
  const trimmed = value.trim();
  if (/^0x/i.test(trimmed) || /^[0-9a-fA-F]{40}$/.test(trimmed)) {
    return getAddress(normalizeHexAddress(trimmed));
  }
  return getAddress(shinzoAddressToHex(trimmed));
}
