import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'
import Navbar from '@/components/navbar'

export const metadata: Metadata = {
  title: 'Shorten. Share. Track.',
  description: 'Production-grade URL shortening and analytics platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}