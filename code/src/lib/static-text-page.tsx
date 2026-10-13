import { TextPage } from "@/components/templates/text-page";
import type { SiteContent } from "@/content/map";
import { readPublishedPage } from "@/lib/page-data";
import { pageMetadata } from "@/seo/metadata";

type PageKey =
  | "vision"
  | "mission"
  | "values"
  | "governance"
  | "process"
  | "privacy"
  | "terms"
  | "cookies"
  | "recruitment"
  | "brand"
  | "disclaimer"
  | "press";

const paths: Record<PageKey, string> = {
  vision: "/about/vision",
  mission: "/about/mission",
  values: "/about/values",
  governance: "/about/governance",
  process: "/careers/process",
  privacy: "/privacy",
  terms: "/terms",
  cookies: "/cookies",
  recruitment: "/careers/notice",
  brand: "/news/brand",
  disclaimer: "/legal/disclaimer",
  press: "/news/press",
};

export function createTextRoute(
  key: PageKey,
  label: (
    dictionary: Awaited<ReturnType<typeof readPublishedPage>>["dictionary"],
  ) => string,
  crumbs: (
    dictionary: Awaited<ReturnType<typeof readPublishedPage>>["dictionary"],
  ) => Array<{ label: string; path: string }>,
) {
  return {
    async generateMetadata({
      params,
    }: {
      params: Promise<{ locale: string }>;
    }) {
      const page = await readPublishedPage((await params).locale);
      return pageMetadata({
        locale: page.locale,
        path: paths[key],
        seo: page.content.pages[key].seo,
      });
    },
    async Page({ params }: { params: Promise<{ locale: string }> }) {
      const page = await readPublishedPage((await params).locale);
      return (
        <TextPage
          title={label(page.dictionary)}
          body={page.content.pages[key].body}
          crumbs={crumbs(page.dictionary)}
          dictionary={page.dictionary}
          locale={page.locale}
        />
      );
    },
  };
}

export type { SiteContent };
