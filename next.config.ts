import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'], // Agregar "localhost" como dominio permitido
  },
};

export default nextConfig;
