import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { readPublishedPage } from "@/lib/page-data";
import { localizePath } from "@/i18n/locales";
import { pageMetadata } from "@/seo/metadata";
import { subsidiarySlugs } from "@/content/slugs";

export function generateStaticParams() {
  return subsidiarySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = await readPublishedPage(locale);
  const company = page.content.subsidiaries.find((item) => item.slug === slug);
  if (!company) return {};
  return pageMetadata({
    locale: page.locale,
    path: `/ecosystem/${company.slug}`,
    seo: company.seo,
  });
}

export default async function SubsidiaryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = await readPublishedPage(locale);
  const company = page.content.subsidiaries.find((item) => item.slug === slug);
  if (!company) notFound();
  const sector = page.content.sectors.find(
    (item) => item.id === company.sectorId,
  );
  const projects = page.content.projects.filter((item) =>
    company.projectIds.includes(item.id),
  );

  return (
    <Container className="section-space grid gap-6">
      <Breadcrumbs
        items={[
          { label: page.dictionary.ecosystem, path: "/ecosystem" },
          { label: company.name, path: `/ecosystem/${company.slug}` },
        ]}
        dictionary={page.dictionary}
        locale={page.locale}
      />
      <h1>{company.name}</h1>
      <p>{company.legalName}</p>
      <p className="prose-measure">{company.body}</p>
      <h2>{page.dictionary.facts}</h2>
      <ul className="grid gap-2">
        <li>{company.relationshipNote}</li>
        {company.locations.map((location) => (
          <li key={location}>{location}</li>
        ))}
        <li>{company.email}</li>
        <li>{company.phone}</li>
      </ul>
      {sector ? (
        <Link href={localizePath(page.locale, `/sectors/${sector.slug}`)}>
          {sector.name}
        </Link>
      ) : null}
      <h2>{page.dictionary.projects}</h2>
      <ul className="grid gap-2">
        {projects.map((project) => (
          <li key={project.id}>
            <Link href={localizePath(page.locale, `/projects/${project.slug}`)}>
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
