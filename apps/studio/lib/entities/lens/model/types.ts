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

export interface ResolvedLensStep {
  wasmUrl: string;
  args: Record<string, unknown>;
}

export interface ResolvedLensView<TArgs extends LensArgs = LensArgs> {
  lensKey: string;
  definitionKey: string;
  title: string;
  description: string;
  packKey?: string;
  entityName: string;
  query: string;
  sdl: string;
  steps: ResolvedLensStep[];
  uiSupported: boolean;
  resultKind: LensResultKind;
  args: TArgs;
  buildHostQuery: (options?: BuildHostQueryOptions) => string;
}

export interface LensDefinition<TArgs extends LensArgs = LensArgs> {
  lensKey: string;
  title: string;
  description: string;
  packKey?: string;
  parseStoredArgs: (args: LensArgs) => TArgs;
  resolveView: (args: TArgs) => ResolvedLensView<TArgs>;
  uiSupported: boolean;
  resultKind: LensResultKind;
}

export type TokenAddressLensArgs = {
  tokenAddress: string;
};
