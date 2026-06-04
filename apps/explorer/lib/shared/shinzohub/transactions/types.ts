export type ShinzohubTransaction = {
  hash: `0x${string}`;
  from: `0x${string}`;
  to: `0x${string}` | null;
  value: string;
  gasPrice: string;
  blockNumber: string;
  timestamp: string;
};

export type ShinzohubTransactionsResponse = {
  lastScannedBlock: string;
  transactions: ShinzohubTransaction[];
  total: number;
};

export type ShinzohubSyncResult = {
  lastScannedBlock: string;
  insertedCount: number;
};
