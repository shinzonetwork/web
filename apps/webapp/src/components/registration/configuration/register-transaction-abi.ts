export const REGISTER_TRANSACTION_ABI = [
  {
    name: "register",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "peerPub", type: "bytes" },
      { name: "peerSig", type: "bytes" },
      { name: "nodePub", type: "bytes" },
      { name: "nodeSig", type: "bytes" },
      { name: "message", type: "bytes" },
      { name: "entity", type: "uint8" },
    ],
    outputs: [],
  },
] as const;
