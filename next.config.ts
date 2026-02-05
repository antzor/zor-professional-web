import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    // TODO: Remove once migration is complete
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
