/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/CORE-SOLUTION' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/CORE-SOLUTION' : '',
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig