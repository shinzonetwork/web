import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { headers } from "next/headers";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jpSerif = localFont({
  src: "../../../packages/ui/src/fonts/jp-serif.woff2",
  variable: "--font-jp-serif",
});

export const metadata: Metadata = {
  title: "Shinzo Studio",
  description: "Create and deploy Shinzo Views",
  icons: "/favicon.png",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get("cookie");

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} ${jpSerif.variable}`}
      >
        <Providers cookies={cookies}>{children}</Providers>
      </body>
    </html>
  );
}
