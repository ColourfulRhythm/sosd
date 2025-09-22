/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['adpromoter.s3.amazonaws.com', 'raw.githubusercontent.com'],
  },
};

module.exports = nextConfig;
