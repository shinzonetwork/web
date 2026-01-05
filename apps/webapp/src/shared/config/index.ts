"use client";

import { createConfig, http } from "wagmi";
import { defineChain, type Chain } from "viem";
import { getRpcUrl } from "./env";

export const Shinzo: Chain = defineChain({
  id: 9000,
  name: "Shinzo",
  nativeCurrency: { name: "Shinzo", symbol: "SHN", decimals: 18 },
  rpcUrls: {
    default: {
      http: [getRpcUrl()],
    },
    public: {
      http: [getRpcUrl()],
    },
  },
});

const config = createConfig({
  chains: [Shinzo],
  transports: {
    [Shinzo.id]: http(getRpcUrl()),
  },
});
export default config;
