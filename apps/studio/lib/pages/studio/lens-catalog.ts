import { keccak256, toBytes } from "viem";

export type LensArgs = Record<string, string>;

type LensResultKind =
  | "erc20-transfers"
  | "erc20-account-balances"
  | "json";

export type LensDefinition<TArgs extends LensArgs = LensArgs> = {
  lensKey: string;
  definitionKey: string;
  title: string;
  description: string;
  query: string;
  sdl: string;
  wasmUrl: string;
  uiSupported: boolean;
  resultKind: LensResultKind;
  parseStoredArgs: (args: LensArgs) => TArgs;
  buildDeployArgs: (args: TArgs) => Record<string, unknown>;
  buildHostQuery: (viewName: string, args: TArgs) => string;
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

const ERC20_ACCOUNT_BALANCE_SDL = `type Erc20AccountBalance @materialized(if: false) {
  tokenAddress: String
  account: String
  balance: String
  txCount: Int
}`;

function buildDefinitionKey(query: string, sdl: string): string {
  return keccak256(toBytes(`${query}\n${sdl}`));
}

function createLensDefinition<TArgs extends LensArgs>(
  input: Omit<LensDefinition<TArgs>, "definitionKey">
): LensDefinition<TArgs> {
  return {
    ...input,
    definitionKey: buildDefinitionKey(input.query, input.sdl),
  };
}

function normalizeTokenAddress(tokenAddress: string): string {
  return tokenAddress.trim().toLowerCase();
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

function buildErc20TransferQuery(
  viewName: string,
  _args: TokenAddressLensArgs
): string {
  return `{
  ${viewName} {
    tokenAddress
    hash
    blockNumber
    from
    to
    amount
  }
}`;
}

function buildErc20AccountBalancesQuery(
  viewName: string,
  _args: TokenAddressLensArgs
): string {
  return `{
  ${viewName} {
    tokenAddress
    account
    balance
    txCount
  }
}`;
}

export const ERC20_TRANSFER_LENS =
  createLensDefinition<TokenAddressLensArgs>({
    lensKey: "erc20-transfers",
    title: "ERC-20 Transfers by Token",
    description:
      "This demo deploys the erc20-transfers lens for one ERC-20 token contract and returns normalized transfer rows from Ethereum mainnet logs.",
    query: ERC20_LENS_QUERY,
    sdl: ERC20_TRANSFER_SDL,
    wasmUrl: "/erc20-transfers.wasm",
    uiSupported: true,
    resultKind: "erc20-transfers",
    parseStoredArgs: parseTokenAddressArgs,
    buildDeployArgs: buildTokenAddressDeployArgs,
    buildHostQuery: buildErc20TransferQuery,
  });

export const ERC20_ACCOUNT_BALANCES_LENS =
  createLensDefinition<TokenAddressLensArgs>({
    lensKey: "erc20-account-balances",
    title: "ERC-20 Account Balances",
    description:
      "This lens aggregates account balances and transfer counts for one ERC-20 token contract.",
    query: ERC20_LENS_QUERY,
    sdl: ERC20_ACCOUNT_BALANCE_SDL,
    wasmUrl: "/erc20-account-balances.wasm",
    uiSupported: false,
    resultKind: "erc20-account-balances",
    parseStoredArgs: parseTokenAddressArgs,
    buildDeployArgs: buildTokenAddressDeployArgs,
    buildHostQuery: buildErc20AccountBalancesQuery,
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
