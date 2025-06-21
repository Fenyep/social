import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['dummyjson.com', 'ui-avatars.com'],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
