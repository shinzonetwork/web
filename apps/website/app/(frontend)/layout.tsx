import BlockContainer from "@/components/block-container";
import { cn } from "@/lib/utils";
import ShinzoLogoFull from "@/public/shinzo-logo-full.svg";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import './styles.css';

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
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
  )
}
