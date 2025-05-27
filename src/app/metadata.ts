import type { Metadata } from 'next'

export interface MetadataConfig {
  title?: string
  description?: string
  keywords?: string[]
  author?: string
  ogImage?: string
  twitterCard?: 'summary' | 'summary_large_image'
  canonical?: string
}

export function generateMetadata(config: MetadataConfig = {}): Metadata {
  const {
    title = 'Nolin Naidoo',
    description = 'Full-stack developer portfolio showcasing modern web applications and innovative solutions.',
    keywords = [
      'developer',
      'portfolio',
      'web development',
      'full-stack',
      'react',
      'nextjs',
    ],
    author = 'Nolin Naidoo',
    ogImage = '/og-image.jpg',
    twitterCard = 'summary_large_image',
    canonical,
  } = config

  const metadata: Metadata = {
    title,
    description,
    keywords,
    authors: [{ name: author }],
    creator: author,
    publisher: author,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    ),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        'index': true,
        'follow': true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }

  if (canonical) {
    metadata.alternates = {
      canonical,
    }
  }

  return metadata
}

// Default metadata for the site
export const defaultMetadata = generateMetadata()

// Helper function for page-specific metadata
export function createPageMetadata(config: MetadataConfig): Metadata {
  return generateMetadata({
    ...config,
    title: config.title ? `${config.title} | Nolin Naidoo` : undefined,
  })
}
