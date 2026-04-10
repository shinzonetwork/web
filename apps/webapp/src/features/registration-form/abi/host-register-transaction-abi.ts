import { narrow } from "abitype";

export const HOST_REGISTER_TRANSACTION_ABI = narrow([
  {
    name: "register",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
        { name: "nodeIdentityKeyPubkey", type: "bytes" },
        { name: "nodeIdentityKeySignature", type: "bytes" },
        { name: "message", type: "bytes" },
        { name: "connectionString", type: "string" },
    ],
    outputs: [],
  },
]);
