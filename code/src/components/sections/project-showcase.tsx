"use client";

import { Carousel } from "@/components/ui/carousel";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { Link } from "@/components/ui/link";
import type { Project } from "@/content/map";
import type { Dictionary } from "@/i18n/dictionary";
import { localizePath, type Locale } from "@/i18n/locales";

export function ProjectShowcase({
  projects,
  dictionary,
  locale,
}: {
  projects: Project[];
  dictionary: Dictionary;
  locale: Locale;
}) {
  const cards = projects.map((project) => (
    <ProjectCard
      key={project.id}
      project={project}
      dictionary={dictionary}
      locale={locale}
    />
  ));

  if (projects.length === 0) {
    return <p>{dictionary.emptyRecords}</p>;
  }

  return (
    <>
      <div className="hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-3">
        {cards}
      </div>
      <div className="min-w-0 md:hidden">
        <Carousel
          label={dictionary.featuredProjects}
          previousLabel={dictionary.previous}
          nextLabel={dictionary.next}
          emptyLabel={dictionary.emptyRecords}
        >
          {cards}
        </Carousel>
      </div>
    </>
  );
}

function ProjectCard({
  project,
  dictionary,
  locale,
}: {
  project: Project;
  dictionary: Dictionary;
  locale: Locale;
}) {
  return (
    <article className="card h-full">
      <Link
        href={localizePath(locale, `/projects/${project.slug}`)}
        className="media-link grid gap-4 p-4 no-underline"
      >
        <ResponsiveImage
          image={project.image}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <h3>{project.title}</h3>
        <p className="text-muted">{project.summary}</p>
        <p className="text-sm">
          {project.location} · {project.year} ·{" "}
          {dictionary.status[project.projectStatus]}
        </p>
      </Link>
    </article>
  );
}
