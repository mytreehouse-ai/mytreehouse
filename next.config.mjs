import { withSentryConfig } from "@sentry/nextjs";
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
      "loading.io",
      "ik.imagekit.io",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2wy52y0hrt3v.cloudfront.net",
      },
    ],
  },
};

export default withSentryConfig(
  nextConfig,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "kmc-solutions",
    project: "mytreehouse",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
);
