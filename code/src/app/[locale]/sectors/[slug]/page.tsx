import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { readPublishedPage } from "@/lib/page-data";
import { localizePath } from "@/i18n/locales";
import { pageMetadata } from "@/seo/metadata";
import { sectorSlugs } from "@/content/slugs";

export function generateStaticParams() {
  return sectorSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = await readPublishedPage(locale);
  const sector = page.content.sectors.find((item) => item.slug === slug);
  if (!sector) {
    return {};
  }
  return pageMetadata({
    locale: page.locale,
    path: `/sectors/${sector.slug}`,
    seo: sector.seo,
  });
}

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = await readPublishedPage(locale);
  const sector = page.content.sectors.find((item) => item.slug === slug);
  if (!sector) {
    notFound();
  }
  const companies = page.content.subsidiaries.filter((item) =>
    sector.companyIds.includes(item.id),
  );
  const projects = page.content.projects.filter((item) =>
    sector.projectIds.includes(item.id),
  );

  return (
    <Container className="section-space grid gap-8">
      <Breadcrumbs
        items={[
          { label: page.dictionary.sectors, path: "/sectors" },
          { label: sector.name, path: `/sectors/${sector.slug}` },
        ]}
        dictionary={page.dictionary}
        locale={page.locale}
      />
      <h1>{sector.name}</h1>
      <ResponsiveImage image={sector.image} priority sizes="100vw" />
      <p className="prose-measure">{sector.body}</p>
      <h2>{page.dictionary.capabilities}</h2>
      <ul className="list-disc ps-5">
        {sector.capabilities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h2>{page.dictionary.ecosystem}</h2>
      <Related
        items={companies.map((item) => ({
          id: item.id,
          href: localizePath(page.locale, `/ecosystem/${item.slug}`),
          label: item.name,
        }))}
        empty={page.dictionary.emptyRecords}
      />
      <h2>{page.dictionary.projects}</h2>
      <Related
        items={projects.map((item) => ({
          id: item.id,
          href: localizePath(page.locale, `/projects/${item.slug}`),
          label: item.title,
        }))}
        empty={page.dictionary.emptyRecords}
      />
    </Container>
  );
}

function Related({
  items,
  empty,
}: {
  items: Array<{ id: string; href: string; label: string }>;
  empty: string;
}) {
  if (items.length === 0) {
    return <p>{empty}</p>;
  }
  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li key={item.id}>
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
}
