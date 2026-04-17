import { keccak256, toBytes } from "viem";
import {
  USDC_TOKEN_ADDRESS,
  USDT_TOKEN_ADDRESS,
} from "@/shared/consts/view-config";

export type LensArgs = Record<string, string>;

type LensResultKind =
  | "erc20-transfers"
  | "erc20-account-balances"
  | "json";

export type ResolvedLensView<TArgs extends LensArgs = LensArgs> = {
  lensKey: string;
  definitionKey: string;
  title: string;
  description: string;
  entityName: string;
  query: string;
  sdl: string;
  deployArgs: Record<string, unknown>;
  wasmUrl: string;
  uiSupported: boolean;
  resultKind: LensResultKind;
  args: TArgs;
  buildHostQuery: (entityNameOverride?: string) => string;
};

export type LensDefinition<TArgs extends LensArgs = LensArgs> = {
  lensKey: string;
  title: string;
  description: string;
  parseStoredArgs: (args: LensArgs) => TArgs;
  resolveView: (args: TArgs) => ResolvedLensView<TArgs>;
  wasmUrl: string;
  uiSupported: boolean;
  resultKind: LensResultKind;
};

export type TokenAddressLensArgs = {
  tokenAddress: string;
};

const ERC20_LENS_QUERY =
  "Ethereum__Mainnet__Log { address topics data blockNumber transaction { hash from to } }";

const ERC20_TRANSFER_SDL = `type Erc20Transfer @materialized(if: false) {
  tokenAddress: String
  hash: String
  blockNumber: Int
  from: String
  to: String
  amount: String
}`;

const ERC20_TRANSFER_FIELDS = `    tokenAddress
    hash
    blockNumber
    from
    to
    amount`;

const ERC20_ACCOUNT_BALANCE_SDL = `type Erc20AccountBalance @materialized(if: false) {
  tokenAddress: String
  account: String
  balance: String
  txCount: Int
}`;

const ERC20_ACCOUNT_BALANCE_FIELDS = `    tokenAddress
    account
    balance
    txCount`;

function buildDefinitionKey(query: string, sdl: string): string {
  return keccak256(toBytes(`${query}\n${sdl}`));
}

function createLensDefinition<TArgs extends LensArgs>(
  input: LensDefinition<TArgs>
): LensDefinition<TArgs> {
  return input;
}

function normalizeTokenAddress(tokenAddress: string): string {
  return tokenAddress.trim().toLowerCase();
}

function extractRootTypeName(sdl: string): string {
  const match = sdl.match(/\btype\s+([A-Za-z0-9_]+)\b/);

  if (!match?.[1]) {
    throw new Error("Invalid SDL: could not find a root type name.");
  }

  return match[1];
}

function replaceRootTypeName(sdl: string, entityName: string): string {
  const nextSdl = sdl.replace(/\btype\s+[A-Za-z0-9_]+\b/, `type ${entityName}`);

  if (nextSdl === sdl) {
    throw new Error("Invalid SDL: could not replace the root type name.");
  }

  return nextSdl;
}

function buildCollectionQuery(entityName: string, fields: string): string {
  return `{
  ${entityName} {
${fields}
  }
}`;
}

function buildTokenAddressDeployArgs(args: TokenAddressLensArgs) {
  return {
    tokenAddress: normalizeTokenAddress(args.tokenAddress),
  };
}

function parseTokenAddressArgs(args: LensArgs): TokenAddressLensArgs {
  const tokenAddress = args.tokenAddress;

  if (!tokenAddress) {
    throw new Error('Stored lens arguments are missing "tokenAddress".');
  }

  return {
    tokenAddress: normalizeTokenAddress(tokenAddress),
  };
}

function buildTokenAddressSuffix(tokenAddress: string): string {
  const normalizedTokenAddress = normalizeTokenAddress(tokenAddress);

  if (normalizedTokenAddress === normalizeTokenAddress(USDT_TOKEN_ADDRESS)) {
    return "USDT";
  }

  if (normalizedTokenAddress === normalizeTokenAddress(USDC_TOKEN_ADDRESS)) {
    return "USDC";
  }

  return normalizedTokenAddress;
}

