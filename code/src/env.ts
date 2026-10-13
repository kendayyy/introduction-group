import { z } from "zod";

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
};

const optionalText = z.preprocess(
  emptyToUndefined,
  z.string().min(1).optional(),
);

const optionalUrl = z.preprocess(emptyToUndefined, z.url().optional());

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  CONTENT_MODE: z
    .preprocess(emptyToUndefined, z.enum(["demo", "production"]).optional())
    .transform((value) => value ?? "demo"),
  NEXT_PUBLIC_SITE_URL: optionalUrl,
  NEXT_PUBLIC_INVESTOR_RELATIONS_ENABLED: z
    .preprocess(emptyToUndefined, z.enum(["true", "false"]).optional())
    .transform((value) => value === "true"),
  SANITY_PROJECT_ID: optionalText,
  SANITY_DATASET: optionalText,
  SANITY_API_READ_TOKEN: optionalText,
  SANITY_PREVIEW_SECRET: optionalText,
  SANITY_REVALIDATE_SECRET: optionalText,
  TURNSTILE_SECRET_KEY: optionalText,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: optionalText,
  NEXT_PUBLIC_ANALYTICS_PROVIDER: z.preprocess(
    emptyToUndefined,
    z.enum(["ga4", "matomo"]).optional(),
  ),
  NEXT_PUBLIC_GA4_MEASUREMENT_ID: optionalText,
  NEXT_PUBLIC_MATOMO_URL: optionalUrl,
  NEXT_PUBLIC_MATOMO_SITE_ID: optionalText,
  ALLOW_INDEXING: z
    .preprocess(emptyToUndefined, z.enum(["true", "false"]).optional())
    .transform((value) => value === "true"),
});

export type AppEnv = z.infer<typeof envSchema>;

export type EnvInput = Partial<Record<string, string | undefined>>;

export function parseEnv(input: EnvInput): AppEnv {
  const result = envSchema.safeParse({
    NODE_ENV: input.NODE_ENV,
    CONTENT_MODE: input.CONTENT_MODE,
    NEXT_PUBLIC_SITE_URL: input.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_INVESTOR_RELATIONS_ENABLED:
      input.NEXT_PUBLIC_INVESTOR_RELATIONS_ENABLED,
    SANITY_PROJECT_ID: input.SANITY_PROJECT_ID,
    SANITY_DATASET: input.SANITY_DATASET,
    SANITY_API_READ_TOKEN: input.SANITY_API_READ_TOKEN,
    SANITY_PREVIEW_SECRET: input.SANITY_PREVIEW_SECRET,
    SANITY_REVALIDATE_SECRET: input.SANITY_REVALIDATE_SECRET,
    TURNSTILE_SECRET_KEY: input.TURNSTILE_SECRET_KEY,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: input.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    NEXT_PUBLIC_ANALYTICS_PROVIDER: input.NEXT_PUBLIC_ANALYTICS_PROVIDER,
    NEXT_PUBLIC_GA4_MEASUREMENT_ID: input.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
    NEXT_PUBLIC_MATOMO_URL: input.NEXT_PUBLIC_MATOMO_URL,
    NEXT_PUBLIC_MATOMO_SITE_ID: input.NEXT_PUBLIC_MATOMO_SITE_ID,
    ALLOW_INDEXING: input.ALLOW_INDEXING,
  });

  if (!result.success) {
    throw new Error(`Invalid environment: ${result.error.message}`);
  }

  return result.data;
}

export const env = parseEnv(process.env);
