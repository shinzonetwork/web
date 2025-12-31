import FooterNew from "@/components/footer-new";
import HeaderNew from "@/components/header-new";
import { cn } from "@/lib/utils";
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
          <HeaderNew navMenu={headerNavMenu} />

          <main className="grow">
            {children}
          </main>

          <FooterNew />
        </div>
      </body>
    </html>
  )
}

export interface NavLink {
  label: string;
  href?: string;
  items?: {
    label: string;
    href: string;
  }[];
}


const headerNavMenu: NavLink[] = [
  {
    label: "Who it's for",
    items: [
      {
        label: "Existing Chain Validators",
        href: "/chain-validators",
      },
      {
        label: "Data Hosts",
        href: "/data-hosts",
      },
      {
        label: "Builders",
        href: "/builders",
      },
      {
        label: "Protocols and Foundations",
        href: "/protocols-and-foundations",
      },
    ],
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Blog",
    href: "/blog",
  }
]