function resolveTokenAddressView(
  lens: Pick<
    LensDefinition<TokenAddressLensArgs>,
    "lensKey" | "title" | "description" | "wasmUrl" | "uiSupported" | "resultKind"
  >,
  args: TokenAddressLensArgs,
  baseSdl: string,
  fields: string
): ResolvedLensView<TokenAddressLensArgs> {
  const normalizedArgs = parseTokenAddressArgs(args);
  const entityName = `${extractRootTypeName(baseSdl)}${buildTokenAddressSuffix(
    normalizedArgs.tokenAddress
  )}`;
  const sdl = replaceRootTypeName(baseSdl, entityName);
  const query = ERC20_LENS_QUERY;

  return {
    ...lens,
    args: normalizedArgs,
    entityName,
    query,
    sdl,
    deployArgs: buildTokenAddressDeployArgs(normalizedArgs),
    definitionKey: buildDefinitionKey(query, sdl),
    buildHostQuery: (entityNameOverride = entityName) =>
      buildCollectionQuery(entityNameOverride, fields),
  };
}

export const ERC20_TRANSFER_LENS =
  createLensDefinition<TokenAddressLensArgs>({
    lensKey: "erc20-transfers",
    title: "ERC-20 Transfers by Token",
    description:
      "This demo deploys the erc20-transfers lens for one ERC-20 token contract and returns normalized transfer rows from Ethereum mainnet logs.",
    wasmUrl: "/erc20-transfers.wasm",
    uiSupported: true,
    resultKind: "erc20-transfers",
    parseStoredArgs: parseTokenAddressArgs,
    resolveView: (args) =>
      resolveTokenAddressView(
        {
          lensKey: "erc20-transfers",
          title: "ERC-20 Transfers by Token",
          description:
            "This demo deploys the erc20-transfers lens for one ERC-20 token contract and returns normalized transfer rows from Ethereum mainnet logs.",
          wasmUrl: "/erc20-transfers.wasm",
          uiSupported: true,
          resultKind: "erc20-transfers",
        },
        args,
        ERC20_TRANSFER_SDL,
        ERC20_TRANSFER_FIELDS
      ),
  });

export const ERC20_ACCOUNT_BALANCES_LENS =
  createLensDefinition<TokenAddressLensArgs>({
    lensKey: "erc20-account-balances",
    title: "ERC-20 Account Balances",
    description:
      "This lens aggregates account balances and transfer counts for one ERC-20 token contract.",
    wasmUrl: "/erc20-account-balances.wasm",
    uiSupported: false,
    resultKind: "erc20-account-balances",
    parseStoredArgs: parseTokenAddressArgs,
    resolveView: (args) =>
      resolveTokenAddressView(
        {
          lensKey: "erc20-account-balances",
          title: "ERC-20 Account Balances",
          description:
            "This lens aggregates account balances and transfer counts for one ERC-20 token contract.",
          wasmUrl: "/erc20-account-balances.wasm",
          uiSupported: false,
          resultKind: "erc20-account-balances",
        },
        args,
        ERC20_ACCOUNT_BALANCE_SDL,
        ERC20_ACCOUNT_BALANCE_FIELDS
      ),
  });

export const STUDIO_LENS_CATALOG = [
  ERC20_TRANSFER_LENS,
  ERC20_ACCOUNT_BALANCES_LENS,
] as const;

export type AnyLensDefinition = (typeof STUDIO_LENS_CATALOG)[number];

const lensByKey = new Map(
  STUDIO_LENS_CATALOG.map((lens) => [lens.lensKey, lens] as const)
);

export function getLensDefinition(
  lensKey: string
): AnyLensDefinition | undefined {
  return lensByKey.get(lensKey);
}

export function isStudioSupportedLens(lensKey: string): boolean {
  return Boolean(getLensDefinition(lensKey)?.uiSupported);
}
