import { getPublicClient } from '@/shared/viem/client';
import type { ShinzohubTransactionSummary } from '@/shared/types/types';
import {
  getLastScannedBlock,
  insertShinzohubTransactions,
  updateLastScannedBlock,
} from '@/server/shinzohub/transactions-repository';
import type { Transaction } from 'viem';

const BLOCK_BATCH_SIZE = 20;

function blockHasTransactions(
  entry: Transaction | `0x${string}`,
): entry is Transaction {
  return typeof entry === 'object' && entry !== null && 'hash' in entry;
}

export type ShinzohubSyncResult = {
  lastScannedBlock: string;
  insertedCount: number;
};

export async function syncShinzohubTransactionsToDb(
  db: CloudflareEnv['shinzohub_explorer'],
): Promise<ShinzohubSyncResult> {
  const publicClient = getPublicClient('shinzohub');
  const latestBlock = await publicClient.getBlockNumber({ cacheTime: 0 });

  const lastScannedBlock = await getLastScannedBlock(db);
  let nextBlockToScan = BigInt(lastScannedBlock) + BigInt(1);
  if (nextBlockToScan < BigInt(0)) {
    nextBlockToScan = BigInt(0);
  }

  if (nextBlockToScan > latestBlock) {
    const alignedBlock = latestBlock.toString();
    if (alignedBlock !== lastScannedBlock) {
      await updateLastScannedBlock(db, alignedBlock);
    }
    return { lastScannedBlock: alignedBlock, insertedCount: 0 };
  }

  let insertedCount = 0;
  let start = nextBlockToScan;

  while (start <= latestBlock) {
    const end = start + BigInt(BLOCK_BATCH_SIZE - 1);
    const batchEnd = end < latestBlock ? end : latestBlock;

    const blockNumbers: bigint[] = [];
    for (let current = start; current <= batchEnd; current += BigInt(1)) {
      blockNumbers.push(current);
    }

    const blocks = await Promise.all(
      blockNumbers.map((blockNumber) =>
        publicClient.getBlock({
          blockNumber,
          includeTransactions: true,
        }),
      ),
    );

    const batchTransactions: ShinzohubTransactionSummary[] = [];
    const seenHashes = new Set<string>();

    blocks.forEach((block) => {
      const txObjects = block.transactions.filter(blockHasTransactions);
      txObjects.forEach((tx) => {
        if (!tx.hash || seenHashes.has(tx.hash)) return;
        batchTransactions.push({
          hash: tx.hash,
          from: tx.from,
          to: tx.to ?? null,
          value: (tx.value ?? BigInt(0)).toString(),
          gasPrice: (tx.gasPrice ?? BigInt(0)).toString(),
          blockNumber: (block.number ?? BigInt(0)).toString(),
          timestamp: (block.timestamp ?? BigInt(0)).toString(),
        });
        seenHashes.add(tx.hash);
      });
    });

    insertedCount += await insertShinzohubTransactions(db, batchTransactions);
    await updateLastScannedBlock(db, batchEnd.toString());
    start = batchEnd + BigInt(1);
  }

  return {
    lastScannedBlock: latestBlock.toString(),
    insertedCount,
  };
}
