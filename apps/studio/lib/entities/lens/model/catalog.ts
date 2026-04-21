import { ERC20_ACCOUNT_BALANCES_LENS } from "./erc20-account-balances";
import { ERC20_TRANSFER_LENS } from "./erc20-transfers";
import { ENS_CORE_PACK_LENSES } from "./ens-core";

export const STUDIO_LENS_CATALOG = [
  ERC20_TRANSFER_LENS,
  ERC20_ACCOUNT_BALANCES_LENS,
  ...ENS_CORE_PACK_LENSES,
] as const;

export type AnyLensDefinition = (typeof STUDIO_LENS_CATALOG)[number];

const lensByKey = new Map(
  STUDIO_LENS_CATALOG.map((lens) => [lens.lensKey, lens] as const)
);

export const getLensDefinition = (
  lensKey: string
): AnyLensDefinition | undefined => lensByKey.get(lensKey);

export const isStudioKnownLens = (lensKey: string): boolean =>
  Boolean(getLensDefinition(lensKey));

export const isStudioSupportedLens = (lensKey: string): boolean =>
  Boolean(getLensDefinition(lensKey)?.uiSupported);
