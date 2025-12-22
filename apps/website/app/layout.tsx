import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import React from 'react';

export const metadata: Metadata = {
  title: 'Shinzō | The Read Layer of Truth',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL || "https://shinzo.network"
  ),
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: process.env.ALLOW_INDEXING === "true",
    follow: process.env.ALLOW_FOLLOWING === "true",
  },
}

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], });

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const fonts = `${inter.variable} ${geistMono.variable}`;

  return (
    <html lang="en">
      <body className={fonts}>
        {children}
      </body>
    </html>
  )
}
