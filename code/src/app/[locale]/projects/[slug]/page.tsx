import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Gallery } from "@/components/templates/gallery";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { readPublishedPage } from "@/lib/page-data";
import { localizePath } from "@/i18n/locales";
import { pageMetadata } from "@/seo/metadata";
import { projectSlugs } from "@/content/slugs";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = await readPublishedPage(locale);
  const project = page.content.projects.find((item) => item.slug === slug);
  if (!project) return {};
  return pageMetadata({
    locale: page.locale,
    path: `/projects/${project.slug}`,
    seo: project.seo,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = await readPublishedPage(locale);
  const project = page.content.projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const sector = page.content.sectors.find(
    (item) => item.id === project.sectorId,
  );
  const related = page.content.projects.filter((item) =>
    project.relatedIds.includes(item.id),
  );

  return (
    <Container className="section-space grid gap-6">
      <Breadcrumbs
        items={[
          { label: page.dictionary.projects, path: "/projects" },
          { label: project.title, path: `/projects/${project.slug}` },
        ]}
        dictionary={page.dictionary}
        locale={page.locale}
      />
      <h1>{project.title}</h1>
      <p>
        {project.location} · {project.year} ·{" "}
        {page.dictionary.status[project.projectStatus]}
      </p>
      <p className="prose-measure">{project.body}</p>
      <Gallery
        images={project.gallery}
        label={page.dictionary.gallery}
        previousLabel={page.dictionary.previous}
        nextLabel={page.dictionary.next}
        emptyLabel={page.dictionary.emptyRecords}
      />
      {project.statistics.length === 0 ? (
        <p>{page.dictionary.emptyMetrics}</p>
      ) : null}
      {sector ? (
        <Link href={localizePath(page.locale, `/sectors/${sector.slug}`)}>
          {sector.name}
        </Link>
      ) : null}
      <h2>{page.dictionary.related}</h2>
      {related.length === 0 ? (
        <p>{page.dictionary.emptyRecords}</p>
      ) : (
        <ul>
          {related.map((item) => (
            <li key={item.id}>
              <Link href={localizePath(page.locale, `/projects/${item.slug}`)}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
