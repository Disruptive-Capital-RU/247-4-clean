/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
    dirs: [], // Don't run ESLint on any directories
  },
  typescript: {
    // Disable TypeScript type checking during builds
    ignoreBuildErrors: true,
  },
  // Disable react strict mode to avoid double rendering issues
  reactStrictMode: false,
  // Configure allowed image domains
  images: {
    domains: ["randomuser.me"],
  },
};

module.exports = nextConfig;
