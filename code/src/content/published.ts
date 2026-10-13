import { cache } from "react";
import { unstable_cache } from "next/cache";
import { loadSiteContent, type ContentLoad } from "@/content/repository";
import type { Locale } from "@/i18n/locales";

const publishedTags = [
  "content",
  "sectors",
  "subsidiaries",
  "projects",
  "news",
  "careers",
];

async function loadPublished(locale: Locale): Promise<ContentLoad> {
  return loadSiteContent(false, locale);
}

const loadPublishedCached = (locale: Locale) =>
  unstable_cache(
    () => loadPublished(locale),
    ["published-site-content", locale],
    {
      tags: publishedTags,
      revalidate: 3600,
    },
  )();

const loadPublishedRequest = cache(loadPublished);

// Dev compiles many routes at once and can read a half-written cache file.
// Request dedupe is enough there. Production keeps tag-based revalidation.
export function getPublishedContent(locale: Locale = "vi") {
  return process.env.NODE_ENV === "production"
    ? loadPublishedCached(locale)
    : loadPublishedRequest(locale);
}
