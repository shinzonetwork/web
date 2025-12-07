import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AppProviders } from "@/providers";
import { Header, WalletDisconnectHandler } from "@/widget";
import { RegistrationContextProvider } from "@/entities";

export const metadata: Metadata = {
  title: "Shinzo",
  description:
    "The Shinzo webapp allows a user to interact with different parts of the Shinzo ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <RegistrationContextProvider>
            <WalletDisconnectHandler />
            <Header />
            <main className="min-h-screen">{children}</main>
          </RegistrationContextProvider>
        </AppProviders>
      </body>
    </html>
  );
}
