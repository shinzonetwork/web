import type { Hex } from "viem";

/**
 * ShinzoHub ViewRegistry precompile address.
 */
export const viewRegistryAddress =
  "0x0000000000000000000000000000000000000210" as const satisfies Hex;

export const VIEW_REGISTRY_STATUS_NONE = 0;
export const VIEW_REGISTRY_STATUS_PENDING = 1;
export const VIEW_REGISTRY_STATUS_REGISTERED = 2;

/**
 * Viem-compatible ABI for the ShinzoHub ViewRegistry precompile.
 */
export const viewRegistryAbi = [
  {
    type: "function",
    name: "register",
    stateMutability: "nonpayable",
    inputs: [{ name: "data", type: "bytes" }],
    outputs: [
      { name: "viewAddress", type: "address" },
      { name: "name", type: "string" },
    ],
  },
  {
    type: "function",
    name: "getView",
    stateMutability: "view",
    inputs: [{ name: "viewAddress", type: "address" }],
    outputs: [
      {
        name: "view",
        type: "tuple",
        components: [
          { name: "viewAddress", type: "address" },
          { name: "name", type: "string" },
          { name: "creator", type: "string" },
          { name: "height", type: "uint64" },
          { name: "status", type: "uint8" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "listViews",
    stateMutability: "view",
    inputs: [
      { name: "offset", type: "uint256" },
      { name: "limit", type: "uint256" },
    ],
    outputs: [
      {
        name: "views",
        type: "tuple[]",
        components: [
          { name: "viewAddress", type: "address" },
          { name: "name", type: "string" },
          { name: "creator", type: "string" },
          { name: "height", type: "uint64" },
          { name: "status", type: "uint8" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "viewCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "count", type: "uint256" }],
  },
  {
    type: "event",
    name: "ViewCreated",
    anonymous: false,
    inputs: [
      { name: "viewAddress", type: "address", indexed: true },
      { name: "creator", type: "address", indexed: true },
      { name: "name", type: "string", indexed: false },
    ],
  },
] as const;
