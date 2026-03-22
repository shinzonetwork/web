import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChainProviders } from "@/lib/providers";
import { IndexerContextProvider } from "@/lib/context/provider/indexer-context-provider";
import { Toast, WalletChangeGuard } from "@/lib/widget";

export const metadata: Metadata = {
  title: "Indexer Peers",
  description: "Manage and monitor indexer peers",
  icons: "/favicon.png",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ChainProviders>
          <IndexerContextProvider>
            <Toast />
            <WalletChangeGuard />
            {children}
          </IndexerContextProvider>
        </ChainProviders>
      </body>
    </html>
  );
}
