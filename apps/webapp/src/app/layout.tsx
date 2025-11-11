import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/header/header";
import { RainbowKitWagmiProvider } from "@/providers/rainbowkit/provider";
import { WalletDisconnectHandler } from "@/components/handlers/wallet-disconnect-handler";
import { SignInContextProvider } from "@/context/signInContext/signInContextProvider";

export const metadata: Metadata = {
  title: "Shinzo",
  description: "The Shinzo webapp allows a user to interact with different parts of the Shinzo ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <RainbowKitWagmiProvider>
          <SignInContextProvider>
            <WalletDisconnectHandler />
            <Header />
            <main className="min-h-screen">{children}</main>
          </SignInContextProvider>
        </RainbowKitWagmiProvider>
      </body>
    </html>
  );
}
