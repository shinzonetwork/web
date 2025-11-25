import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        {children}

        <footer className="py-10">
          <p className="text-center text-sm">©2025 Shinzō, All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}
