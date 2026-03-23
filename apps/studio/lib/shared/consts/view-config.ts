// ERC-20 Transfer event ABI (the only ABI this demo uses)
export const ERC20_TRANSFER_ABI = JSON.stringify([
  {
    type: "event",
    name: "Transfer",
    inputs: [
      { name: "from", type: "address", indexed: true },
      { name: "to", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
  },
]);

// Query selecting raw log fields + transaction context
export const VIEW_QUERY =
  "Ethereum__Mainnet__Log { address topics data blockNumber transaction { hash from to } }";

// Output schema — always the same regardless of address
export const VIEW_SDL = `type DecodedERC20Transfers @materialized(if: false) {
  hash: String
  blockNumber: Int
  from: String
  to: String
  logAddress: String
  event: String
  signature: String
}`;

// Decode_log lens WASM URL (served from public/)
export const DECODE_LOG_WASM_URL = "/decode_log.wasm";

// ShinzoHub precompile for view registration
export const VIEW_REGISTRY_ADDRESS =
  "0x0000000000000000000000000000000000000210" as const;

// register(bytes) ABI for encoding the transaction
export const VIEW_REGISTRY_ABI = [
  {
    name: "register",
    type: "function",
    inputs: [{ name: "payload", type: "bytes" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

// Vitalik's address for the badge button
export const VITALIK_ADDRESS = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

// localStorage key for persisting the deployed view name
export const DEPLOYED_VIEW_KEY = "shinzo_studio_deployed_view";

// Build the GraphQL query string to fetch decoded transfers for an address
export function buildTransferQuery(viewName: string, address: string): string {
  return `{
  ${viewName}(filter: { from: { _eq: "${address}" } }) {
    hash
    blockNumber
    from
    to
    logAddress
    event
    signature
  }
}`;
}
