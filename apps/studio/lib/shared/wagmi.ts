import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import { defineChain } from "viem";
import {
  WALLETCONNECT_ID,
  APP_URL,
  SHINZOHUB_CHAIN_ID,
} from "@/shared/consts/envs";

if (!WALLETCONNECT_ID) {
  console.warn("NEXT_PUBLIC_WALLETCONNECT_ID is not set");
}

export const shinzoDevnet = defineChain({
  id: SHINZOHUB_CHAIN_ID,
  name: "Shinzo Devnet",
  nativeCurrency: { name: "SHN", symbol: "SHN", decimals: 18 },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_SHINZOHUB_EVM_RPC ?? ""],
    },
  },
});

export const wagmiConfig = createConfig({
  chains: [mainnet, shinzoDevnet],
  connectors: [
    injected(),
    walletConnect({
      projectId: WALLETCONNECT_ID,
      metadata: {
        name: "Shinzo Studio",
        description: "Create and deploy Shinzo Views",
        url: APP_URL,
        icons: ["https://shinzo.network/favicon.ico"],
      },
      showQrModal: true,
      qrModalOptions: {
        themeMode: "light",
      },
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [shinzoDevnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
