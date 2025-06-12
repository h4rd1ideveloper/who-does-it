import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', images: {
    domains: ['randomuser.me', 'images.unsplash.com'],
  },
};

export default nextConfig;
