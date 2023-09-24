await import("./lib/env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "d2wy52y0hrt3v.cloudfront.net",
      "images.unsplash.com",
      "static-mp.lamudi.com",
      "static-ph.lamudi.com",
      "tailwindui.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2wy52y0hrt3v.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
