"use client";

import { createConfig, http } from "wagmi";
import { defineChain, type Chain } from "viem";
import { getRpcUrl } from "./env";
import { SHINZO_CHAIN_ID } from "../lib/constants/chains";

export const shinzoHub: Chain = defineChain({
  id: SHINZO_CHAIN_ID,
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

const wagmiConfig = createConfig({
  ssr: true,
  chains: [shinzoHub],
  transports: {
    [shinzoHub.id]: http(getRpcUrl()),
  },
});
export default wagmiConfig;
