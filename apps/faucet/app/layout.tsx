import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jpSerif = localFont({ src: '../../../packages/ui/src/fonts/jp-serif.woff2', variable: "--font-jp-serif" });

export const metadata: Metadata = {
  title: "Shinzo Faucet",
  description: "Request test tokens from the Shinzo faucet",
  icons: '/favicon.png',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} ${jpSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
