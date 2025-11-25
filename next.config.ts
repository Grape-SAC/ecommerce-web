import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Para cuando trabajes sin docker (si quieres seguir usando esto)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/images/**',
      },
      // 🔥 Para cuando corre en docker (lo importante)
      {
        protocol: 'http',
        hostname: 'nginx',
        // sin port porque es 80
        pathname: '/images/**',
      },
    ],
  },
  // comentar esto despues para corregir warning importantes
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
