/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.microcms-assets.io'], // ここにドメインを追加
  },
}

module.exports = nextConfig
