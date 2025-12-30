import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import DiscordSvg from "@/components/DiscordSvg";
import GithubSvg from "@/components/GithubSvg";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shinzo",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`} >

        <div className="flex justify-end gap-3 py-5 px-4 wrapper">
          <Link href="https://discord.shinzo.network" target="_blank" aria-label="Join the Discord">
            <DiscordSvg className="size-6" />
          </Link>
          <Link href="https://github.com/shinzonetwork" target="_blank" aria-label="Visit the GitHub repository">
            <GithubSvg className="size-6" />
          </Link>
        </div>

        {children}

        <footer className="py-10">
          <div className="flex justify-center gap-3 py-5 px-4 wrapper">
            <Link href="https://discord.shinzo.network" target="_blank" aria-label="Join the Discord">
              <DiscordSvg className="size-6" />
            </Link>
            <Link href="https://github.com/shinzonetwork" target="_blank" aria-label="Visit the GitHub repository">
              <GithubSvg className="size-6" />
            </Link>
          </div>

          <p className="text-center text-sm">©2025 Shinzō, All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}
