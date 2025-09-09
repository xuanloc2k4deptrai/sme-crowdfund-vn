/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Force Pages Router (disable App Router)
  experimental: {
    appDir: false,
  },
  
  // Page routing configuration
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  
  // Image optimization
  images: {
    domains: ['localhost', '127.0.0.1'], // Local development domains
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Remove problematic devtool setting that causes warnings
    if (dev) {
      config.devtool = 'cheap-module-source-map';
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