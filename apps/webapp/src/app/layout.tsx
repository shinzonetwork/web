import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

import { AppProviders } from "@/providers";
import { Toast, WalletChangeGuard } from "@/widget";
import { RegistrationContextProvider } from "@/entities/registration-process";
import { TooltipProvider } from "@/shared/ui/tooltip";

export const metadata: Metadata = {
  title: "Shinzo",
  description:
    "Sign up your indexer to be recognized by the Shinzo Network and contribute to the ecosystem.",
  icons: "/images/favicon.png",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProviders>
          <RegistrationContextProvider>
            <TooltipProvider>
              <WalletChangeGuard />
              <main className="min-h-screen">{children}</main>
              <Toast />
            </TooltipProvider>
          </RegistrationContextProvider>
        </AppProviders>
      </body>
    </html>
  );
}
