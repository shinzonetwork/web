import { ERC20_ACCOUNT_BALANCES_LENS } from "./erc20-account-balances";
import { ERC20_TRANSFER_LENS } from "./erc20-transfers";

export const STUDIO_LENS_CATALOG = [
  ERC20_TRANSFER_LENS,
  ERC20_ACCOUNT_BALANCES_LENS,
] as const;

export type AnyLensDefinition = (typeof STUDIO_LENS_CATALOG)[number];

const lensByKey = new Map(
  STUDIO_LENS_CATALOG.map((lens) => [lens.lensKey, lens] as const)
);

export const getLensDefinition = (
  lensKey: string
): AnyLensDefinition | undefined => lensByKey.get(lensKey);

export const isStudioSupportedLens = (lensKey: string): boolean =>
  Boolean(getLensDefinition(lensKey)?.uiSupported);
