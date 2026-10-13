import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { seoDefaults } from "@/content/media";
import { env } from "@/env";
import { readPublishedPage } from "@/lib/page-data";
import { pageMetadata } from "@/seo/metadata";
import { publicRoutes } from "@/seo/routes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  return pageMetadata({
    locale: page.locale,
    path: "/sitemap",
    seo: { ...seoDefaults, title: page.dictionary.htmlSitemap },
  });
}

export default async function HtmlSitemapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  const routes = publicRoutes(page.content, {
    investors: env.NEXT_PUBLIC_INVESTOR_RELATIONS_ENABLED,
  }).filter((route) => route.locale === page.locale && route.indexable);

  return (
    <Container className="section-space grid gap-6">
      <Breadcrumbs
        items={[{ label: page.dictionary.htmlSitemap, path: "/sitemap" }]}
        dictionary={page.dictionary}
        locale={page.locale}
      />
      <h1>{page.dictionary.htmlSitemap}</h1>
      <ul className="grid gap-2">
        {routes.map((route) => (
          <li key={route.path}>
            <Link href={route.path}>{route.path}</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
