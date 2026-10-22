import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl = 'https://gaggle.frengky.xyz'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Gaggle — Your AI. Your Workspace. Your Rules.',
    template: '%s | Gaggle',
  },
  description: 'Gaggle is an open-source, local-first AI assistant designed around your workspace, projects, and everyday development work.',
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
    title: 'Gaggle — Your AI. Your Workspace. Your Rules.',
    description: 'Gaggle is an open-source, local-first AI assistant designed around your workspace, projects, and everyday development work.',
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
    title: 'Gaggle — Your AI. Your Workspace. Your Rules.',
    description: 'Gaggle is an open-source, local-first AI assistant designed around your workspace, projects, and everyday development work.',
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
    <html lang="en">
      <body className="antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Gaggle',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'macOS, Linux',
            description: 'An open-source, local-first personal AI assistant designed around your workspace, projects, and everyday development work.',
            url: 'https://gaggle.frengky.xyz',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      {children}
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </body>
    </html>
  )
}
