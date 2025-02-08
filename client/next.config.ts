import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rlhduong-guides-s3-sydney.s3.ap-southeast-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
