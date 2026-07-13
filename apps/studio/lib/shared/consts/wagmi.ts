import { shinzoHubTestnet as shinzoChain } from "@shinzo/shinzohub";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import {
  WALLETCONNECT_ID,
  APP_URL,
  SHINZOHUB_EVM_RPC_REQUEST_URL,
} from "@/shared/consts/envs";

if (!WALLETCONNECT_ID) {
  console.warn("VITE_WALLETCONNECT_ID is not set");
}

export const wagmiConfig = createConfig({
  chains: [shinzoChain, mainnet],
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
    [shinzoChain.id]: http(SHINZOHUB_EVM_RPC_REQUEST_URL),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
