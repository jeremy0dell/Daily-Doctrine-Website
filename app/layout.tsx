import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Daily Doctrine — A line of discipline, every morning',
  description: 'Short, high-impact quotes you can read in seconds, pin to a widget, or turn into a clean wallpaper. Stoic philosophy, scripture, modern grit — built for composure, focus, and quiet strength.',
  metadataBase: new URL('https://dailydoctrine.xyz'),
  icons: {
    icon: [
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/icons/apple-touch-icon-180x180.png',
  },
  openGraph: {
    title: 'Daily Doctrine — A line of discipline, every morning',
    description: 'Short, high-impact quotes you can read in seconds, pin to a widget, or turn into a clean wallpaper.',
    url: 'https://dailydoctrine.xyz',
    siteName: 'Daily Doctrine',
    images: [{ url: '/og/og-1200x630.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Doctrine — A line of discipline, every morning',
    description: 'Short, high-impact quotes you can read in seconds, pin to a widget, or turn into a clean wallpaper.',
    images: ['/og/og-1200x630.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
