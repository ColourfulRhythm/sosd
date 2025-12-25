/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true, // Required for static export
  },
  output: 'export', // Static export for GitHub Pages
  trailingSlash: true,
}

module.exports = nextConfig


