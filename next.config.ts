import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    // Disable ESLint checks during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript type checking during build (optional)
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizeCss: false,
  },
  transpilePackages: ["lightningcss", "@tailwindcss/postcss"],
  webpack: (config) => {
    // Avoid lightningcss native module issues
    config.resolve.alias = {
      ...config.resolve.alias,
      lightningcss: false,
    };
    return config;
  },
};

export default nextConfig;
