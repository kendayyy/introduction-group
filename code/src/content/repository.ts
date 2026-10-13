import { mapSite, type SiteContent } from "@/content/map";
import { localRawSites } from "@/content/locales";
import { env } from "@/env";
import type { Locale } from "@/i18n/locales";
import { fetchSanitySite } from "@/sanity/fetch";

export type ContentLoad =
  { status: "ready"; content: SiteContent } | { status: "unavailable" };

export function loadLocalContent(
  preview = false,
  locale: Locale = "vi",
): SiteContent | null {
  return mapSite(localRawSites[locale], { preview, source: "local" });
}

export async function loadSiteContent(
  preview = false,
  locale: Locale = "vi",
): Promise<ContentLoad> {
  if (!env.SANITY_PROJECT_ID || !env.SANITY_DATASET) {
    const content = loadLocalContent(preview, locale);
    return content ? { status: "ready", content } : { status: "unavailable" };
  }

  try {
    const raw = await fetchSanitySite({
      projectId: env.SANITY_PROJECT_ID,
      dataset: env.SANITY_DATASET,
      token: preview ? env.SANITY_API_READ_TOKEN : undefined,
      preview,
    });
    const content = mapSite(raw, { preview, source: "sanity" });
    return content ? { status: "ready", content } : { status: "unavailable" };
  } catch {
    return { status: "unavailable" };
  }
}
