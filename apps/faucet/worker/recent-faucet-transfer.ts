import {
  FAUCET_AMOUNT,
  FAUCET_DENOM,
  FAUCET_REQUEST_WINDOW_MS,
} from './faucet-constants';
import { getShinzoHubCosmosRpcUrl } from './env';

const DEFAULT_TIMEOUT_MS = 5_000;
const SUCCESS_CODE = 0;

interface TxResponseWire {
  code?: unknown;
  timestamp?: unknown;
}

interface TxSearchWire {
  tx_responses?: unknown;
}

export class FaucetHistoryLookupError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FaucetHistoryLookupError';
  }
}

const normalizeCosmosRpcBaseUrl = (): string => {
  const trimmed = getShinzoHubCosmosRpcUrl().trim();

  if (!trimmed) {
    throw new FaucetHistoryLookupError('ShinzoHub Cosmos RPC URL is empty.');
  }

  return trimmed.endsWith('/') ? trimmed : `${trimmed}/`;
};

const buildTxQuery = ({
  faucetAddress,
  recipientAddress,
}: {
  faucetAddress: string;
  recipientAddress: string;
}) =>
  [
    `transfer.sender='${faucetAddress}'`,
    `transfer.recipient='${recipientAddress}'`,
    `transfer.amount='${FAUCET_AMOUNT}${FAUCET_DENOM}'`,
  ].join(' AND ');

const buildTxSearchUrl = ({
  faucetAddress,
  recipientAddress,
}: {
  faucetAddress: string;
  recipientAddress: string;
}): URL => {
  const url = new URL('cosmos/tx/v1beta1/txs', normalizeCosmosRpcBaseUrl());

  url.searchParams.set(
    'query',
    buildTxQuery({ faucetAddress, recipientAddress }),
  );
  url.searchParams.set('pagination.limit', '1');
  url.searchParams.set('order_by', 'ORDER_BY_DESC');

  return url;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const toSuccessfulTxResponse = (value: unknown): TxResponseWire | null => {
  if (!isRecord(value)) {
    throw new FaucetHistoryLookupError('ShinzoHub returned an invalid tx response.');
  }

  if (typeof value.code !== 'number') {
    throw new FaucetHistoryLookupError('ShinzoHub returned a tx without a code.');
  }

  return value.code === SUCCESS_CODE ? value : null;
};

const parseTxTimestamp = (value: unknown): number => {
  if (typeof value !== 'string') {
    throw new FaucetHistoryLookupError('ShinzoHub returned a tx without a timestamp.');
  }

  const timestamp = Date.parse(value);

  if (!Number.isFinite(timestamp)) {
    throw new FaucetHistoryLookupError('ShinzoHub returned an invalid tx timestamp.');
  }

  return timestamp;
};

const fetchWithTimeout = async (url: URL): Promise<Response> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    return await fetch(url, {
      cache: 'no-store',
      signal: controller.signal,
    });
  } catch (error) {
    throw new FaucetHistoryLookupError(
      error instanceof Error
        ? `ShinzoHub history lookup failed: ${error.message}`
        : 'ShinzoHub history lookup failed.',
    );
  } finally {
    clearTimeout(timeout);
  }
};

export const hasRecentFaucetTransfer = async (
  faucetAddress: string,
  recipientAddress: string,
): Promise<boolean> => {
  const url = buildTxSearchUrl({
    faucetAddress,
    recipientAddress,
  });
  const response = await fetchWithTimeout(url);

  if (!response.ok) {
    throw new FaucetHistoryLookupError(
      `ShinzoHub history lookup returned ${response.status}.`,
    );
  }

  let payload: TxSearchWire;

  try {
    payload = (await response.json()) as TxSearchWire;
  } catch {
    throw new FaucetHistoryLookupError('ShinzoHub returned invalid JSON.');
  }

  if (!Array.isArray(payload.tx_responses)) {
    throw new FaucetHistoryLookupError(
      'ShinzoHub returned an invalid tx response list.',
    );
  }

  for (const txResponse of payload.tx_responses) {
    const tx = toSuccessfulTxResponse(txResponse);
    if (!tx) continue;

    const timestampMs = parseTxTimestamp(tx.timestamp);

    if (timestampMs >= Date.now() - FAUCET_REQUEST_WINDOW_MS) {
      return true;
    }
  }

  return false;
};
