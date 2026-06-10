'use client';

import type {
  ShinzohubEvent,
  ShinzohubTransaction,
} from '@/shared/shinzohub/types';
import {
  TransactionLogs,
  type TransactionLog,
} from '../transaction-logs';

interface TxLogPayload {
  address?: string;
  topics?: string[];
  data?: string;
  logIndex?: number;
}

function base64ToHex(value: string): `0x${string}` {
  if (value.startsWith('0x')) {
    return value as `0x${string}`;
  }

  try {
    const decoded = atob(value);
    const hex = Array.from(
      decoded,
      (character) => character.charCodeAt(0).toString(16).padStart(2, '0'),
    ).join('');
    return `0x${hex}`;
  } catch {
    return '0x';
  }
}

function eventToLog(event: ShinzohubEvent): TransactionLog | null {
  const value = event.attributes.find(
    (attribute) => attribute.key === 'txLog',
  )?.value;
  if (!value) {
    return null;
  }

  try {
    const payload = JSON.parse(value) as TxLogPayload;
    return {
      address: payload.address ?? null,
      topics: payload.topics ?? [],
      data: base64ToHex(payload.data ?? ''),
      logIndex: payload.logIndex ?? null,
    };
  } catch {
    return null;
  }
}

export function ShinzohubTransactionLogs({
  transaction,
  isLoading,
}: {
  transaction?: ShinzohubTransaction;
  isLoading: boolean;
}) {
  const logs = transaction?.events
    .filter((event) => event.type === 'tx_log')
    .map(eventToLog)
    .filter((log): log is TransactionLog => !!log);

  return <TransactionLogs logs={logs} isLoading={isLoading} />;
}
