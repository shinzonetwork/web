import React from 'react'

export const metadata = {
  title: 'Shinzō | The Read Layer of Truth',
  description: '',
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
