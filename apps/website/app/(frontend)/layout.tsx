import BlockContainer from "@/components/block-container";
import { cn } from "@/lib/utils";
import ShinzoLogoFull from "@/public/shinzo-logo-full.svg";
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import './styles.css';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL || "https://shinzo.network"
  ),
  title: 'Shinzō | The Read Layer of Truth',
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const fonts = `${geistSans.variable} ${geistMono.variable} ${inter.variable}`;

  return (
    <html lang="en">
      <body className={cn(fonts, `min-h-screen flex flex-col`)} >
        <header className="sticky top-0 z-50 bg-background">
          <BlockContainer className="flex items-center min-h-header-h">
            <Link href="/blog"><Image src={ShinzoLogoFull} alt="Shinzō" className="w-[150px] lg:w-[255px]" aria-label="Shinzo" /></Link>
          </BlockContainer>
        </header>

        <main>
          {children}
        </main>

        <footer className="mt-auto">
          <BlockContainer className="py-10">
            <p className="text-px-12 font-mono">© {new Date().getFullYear()} Shinzō</p>
          </BlockContainer>
        </footer>
      </body>
    </html>
  )
}
