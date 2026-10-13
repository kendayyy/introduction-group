import type { MetadataRoute } from "next";
import { loadLocalContent } from "@/content/repository";
import { env } from "@/env";
import { siteOrigin } from "@/seo/metadata";
import { buildSitemap } from "@/seo/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const content = loadLocalContent(false);
  if (!content) {
    return [];
  }

  return buildSitemap(content, siteOrigin(), {
    investors: env.NEXT_PUBLIC_INVESTOR_RELATIONS_ENABLED,
  });
}
