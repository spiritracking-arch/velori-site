import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cms.zojewel.com' },
      { protocol: 'https', hostname: '*.zojewel.com' },
    ],
  },
  // Force dynamic — pas de SSG, tout est rendu à la demande ou via ISR
  experimental: {
    dynamicIO: false,
  },
}

export default nextConfig
