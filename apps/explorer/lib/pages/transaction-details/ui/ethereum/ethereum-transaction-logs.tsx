'use client';

import type { Hex } from 'viem';
import { useEthereumTransactionLogs } from '../../hook/ethereum/use-ethereum-transaction-logs';
import { TransactionLogs } from '../transaction-logs';

export interface EthereumTransactionLogsProps {
  txHash: Hex;
}

export function EthereumTransactionLogs({
  txHash,
}: EthereumTransactionLogsProps) {
  const { data: logs, isLoading } = useEthereumTransactionLogs({ hash: txHash });
  return <TransactionLogs logs={logs?.filter((log) => !!log)} isLoading={isLoading} />;
}
