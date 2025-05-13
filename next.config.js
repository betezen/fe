/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "**",
      },
    ],
    domains: ["i.pravatar.cc", "flagcdn.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizeCss: false,
  },
  webpack: (config) => {
    // Skip lightningcss native module
    config.resolve.alias = {
      ...config.resolve.alias,
      lightningcss: false,
    };
    return config;
  },
};

module.exports = nextConfig;
