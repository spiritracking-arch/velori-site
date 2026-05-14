import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cms.zojewel.com' },
      { protocol: 'https', hostname: '*.zojewel.com' },
    ],
  },
}

export default nextConfig
