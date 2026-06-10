import { formatUnits } from 'viem';
import { SHINZO_TOKEN } from './tokens';

export const formatTokenValue = (value: string, decimals: number) => {
  return Number(formatUnits(BigInt(value), decimals)).toFixed(6);
};

const MAX_SHINZO_FRACTION_DIGITS = 12;
const SHINZO_COIN_PATTERN = /^(-?\d+)([a-zA-Z][a-zA-Z0-9/:._-]*)$/;

function formatInteger(value: bigint): string {
  const zero = BigInt(0);
  const sign = value < zero ? '-' : '';
  const digits = (value < zero ? -value : value).toString();
  return `${sign}${digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

/** Formats a raw Shinzo amount without hiding very small values. */
export function formatShinzoBaseAmount(value: string | bigint): string {
  const amount = BigInt(value);
  const shn = formatUnits(amount, SHINZO_TOKEN.decimals);
  const fractionDigits = shn.split('.')[1]?.length ?? 0;

  if (fractionDigits > MAX_SHINZO_FRACTION_DIGITS) {
    return `${formatInteger(amount)} ${SHINZO_TOKEN.denom}`;
  }

  return `${shn} ${SHINZO_TOKEN.symbol}`;
}

/** Formats Cosmos coin strings while preserving unknown denominations. */
export function formatShinzoCoin(value: string): string {
  return value
    .split(',')
    .map((coin) => {
      const trimmed = coin.trim();
      const match = trimmed.match(SHINZO_COIN_PATTERN);
      if (!match || match[2] !== SHINZO_TOKEN.denom) {
        return trimmed;
      }
      return formatShinzoBaseAmount(match[1]);
    })
    .join(', ');
}
