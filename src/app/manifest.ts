import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SF Pizza, Bagel & Beer Festival',
    short_name: 'SF Fest',
    description: "Rate and vote for your favorites at San Francisco's Pizza, Bagel & Beer Festival in North Beach.",
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#120600',
    theme_color: '#120600',
    icons: [
      { src: '/icon-192', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
