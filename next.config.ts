import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`, // Proxy to Backend
      },
    ]
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
