import type { ShinzohubTransaction } from '@/shared/shinzohub/transactions/types';

type ExplorerDb = CloudflareEnv['shinzohub_explorer'];

export type ShinzohubTransactionRow = {
  hash: string;
  from_address: string;
  to_address: string | null;
  value: string;
  gas_price: string;
  block_number: string;
  timestamp: string;
};

export function rowToShinzohubTransaction(row: ShinzohubTransactionRow): ShinzohubTransaction {
  return {
    hash: row.hash as `0x${string}`,
    from: row.from_address as `0x${string}`,
    to: row.to_address as `0x${string}` | null,
    value: row.value,
    gasPrice: row.gas_price,
    blockNumber: row.block_number,
    timestamp: row.timestamp,
  };
}

export async function getLastScannedBlock(db: ExplorerDb): Promise<string> {
  const row = await db
    .prepare('SELECT last_scanned_block FROM shinzohub_sync_state WHERE id = 1')
    .first<{ last_scanned_block: string }>();

  return row?.last_scanned_block ?? '-1';
}

export async function updateLastScannedBlock(db: ExplorerDb, lastScannedBlock: string): Promise<void> {
  await db
    .prepare(
      `UPDATE shinzohub_sync_state
       SET last_scanned_block = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
       WHERE id = 1`,
    )
    .bind(lastScannedBlock)
    .run();
}

export async function insertShinzohubTransactions(
  db: ExplorerDb,
  transactions: ShinzohubTransaction[],
): Promise<number> {
  if (!transactions.length) {
    return 0;
  }

  const statements = transactions.map((tx) =>
    db
      .prepare(
        `INSERT OR IGNORE INTO shinzohub_transactions (
          hash, from_address, to_address, value, gas_price, block_number, timestamp
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        tx.hash,
        tx.from,
        tx.to,
        tx.value,
        tx.gasPrice,
        tx.blockNumber,
        tx.timestamp,
      ),
  );

  const results = await db.batch(statements);
  let inserted = 0;
  for (const result of results) {
    inserted += result.meta.changes ?? 0;
  }
  return inserted;
}

export async function getShinzohubTransactionsPage(
  db: ExplorerDb,
  { offset, limit }: { offset: number; limit: number },
): Promise<{ transactions: ShinzohubTransaction[]; total: number }> {
  const countRow = await db
    .prepare('SELECT COUNT(*) AS n FROM shinzohub_transactions')
    .first<{ n: number }>();
  const total = Number(countRow?.n ?? 0);

  const { results } = await db
    .prepare(
      `SELECT hash, from_address, to_address, value, gas_price, block_number, timestamp
       FROM shinzohub_transactions
       ORDER BY CAST(block_number AS INTEGER) DESC, hash DESC
       LIMIT ? OFFSET ?`,
    )
    .bind(limit, offset)
    .all<ShinzohubTransactionRow>();

  return {
    transactions: (results ?? []).map(rowToShinzohubTransaction),
    total,
  };
}
