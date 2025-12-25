import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'School of Self-Discovery | Unlock Your Inner Possibilities',
  description: 'A comprehensive program for personal development across all age groups - Children, Teens, Young Adults, and Adults.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

