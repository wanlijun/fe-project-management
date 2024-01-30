/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/api/:path',
        destination: 'http://your-api-url.com/:path',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
