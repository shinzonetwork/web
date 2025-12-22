import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Shinzō | The Read Layer of Truth',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL || "https://shinzo.network"
  ),
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

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
