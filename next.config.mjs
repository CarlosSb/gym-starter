/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // ✅ Habilitar verificação de ESLint
  },
  typescript: {
    ignoreBuildErrors: false, // ✅ Habilitar verificação de TypeScript
  },
  images: {
    unoptimized: false, // ✅ Otimizar imagens para produção
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vercel-storage.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.blob.vercel-storage.com',
        port: '',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig
