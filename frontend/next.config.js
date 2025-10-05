/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Pages directory configuration
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Root directory configuration
  outputFileTracingRoot: "d:\\APP xuanloc\\Nền tảng gọi vốn SME\\sme-crowdfund-vn\\frontend",
  
  // Image optimization
  images: {
    domains: ['localhost', '127.0.0.1', 'via.placeholder.com', 'placehold.co', 'images.unsplash.com', 'source.unsplash.com'], // Common image domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize for development
    if (dev) {
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
    }
    return config;
  },
  
  // Environment variables
  env: {
    API_URL: process.env.API_URL || 'http://localhost:5000',
    CUSTOM_APP_ENV: process.env.NODE_ENV || 'development',
  },
  
  // Development server configuration
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Backend API proxy
      },
    ];
  },
  
  // Security headers for development
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;