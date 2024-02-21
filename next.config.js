/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5020/api/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
