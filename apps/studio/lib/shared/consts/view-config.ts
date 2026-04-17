// ShinzoHub precompile for view registration
export const VIEW_REGISTRY_ADDRESS =
  "0x0000000000000000000000000000000000000210" as const;

// register(bytes) ABI plus ViewCreated event for receipt decoding.
export const VIEW_REGISTRY_ABI = [
  {
    name: "register",
    type: "function",
    inputs: [{ name: "payload", type: "bytes" }],
    outputs: [{ name: "viewAddress", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    name: "ViewCreated",
    type: "event",
    anonymous: false,
    inputs: [
      { name: "viewAddress", type: "address", indexed: true },
      { name: "creator", type: "address", indexed: true },
      { name: "name", type: "string", indexed: false },
    ],
  },
] as const;

export const USDT_TOKEN_ADDRESS =
  "0xdac17f958d2ee523a2206206994597c13d831ec7";
export const USDC_TOKEN_ADDRESS =
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
