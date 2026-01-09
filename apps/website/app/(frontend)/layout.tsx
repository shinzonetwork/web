import Analytics from "@/components/analytics";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import localFont from 'next/font/local';
import React from 'react';
import './styles.css';

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
    follow: process.env.ALLOW_INDEXING === "true",
  },
}

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], });
const jpSerif = localFont({ src: '../../fonts/jp-serif.woff2', variable: "--font-jp-serif" });

const fonts = `${inter.variable} ${geistMono.variable} ${jpSerif.variable}`;

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={fonts}>
        <Analytics>
          <div className={cn(`min-h-screen flex flex-col`)} >
            <Header navMenu={headerNavMenu} socialLinks={socialLinks} docsLink={docsLinks} />

            <main className="grow">
              {children}
            </main>

            <Footer footerNavMenu={footerNavMenu} />
          </div>
        </Analytics>
      </body>
    </html>
  )
}

export interface NavLink {
  label: string;
  type?: 'external' | 'internal';
  href?: string;
  items?: {
    label: string;
    type?: 'external' | 'internal';
    href: string;
  }[];
}

const socialLinks = {
  github: 'https://github.com/shinzonetwork',
}

const docsLinks = 'https://docs.shinzo.network/';

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
  },
  {
    label: "Community",
    items: [
      {
        type: 'external',
        label: "Discord",
        href: "https://discord.shinzo.network",
      },
      {
        type: 'external',
        label: "GitHub",
        href: "https://github.com/shinzonetwork",
      },
      {
        type: 'external',
        label: "X",
        href: "https://x.com/shinzonetwork",
      },
      {
        type: 'external',
        label: 'Telegram',
        href: 'https://t.me/shinzonetwork'
      }
    ],
  },
]

const footerNavMenu: NavLink[] = [
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
    label: "Resources",
    items: [
      {
        label: "Blog",
        href: "/blog",
      },
      {
        label: "Manifesto",
        href: "/truth",
      }
    ],
  },
  {
    label: "Community",
    items: [
      {
        type: 'external',
        label: "Discord",
        href: "https://discord.shinzo.network",
      },
      {
        type: 'external',
        label: "GitHub",
        href: "https://github.com/shinzonetwork",
      },
      {
        type: 'external',
        label: "X",
        href: "https://x.com/shinzonetwork",
      },
      {
        type: 'external',
        label: 'Telegram',
        href: 'https://t.me/shinzonetwork'
      }
    ],
  },
]
