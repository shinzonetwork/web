export type LensArgs = Record<string, string>;

export type LensResultKind =
  | "erc20-transfers"
  | "erc20-account-balances"
  | "json";

export interface BuildHostQueryOptions {
  entityName?: string;
  limit?: number;
  offset?: number;
}

export interface ResolvedLensView<TArgs extends LensArgs = LensArgs> {
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
  buildHostQuery: (options?: BuildHostQueryOptions) => string;
}

export interface LensDefinition<TArgs extends LensArgs = LensArgs> {
  lensKey: string;
  title: string;
  description: string;
  parseStoredArgs: (args: LensArgs) => TArgs;
  resolveView: (args: TArgs) => ResolvedLensView<TArgs>;
  wasmUrl: string;
  uiSupported: boolean;
  resultKind: LensResultKind;
}

export type TokenAddressLensArgs = {
  tokenAddress: string;
};
