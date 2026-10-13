import type { SiteContent } from "@/content/map";
import { locales, localizePath, type Locale } from "@/i18n/locales";

export type PublicRoute = {
  locale: Locale;
  path: string;
  indexable: boolean;
};

export function publicRoutes(
  content: SiteContent,
  options: { investors: boolean },
): PublicRoute[] {
  const paths = [
    { path: "/", indexable: content.company.seo.indexable },
    { path: "/about", indexable: content.pages.about.seo.indexable },
    { path: "/about/history", indexable: content.pages.history.seo.indexable },
    { path: "/about/vision", indexable: content.pages.vision.seo.indexable },
    { path: "/about/mission", indexable: content.pages.mission.seo.indexable },
    { path: "/about/values", indexable: content.pages.values.seo.indexable },
    { path: "/about/leadership", indexable: true },
    {
      path: "/about/governance",
      indexable: content.pages.governance.seo.indexable,
    },
    { path: "/sectors", indexable: true },
    ...content.sectors.map((item) => ({
      path: `/sectors/${item.slug}`,
      indexable: item.seo.indexable,
    })),
    { path: "/ecosystem", indexable: true },
    ...content.subsidiaries.map((item) => ({
      path: `/ecosystem/${item.slug}`,
      indexable: item.seo.indexable,
    })),
    { path: "/projects", indexable: true },
    ...content.projects.map((item) => ({
      path: `/projects/${item.slug}`,
      indexable: item.seo.indexable,
    })),
    { path: "/sustainability", indexable: true },
    ...content.sustainability.map((item) => ({
      path: `/sustainability/${item.slug}`,
      indexable: item.seo.indexable,
    })),
    { path: "/news", indexable: true },
    { path: "/news/press", indexable: content.pages.press.seo.indexable },
    ...content.news.map((item) => ({
      path: `/news/${item.slug}`,
      indexable: item.seo.indexable && isPublishableArticle(item),
    })),
    { path: "/careers", indexable: true },
    {
      path: "/careers/process",
      indexable: content.pages.process.seo.indexable,
    },
    { path: "/careers/faq", indexable: true },
    ...content.careers.map((item) => ({
      path: `/careers/${item.slug}`,
      indexable: item.seo.indexable && isPublishableJob(item),
    })),
    { path: "/contact", indexable: true },
    { path: "/search", indexable: true },
    { path: "/privacy", indexable: content.pages.privacy.seo.indexable },
    { path: "/terms", indexable: content.pages.terms.seo.indexable },
    { path: "/cookies", indexable: content.pages.cookies.seo.indexable },
    {
      path: "/careers/notice",
      indexable: content.pages.recruitment.seo.indexable,
    },
    { path: "/news/brand", indexable: content.pages.brand.seo.indexable },
    {
      path: "/legal/disclaimer",
      indexable: content.pages.disclaimer.seo.indexable,
    },
    { path: "/sitemap", indexable: true },
    ...(options.investors
      ? [
          {
            path: "/investors",
            indexable: content.pages.investors.seo.indexable,
          },
        ]
      : []),
  ];

  return locales.flatMap((locale) =>
    paths.map((item) => ({
      locale,
      path: localizePath(locale, item.path),
      indexable: item.indexable,
    })),
  );
}

export function isPublishableArticle(item: {
  dateLabel: string;
  title: string;
  author: string;
  summary?: string;
}) {
  return ![item.dateLabel, item.title, item.author, item.summary ?? ""].some(
    (value) =>
      value.includes("[PLACEHOLDER]") ||
      value.includes("DEMO_ONLY") ||
      value.includes("LEGAL_VERIFY_"),
  );
}

export function isPublishableJob(item: {
  title: string;
  description: string;
  deadline: string;
  location: string;
}) {
  return ![item.title, item.description, item.deadline, item.location].some(
    (value) =>
      value.includes("[PLACEHOLDER]") ||
      value.includes("DEMO_ONLY") ||
      value.includes("LEGAL_VERIFY_"),
  );
}

export function buildSitemap(
  content: SiteContent,
  origin: string,
  options: { investors: boolean },
) {
  return publicRoutes(content, options)
    .filter((route) => route.indexable)
    .filter((route) => !route.path.includes("?"))
    .filter((route) => !route.path.includes("/dev"))
    .filter((route) => !route.path.includes("/preview"))
    .map((route) => ({
      url: new URL(route.path, origin).toString(),
      changeFrequency: "weekly" as const,
      priority: route.path.endsWith(`/${route.locale}`) ? 1 : 0.7,
    }));
}
