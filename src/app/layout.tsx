import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/NavBar'

export const metadata: Metadata = {
  title: 'SF Pizza, Bagel & Beer Festival',
  description: 'Rate and vote for your favorites at San Francisco\'s annual Pizza, Bagel & Beer Festival in North Beach.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <NavBar />
        <main className="flex-1">{children}</main>
        <footer className="text-center py-6 text-sm" style={{ color: '#8a6040', borderTop: '1px solid #2a1000' }}>
          <p>SF Pizza, Bagel &amp; Beer Festival · North Beach, San Francisco</p>
          <p className="mt-1">Proceeds benefit local Bay Area causes</p>
        </footer>
      </body>
    </html>
  )
}
