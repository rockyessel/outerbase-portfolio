/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'esselr.vercel.app',
      'hackernoon.imgix.net',
      'images.unsplash.com',
    ],
  },
};

module.exports = nextConfig;
