import type { Hex } from "viem";

export type Address = Hex;
export type Role = 'curator' | 'indexer' | 'host' | null;