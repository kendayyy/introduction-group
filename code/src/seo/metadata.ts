import type { Metadata } from "next";
import type { SeoFields } from "@/content/schema";
import { env } from "@/env";
import {
  defaultLocale,
  locales,
  localizePath,
  type Locale,
} from "@/i18n/locales";

export function siteOrigin() {
  return env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:3000";
}

export function pageMetadata(options: {
  locale: Locale;
  path: string;
  seo: SeoFields;
  noIndex?: boolean;
}): Metadata {
  const canonical = localizePath(options.locale, options.path);
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizePath(locale, options.path)]),
  );

  return {
    title: options.seo.title,
    description: options.seo.description,
    metadataBase: new URL(siteOrigin()),
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": localizePath(defaultLocale, options.path),
      },
    },
    openGraph: {
      title: options.seo.title,
      description: options.seo.description,
      url: canonical,
      images: [{ url: options.seo.ogImage, alt: options.seo.title }],
      locale: options.locale,
    },
    robots:
      options.noIndex || !options.seo.indexable
        ? { index: false, follow: false }
        : { index: true, follow: true },
  };
}
