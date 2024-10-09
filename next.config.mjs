/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com'],
    },
    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
  }

export default nextConfig;
