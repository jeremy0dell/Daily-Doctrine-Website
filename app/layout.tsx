import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Daily Doctrine',
  description: 'Daily inspirational quotes delivered to your iPhone',
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
        <footer>
          <span>&copy; 2025 Daily Doctrine</span>
          <a href="mailto:jeremy.odell01@gmail.com">jeremy.odell01@gmail.com</a>
        </footer>
      </body>
    </html>
  )
}
