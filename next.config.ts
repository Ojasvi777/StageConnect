import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com', // For S3 URLs
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // For Google profile images
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // For GitHub profile images
      },
    ],
  },
};

export default nextConfig;
