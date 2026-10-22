import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl = 'https://gaggle.frengky.xyz'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Gaggle — An Open-Source, Local-First AI Assistant',
    template: '%s | Gaggle',
  },
  description: 'Meet Gaggle, an open-source AI assistant designed to work with your files, projects, and development workflows on macOS and Linux.',
  generator: 'Next.js',
  applicationName: 'Gaggle',
  keywords: ['Gaggle', 'AI assistant', 'local-first', 'open source', 'developer tools', 'workspace', 'personal AI agent'],
  authors: [{ name: 'Gaggle' }],
  creator: 'Gaggle',
  publisher: 'Gaggle',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Gaggle',
    title: 'Gaggle — An Open-Source, Local-First AI Assistant',
    description: 'Meet Gaggle, an open-source AI assistant designed to work with your files, projects, and development workflows on macOS and Linux.',
    images: [
      {
        url: '/placeholder-logo.png',
        width: 1200,
        height: 630,
        alt: 'Gaggle landing page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gaggle — An Open-Source, Local-First AI Assistant',
    description: 'Meet Gaggle, an open-source AI assistant designed to work with your files, projects, and development workflows on macOS and Linux.',
    images: ['/placeholder-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
    shortcut: '/icon.svg',
  },
  category: 'technology',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}