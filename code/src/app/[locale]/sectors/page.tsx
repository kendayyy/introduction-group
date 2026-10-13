import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectorGrid } from "@/components/sections/sector-grid";
import { Container } from "@/components/ui/container";
import { seoDefaults } from "@/content/media";
import { readPublishedPage } from "@/lib/page-data";
import { pageMetadata } from "@/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  return pageMetadata({
    locale: page.locale,
    path: "/sectors",
    seo: { ...seoDefaults, title: page.dictionary.sectors },
  });
}

export default async function SectorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  return (
    <Container className="section-space grid gap-8">
      <Breadcrumbs
        items={[{ label: page.dictionary.sectors, path: "/sectors" }]}
        dictionary={page.dictionary}
        locale={page.locale}
      />
      <h1>{page.dictionary.sectors}</h1>
      <SectorGrid
        sectors={page.content.sectors}
        locale={page.locale}
        dictionary={page.dictionary}
      />
    </Container>
  );
}
