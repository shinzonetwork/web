export type ShinzohubTransactionSummary = {
    hash: `0x${string}`;
    from: `0x${string}`;
    to: `0x${string}` | null;
    value: string;
    gasPrice: string;
    blockNumber: string;
    timestamp: string;
};