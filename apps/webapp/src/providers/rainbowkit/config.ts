"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { Chain, getDefaultConfig } from "@rainbow-me/rainbowkit";

const shinzo = {
  id: 9001,
  name: "Shinzo",
  iconUrl: "/public/logo.svg",
  iconBackground: "#fff",
  nativeCurrency: { name: "Shinzo", symbol: "SHN", decimals: 18 },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_RPC_URL || "http://localhost:8545"],
    },
  },
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: "Shinzo",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  chains: [shinzo],
  ssr: true,
});

export default config;
