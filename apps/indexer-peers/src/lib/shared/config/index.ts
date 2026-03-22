"use client";

import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { defineChain, type Chain } from "viem";
import { getRpcUrl } from "./env";

export const Shinzo: Chain = defineChain({
  id: 91273002,
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
  ssr: true,
  /** Prefer MetaMask explicitly; otherwise EIP-6963 order can pick another wallet first (e.g. Keplr). */
  connectors: [injected({ target: "metaMask" })],
  chains: [Shinzo],
  transports: {
    [Shinzo.id]: http(getRpcUrl()),
  },
});
export default config;
