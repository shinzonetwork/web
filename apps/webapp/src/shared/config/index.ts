"use client";

import { createConfig, http } from "wagmi";
import { defineChain, type Chain } from "viem";

export const Shinzo: Chain = defineChain({
  id: 2328,
  name: "Shinzo",
  nativeCurrency: { name: "Shinzo", symbol: "SHN", decimals: 18 },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_RPC_URL || "http://localhost:8545"],
    },
    public: {
      http: [process.env.NEXT_PUBLIC_RPC_URL || "http://localhost:8545"],
    },
  },
});

const config = createConfig({
  chains: [Shinzo],
  transports: {
    [Shinzo.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL || "http://localhost:8545"
    ),
  },
});
export default config;
