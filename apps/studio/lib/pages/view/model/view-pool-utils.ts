import type { ShinzoHubViewPool } from "@shinzo/shinzohub/views";
import { formatTokenAmount } from "@/shared/utils/format";

const SHNZ_DECIMALS = 18;

export const findConnectedWalletDemand = (
  pool: ShinzoHubViewPool,
  connectedAddress: string | null
): ShinzoHubViewPool["demands"][number] | null =>
  connectedAddress
    ? (pool.demands.find(
        (demand) =>
          demand.registrantAddress.toLowerCase() ===
          connectedAddress.toLowerCase()
      ) ?? null)
    : null;

export const formatShnz = (value: bigint): string =>
  formatTokenAmount(value.toString(), SHNZ_DECIMALS);

export const formatCount = (value: bigint): string =>
  new Intl.NumberFormat().format(value);

export const pluralize = (count: number, singular: string): string =>
  count === 1 ? singular : `${singular}s`;
