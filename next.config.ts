import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: 'rickandmortyapi.com'
      }
    ]
  }
}

export default nextConfig
