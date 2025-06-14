import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['randomuser.me', 'images.unsplash.com'],
  },
  reactStrictMode: true,
};

export default nextConfig;
