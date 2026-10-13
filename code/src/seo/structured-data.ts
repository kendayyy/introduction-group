import type { Career, NewsItem, SiteContent } from "@/content/map";
import type { Locale } from "@/i18n/locales";
import { localizePath } from "@/i18n/locales";
import { isPublishableArticle, isPublishableJob } from "@/seo/routes";
import { siteOrigin } from "@/seo/metadata";

export function organizationSchema(content: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: content.company.name,
    url: siteOrigin(),
    logo: new URL(content.company.logo.src, siteOrigin()).toString(),
    description: content.company.description,
  };
}

export function websiteSchema(content: SiteContent, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: content.company.name,
    url: new URL(localizePath(locale), siteOrigin()).toString(),
    potentialAction: {
      "@type": "SearchAction",
      target: `${new URL(localizePath(locale, "/search"), siteOrigin()).toString()}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(localizePath(locale, item.path), siteOrigin()).toString(),
    })),
  };
}

export function articleSchema(item: NewsItem, locale: Locale) {
  if (!isPublishableArticle(item)) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    datePublished: item.dateLabel,
    author: { "@type": "Person", name: item.author },
    image: new URL(item.image.src, siteOrigin()).toString(),
    description: item.summary,
    mainEntityOfPage: new URL(
      localizePath(locale, `/news/${item.slug}`),
      siteOrigin(),
    ).toString(),
  };
}

export function jobPostingSchema(
  item: Career,
  locale: Locale,
  companyName: string,
) {
  if (!isPublishableJob(item)) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: item.title,
    description: item.description,
    datePosted: item.deadline,
    validThrough: item.deadline,
    employmentType: item.workType,
    jobLocation: {
      "@type": "Place",
      address: item.location,
    },
    hiringOrganization: {
      "@type": "Organization",
      name: companyName,
    },
    url: new URL(
      localizePath(locale, `/careers/${item.slug}`),
      siteOrigin(),
    ).toString(),
  };
}
