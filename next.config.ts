import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "no-referrer-when-downgrade" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Content-Security-Policy",
            value:
              "script-src 'self' 'unsafe-inline' https://maps.googleapis.com https://maps.gstatic.com; connect-src 'self' https://maps.googleapis.com https://maps.gstatic.com; frame-src 'self' https://www.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.gstatic.com;",
          },
        ],
      },
    ];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });
    return config;
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.sufismarket.com",
        pathname: "/media/products/**",
      },
    ],
  },
};

export default nextConfig;