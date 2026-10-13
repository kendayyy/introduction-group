import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { EcosystemPanel } from "@/components/sections/ecosystem-panel";
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
    path: "/ecosystem",
    seo: { ...seoDefaults, title: page.dictionary.ecosystem },
  });
}

export default async function EcosystemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  return (
    <Container className="section-space grid gap-8">
      <Breadcrumbs
        items={[{ label: page.dictionary.ecosystem, path: "/ecosystem" }]}
        dictionary={page.dictionary}
        locale={page.locale}
      />
      <h1>{page.dictionary.ecosystem}</h1>
      <EcosystemPanel
        sectors={page.content.sectors}
        subsidiaries={page.content.subsidiaries}
        dictionary={page.dictionary}
        locale={page.locale}
      />
    </Container>
  );
}
