import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/media/:filename*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/media/:filename*`,
      },
    ];
  },
};

export default nextConfig;
