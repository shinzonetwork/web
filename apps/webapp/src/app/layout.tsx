import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import { AppProviders } from "@/providers";
import { Toast } from "@/widget";
import { RegistrationContextProvider } from "@/entities/registration-process";

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
            <main className="min-h-screen">{children}</main>
            <Toast />
          </RegistrationContextProvider>
        </AppProviders>
      </body>
    </html>
  );
}
