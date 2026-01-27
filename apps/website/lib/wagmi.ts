import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID;

if (!projectId) {
  console.warn("NEXT_PUBLIC_WALLETCONNECT_ID is not set");
}

export const wagmiConfig = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
    walletConnect({
      projectId: projectId || "",
      metadata: {
        name: "Shinzo Network",
        description: "Shinzo - The Read Layer of Truth",
        url: process.env.NEXT_PUBLIC_URL || "https://shinzo.network",
        icons: ["https://shinzo.network/favicon.ico"],
      },
      showQrModal: true,
      qrModalOptions: {
        themeMode: 'light',
      },
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [mainnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
