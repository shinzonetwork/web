import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import { AppProviders } from "@/providers";
import { Toast } from "@/widget";
import { RegistrationContextProvider } from "@/entities/registration-process";
import { TooltipProvider } from "@/shared/ui/tooltip";

export const metadata: Metadata = {
  title: "Shinzo",
  description:
    "Sign up your indexer to be recognized by the Shinzo Network and contribute to the ecosystem.",
  icons: "/images/favicon.png",
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
            <TooltipProvider>
              <main className="min-h-screen">{children}</main>
              <Toast />
            </TooltipProvider>
          </RegistrationContextProvider>
        </AppProviders>
      </body>
    </html>
  );
}
