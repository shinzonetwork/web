import BlockContainer from "@/components/block-container";
import { cn } from "@/lib/utils";
import ShinzoLogoFull from "@/public/shinzo-logo-full.svg";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import './styles.css';
import { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";

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
const fonts = `${inter.variable} ${geistMono.variable}`;

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={fonts}>
        <div className={cn(`min-h-screen flex flex-col`)} >
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
        </div>
      </body>
    </html>
  )
}
