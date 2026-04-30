import {
  getErc20TokenPresetByAddress,
  normalizeErc20TokenAddress,
} from "@/shared/consts/view-config";
import { getAddress } from "viem";
import { buildCollectionQuery } from "./host-query";
import {
  buildDefinitionKey,
  extractRootTypeName,
  prefixStudioViewName,
  replaceRootTypeName,
} from "./sdl";
import type {
  LensArgs,
  LensDefinition,
  LensQueryArgs,
  ResolvedLensView,
  TokenAddressLensArgs,
} from "./types";

const ERC20_LENS_QUERY =
  "Ethereum__Mainnet__Log { address topics data blockNumber transaction { hash from to } }";

const buildTokenAddressDeployArgs = (args: TokenAddressLensArgs) => ({
  tokenAddress: normalizeErc20TokenAddress(args.tokenAddress),
});

const graphqlString = (value: string): string => JSON.stringify(value);

export const parseTokenAddressArgs = (args: LensArgs): TokenAddressLensArgs => {
  const tokenAddress = args.tokenAddress;

  if (!tokenAddress) {
    throw new Error('Stored lens arguments are missing "tokenAddress".');
  }

  return {
    tokenAddress: normalizeErc20TokenAddress(tokenAddress),
  };
};

const buildTokenAddressSuffix = (tokenAddress: string): string => {
  const tokenPreset = getErc20TokenPresetByAddress(tokenAddress);

  if (tokenPreset) {
    return tokenPreset.entitySuffix;
  }

  return normalizeErc20TokenAddress(tokenAddress);
};

type TokenAddressLensMeta = Pick<
  LensDefinition<TokenAddressLensArgs>,
  "lensKey" | "title" | "description" | "packKey" | "uiSupported" | "resultKind"
> & {
  wasmUrl: string;
};

interface BuildTokenAddressHostQueryInput {
  entityName: string;
  fields: string;
  limit?: number;
  offset?: number;
  queryArgs?: LensQueryArgs;
  args: TokenAddressLensArgs;
}

interface TokenAddressLensOptions {
  buildDeployQuery?: (args: TokenAddressLensArgs) => string;
  buildHostQuery?: (input: BuildTokenAddressHostQueryInput) => string;
}

const buildDefaultTokenAddressHostQuery = ({
  entityName,
  fields,
  limit,
  offset,
}: BuildTokenAddressHostQueryInput): string =>
  buildCollectionQuery(entityName, fields, {
    limit,
    offset,
  });

const formatEthereumLogFilterAddress = (tokenAddress: string): string =>
  getAddress(tokenAddress);

export const buildFilteredErc20LogQuery = (
  tokenAddress: string
): string => `Ethereum__Mainnet__Log(filter: { address: { _eq: ${graphqlString(
  formatEthereumLogFilterAddress(tokenAddress)
)} } }) { address topics data blockNumber transaction { hash from to } }`;

export const buildErc20AccountBalanceHostQuery = ({
  entityName,
  fields,
  limit,
  offset,
  queryArgs,
}: BuildTokenAddressHostQueryInput): string => {
  const account = queryArgs?.account
    ? normalizeErc20TokenAddress(queryArgs.account)
    : "";

  return buildCollectionQuery(entityName, fields, {
    limit,
    offset,
    filter: account
      ? `{ account: { _eq: ${graphqlString(account)} } }`
      : undefined,
  });
};

export const resolveTokenAddressView = (
  lens: TokenAddressLensMeta,
  args: TokenAddressLensArgs,
  baseSdl: string,
  fields: string,
  options?: TokenAddressLensOptions
): ResolvedLensView<TokenAddressLensArgs> => {
  const normalizedArgs = parseTokenAddressArgs(args);
  const entityName = prefixStudioViewName(
    `${extractRootTypeName(baseSdl)}${buildTokenAddressSuffix(
      normalizedArgs.tokenAddress
    )}`
  );
  const sdl = replaceRootTypeName(baseSdl, entityName);
  const query = options?.buildDeployQuery?.(normalizedArgs) ?? ERC20_LENS_QUERY;

  return {
    ...lens,
    args: normalizedArgs,
    entityName,
    query,
    sdl,
    steps: [
      {
        wasmUrl: lens.wasmUrl,
        args: buildTokenAddressDeployArgs(normalizedArgs),
      },
    ],
    definitionKey: buildDefinitionKey(query, sdl),
    buildHostQuery: (hostQueryOptions) =>
      (options?.buildHostQuery ?? buildDefaultTokenAddressHostQuery)({
        entityName: hostQueryOptions?.entityName ?? entityName,
        fields,
        limit: hostQueryOptions?.limit,
        offset: hostQueryOptions?.offset,
        queryArgs: hostQueryOptions?.queryArgs,
        args: normalizedArgs,
      }),
  };
};

export const createTokenAddressLens = (
  meta: TokenAddressLensMeta,
  baseSdl: string,
  fields: string,
  options?: TokenAddressLensOptions
): LensDefinition<TokenAddressLensArgs> => ({
  ...meta,
  parseStoredArgs: parseTokenAddressArgs,
  resolveView: (args) =>
    resolveTokenAddressView(meta, args, baseSdl, fields, options),
});
