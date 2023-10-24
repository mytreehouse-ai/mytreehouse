import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://ee9eaa79f9e8c44565ffa55aea727092@o4506103640424448.ingest.sentry.io/4506103641145344",

  environment: process.env.NODE_ENV,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
