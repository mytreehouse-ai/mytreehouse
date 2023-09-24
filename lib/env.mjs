// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_HOST: z.string().nonempty(),
    DATABASE_USER: z.string().nonempty(),
    DATABASE_PASS: z.string().nonempty(),
    DATABASE_NAME: z.string().nonempty(),
    PROPELAUTH_VERIFIER_KEY: z.string().nonempty(),
    PROPELAUTH_REDIRECT_URI: z.string().url(),
    PROPELAUTH_API_KEY: z.string().nonempty(),
    NESTJS_BASE_API_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_AUTH_URL: z.string().url(),
    NEXT_PUBLIC_NESTJS_BASE_API_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASS: process.env.DATABASE_PASS,
    DATABASE_NAME: process.env.DATABASE_NAME,
    PROPELAUTH_VERIFIER_KEY: process.env.PROPELAUTH_VERIFIER_KEY,
    PROPELAUTH_REDIRECT_URI: process.env.PROPELAUTH_REDIRECT_URI,
    PROPELAUTH_API_KEY: process.env.PROPELAUTH_API_KEY,
    NESTJS_BASE_API_URL: process.env.NESTJS_BASE_API_URL,
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
    NEXT_PUBLIC_NESTJS_BASE_API_URL:
      process.env.NEXT_PUBLIC_NESTJS_BASE_API_URL,
  },
});
