import type { Address, Hash, Hex } from 'viem';

/** JSON-RPC quantity encoded as a hex string (e.g. `"0x4cd206"`). */
export type RpcQuantity = Hex;

/** EIP-2930 access list entry as returned by `eth_getTransactionByHash`. */
export type RpcAccessListEntry = {
  address: Address;
  storageKeys: readonly Hash[];
};

/**
 * Transaction object from `eth_getTransactionByHash` (JSON-RPC wire format).
 * Numeric fields are hex strings, not numbers or bigints.
 *
 * @see https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactionbyhash
 */
export type ShinzohubRpcTransaction = {
  blockHash: Hash;
  blockNumber: RpcQuantity;
  from: Address;
  gas: RpcQuantity;
  gasPrice: RpcQuantity;
  maxFeePerGas: RpcQuantity;
  maxPriorityFeePerGas: RpcQuantity;
  hash: Hash;
  input: Hex;
  nonce: RpcQuantity;
  to: Address;
  transactionIndex: RpcQuantity;
  value: RpcQuantity;
  /** Transaction type (e.g. `"0x2"` = EIP-1559). */
  type: RpcQuantity;
  accessList: readonly RpcAccessListEntry[];
  chainId: RpcQuantity;
  v: RpcQuantity;
  r: Hash;
  s: Hash;
};
