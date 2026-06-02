import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

import { AppProviders } from "@/providers";
import { Footer, Toast, WalletChangeGuard } from "@/widget";
import { RegistrationContextProvider } from "@/entities/registration-process";
import { TooltipProvider } from "@/shared/ui/tooltip";

export const metadata: Metadata = {
  title: "Shinzo",
  description:
    "Register your host to participate in the Shinzo Network.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <AppProviders>
          <RegistrationContextProvider>
            <TooltipProvider>
              <WalletChangeGuard />
              <main className="min-h-screen w-full min-w-0 max-w-full overflow-x-hidden">
                {children}
              </main>
              <Toast />
            </TooltipProvider>
          </RegistrationContextProvider>
        </AppProviders>
        <Footer />
      </body>
    </html>
  );
}
