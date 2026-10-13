import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { seoDefaults } from "@/content/media";
import { readPublishedPage } from "@/lib/page-data";
import { localizePath } from "@/i18n/locales";
import { pageMetadata } from "@/seo/metadata";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ sector?: string; status?: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  const query = await searchParams;
  return pageMetadata({
    locale: page.locale,
    path: "/projects",
    seo: { ...seoDefaults, title: page.dictionary.projects },
    noIndex: Boolean(query.sector || query.status),
  });
}

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ sector?: string; status?: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  const query = await searchParams;
  const projects = page.content.projects.filter((project) => {
    const sectorMatches = query.sector
      ? project.sectorId === query.sector
      : true;
    const statusMatches = query.status
      ? project.projectStatus === query.status
      : true;
    return sectorMatches && statusMatches;
  });
  const base = localizePath(page.locale, "/projects");

  return (
    <Container className="section-space grid gap-8">
      <Breadcrumbs
        items={[{ label: page.dictionary.projects, path: "/projects" }]}
        dictionary={page.dictionary}
        locale={page.locale}
      />
      <h1>{page.dictionary.projects}</h1>
      <div
        role="group"
        aria-label={page.dictionary.filterSectors}
        className="flex flex-wrap gap-2"
      >
        <Link href={base} variant="nav">
          {page.dictionary.all}
        </Link>
        {page.content.sectors.map((sector) => (
          <Link
            key={sector.id}
            href={`${base}?sector=${sector.id}`}
            variant="nav"
          >
            {sector.name}
          </Link>
        ))}
      </div>
      {projects.length === 0 ? (
        <p>{page.dictionary.emptyRecords}</p>
      ) : (
        <ul className="grid gap-4">
          {projects.map((project) => (
            <li key={project.id} className="card grid gap-2 p-4">
              <h2 className="text-xl">
                <Link
                  href={localizePath(page.locale, `/projects/${project.slug}`)}
                >
                  {project.title}
                </Link>
              </h2>
              <p>{project.summary}</p>
              <p className="text-muted text-sm">
                {project.location} · {project.year}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
