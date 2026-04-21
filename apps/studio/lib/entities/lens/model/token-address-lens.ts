import {
  getErc20TokenPresetByAddress,
  normalizeErc20TokenAddress,
} from "@/shared/consts/view-config";
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
  ResolvedLensView,
  TokenAddressLensArgs,
} from "./types";

const ERC20_LENS_QUERY =
  "Ethereum__Mainnet__Log { address topics data blockNumber transaction { hash from to } }";

const buildTokenAddressDeployArgs = (args: TokenAddressLensArgs) => ({
  tokenAddress: normalizeErc20TokenAddress(args.tokenAddress),
});

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

export const resolveTokenAddressView = (
  lens: TokenAddressLensMeta,
  args: TokenAddressLensArgs,
  baseSdl: string,
  fields: string
): ResolvedLensView<TokenAddressLensArgs> => {
  const normalizedArgs = parseTokenAddressArgs(args);
  const entityName = prefixStudioViewName(
    `${extractRootTypeName(baseSdl)}${buildTokenAddressSuffix(
      normalizedArgs.tokenAddress
    )}`
  );
  const sdl = replaceRootTypeName(baseSdl, entityName);
  const query = ERC20_LENS_QUERY;

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
    buildHostQuery: (options) =>
      buildCollectionQuery(options?.entityName ?? entityName, fields, {
        limit: options?.limit,
        offset: options?.offset,
      }),
  };
};

export const createTokenAddressLens = (
  meta: TokenAddressLensMeta,
  baseSdl: string,
  fields: string
): LensDefinition<TokenAddressLensArgs> => ({
  ...meta,
  parseStoredArgs: parseTokenAddressArgs,
  resolveView: (args) => resolveTokenAddressView(meta, args, baseSdl, fields),
});
