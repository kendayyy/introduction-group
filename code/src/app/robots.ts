import type { MetadataRoute } from "next";
import { loadLocalContent } from "@/content/repository";
import { productionContentBlockers } from "@/content/readiness";
import { env } from "@/env";
import { siteOrigin } from "@/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  const content = loadLocalContent(false);
  const blocked = content
    ? productionContentBlockers(content).length > 0
    : true;
  const indexingAllowed =
    env.ALLOW_INDEXING || !blocked || env.NODE_ENV !== "production";

  if (!indexingAllowed) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dev/"],
    },
    sitemap: new URL("/sitemap.xml", siteOrigin()).toString(),
  };
}
