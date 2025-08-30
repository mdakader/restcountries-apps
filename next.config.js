// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Allows all paths on cloudinary
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development', // Disable image optimization in development
  },
};

module.exports = nextConfig;
