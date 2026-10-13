import { notFound } from "next/navigation";
import { getPublishedContent } from "@/content/published";
import type { SiteContent } from "@/content/map";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale, type Locale } from "@/i18n/locales";

export async function readPublishedPage(locale: string): Promise<{
  locale: Locale;
  dictionary: ReturnType<typeof getDictionary>;
  content: SiteContent;
}> {
  if (!isLocale(locale)) {
    notFound();
  }

  const loaded = await getPublishedContent(locale);
  if (loaded.status !== "ready") {
    notFound();
  }

  return {
    locale,
    dictionary: getDictionary(locale),
    content: loaded.content,
  };
}
