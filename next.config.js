/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Отключаем оптимизацию для локальных изображений
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
}

module.exports = nextConfig


