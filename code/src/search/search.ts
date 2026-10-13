import type { SiteContent } from "@/content/map";
import type { Locale } from "@/i18n/locales";
import { localizePath } from "@/i18n/locales";

export type SearchResult = {
  title: string;
  excerpt: string;
  href: string;
};

export type SearchResponse =
  | { status: "empty"; results: [] }
  | { status: "results"; results: SearchResult[] }
  | { status: "none"; results: [] }
  | { status: "error"; results: [] };

const maxQueryLength = 120;

export function searchContent(
  content: SiteContent,
  locale: Locale,
  query: string,
): SearchResponse {
  const term = query.trim();
  if (!term) {
    return { status: "empty", results: [] };
  }
  if (term.length > maxQueryLength) {
    return { status: "error", results: [] };
  }

  const haystacks: SearchResult[] = [
    ...content.sectors.map((item) => ({
      title: item.name,
      excerpt: item.excerpt,
      href: localizePath(locale, `/sectors/${item.slug}`),
    })),
    ...content.subsidiaries.map((item) => ({
      title: item.name,
      excerpt: item.excerpt,
      href: localizePath(locale, `/ecosystem/${item.slug}`),
    })),
    ...content.projects.map((item) => ({
      title: item.title,
      excerpt: item.summary,
      href: localizePath(locale, `/projects/${item.slug}`),
    })),
    ...content.news.map((item) => ({
      title: item.title,
      excerpt: item.summary,
      href: localizePath(locale, `/news/${item.slug}`),
    })),
    ...content.careers.map((item) => ({
      title: item.title,
      excerpt: item.description,
      href: localizePath(locale, `/careers/${item.slug}`),
    })),
  ];

  const needle = term.toLowerCase();
  const results = haystacks.filter((item) =>
    `${item.title} ${item.excerpt}`.toLowerCase().includes(needle),
  );

  return results.length
    ? { status: "results", results }
    : { status: "none", results: [] };
}
