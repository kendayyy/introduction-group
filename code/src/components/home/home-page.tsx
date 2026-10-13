import type { ReactNode } from "react";
import Image from "next/image";
import { EcosystemPanel } from "@/components/sections/ecosystem-panel";
import { BrandVideo } from "@/components/sections/brand-video";
import { ProjectShowcase } from "@/components/sections/project-showcase";
import { SectorGrid } from "@/components/sections/sector-grid";
import { Timeline } from "@/components/sections/timeline";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { SectionHeader } from "@/components/ui/section-header";
import type { SiteContent } from "@/content/map";
import type { Statistic } from "@/content/schema";
import { landscapeImage } from "@/content/media";
import type { Dictionary } from "@/i18n/dictionary";
import { localizePath, type Locale } from "@/i18n/locales";

export function HomePage({
  content,
  dictionary,
  locale,
}: {
  content: SiteContent;
  dictionary: Dictionary;
  locale: Locale;
}) {
  const metrics = content.sectors.flatMap((sector) => sector.statistics);
  const approvedPartners = content.partners.filter(
    (partner) => partner.approvalStatus === "approved",
  );

  return (
    <>
      <section className="bg-ink text-white" aria-labelledby="home-hero">
        <Container className="grid min-w-0 items-center gap-8 py-10 lg:min-h-[calc(100svh-12rem)] lg:grid-cols-12 lg:py-16">
          <div className="grid min-w-0 gap-5 lg:col-span-6">
            <p className="text-copper text-sm">{content.company.name}</p>
            <h1 id="home-hero" className="max-w-[14ch] text-white">
              {dictionary.heroTitle}
            </h1>
            <p className="prose-measure text-white/90">
              {content.company.description}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={localizePath(locale, "/sectors")} variant="primary">
                {dictionary.sectors}
              </Link>
              <Link href={localizePath(locale, "/contact")} variant="inverse">
                {dictionary.contact}
              </Link>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-6">
            <ResponsiveImage
              image={{ ...landscapeImage, alt: "" }}
              priority
              sizes="(max-width: 1024px) 100vw, 640px"
              className="w-full"
            />
          </div>
        </Container>
      </section>

      <Section id="metrics" titleId="metrics-title" title={dictionary.metrics}>
        <MetricList statistics={metrics} dictionary={dictionary} />
      </Section>

      <Section
        id="about"
        titleId="about-title"
        title={dictionary.about}
        surface
      >
        <p className="prose-measure">{content.pages.about.body}</p>
        <Link href={localizePath(locale, "/about")}>{dictionary.overview}</Link>
      </Section>

      <Section id="sectors" titleId="sectors-title" title={dictionary.sectors}>
        <SectorGrid
          sectors={content.sectors}
          locale={locale}
          dictionary={dictionary}
        />
      </Section>

      <Section
        id="ecosystem"
        titleId="ecosystem-title"
        title={dictionary.ecosystem}
        surface
      >
        <EcosystemPanel
          sectors={content.sectors}
          subsidiaries={content.subsidiaries}
          dictionary={dictionary}
          locale={locale}
        />
      </Section>

      <section className="bg-ink text-white" aria-labelledby="vision-title">
        <Container className="section-space grid gap-8 lg:grid-cols-2">
          <div className="reveal grid gap-4">
            <h2 id="vision-title">{dictionary.vision}</h2>
            <p>{content.pages.vision.body}</p>
          </div>
          <div className="reveal grid gap-4">
            <h2>{dictionary.mission}</h2>
            <p>{content.pages.mission.body}</p>
          </div>
        </Container>
      </section>

      <Section
        id="projects"
        titleId="projects-title"
        title={dictionary.featuredProjects}
      >
        <ProjectShowcase
          projects={content.projects.filter((project) => project.featured)}
          dictionary={dictionary}
          locale={locale}
        />
      </Section>

      <Section
        id="timeline"
        titleId="timeline-title"
        title={dictionary.timeline}
        surface
      >
        <Timeline events={content.timeline} dictionary={dictionary} />
      </Section>

      <Section id="video" titleId="video-title" title={dictionary.playVideo}>
        <BrandVideo dictionary={dictionary} />
      </Section>

      <Section
        id="sustainability"
        titleId="sustainability-title"
        title={dictionary.sustainability}
        surface
      >
        <div className="grid gap-5 md:grid-cols-3">
          {content.sustainability.map((item) => (
            <article key={item.id} className="card grid gap-3 p-4">
              <h3>{item.pillar}</h3>
              <p className="text-muted">{item.body}</p>
              {item.statistics.length === 0 ? (
                <p>{dictionary.emptyMetrics}</p>
              ) : null}
              <Link href={localizePath(locale, `/sustainability/${item.slug}`)}>
                {dictionary.overview}
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="partners"
        titleId="partners-title"
        title={dictionary.partners}
      >
        {approvedPartners.length === 0 ? (
          <p>{dictionary.emptyRecords}</p>
        ) : (
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {approvedPartners.map((partner) => (
              <li
                key={partner.id}
                className="card grid min-h-28 min-w-0 place-items-center overflow-hidden p-4"
              >
                <Image
                  src={partner.logo.src}
                  alt={partner.logo.alt}
                  width={160}
                  height={80}
                  unoptimized
                  className="h-auto w-full max-w-40 object-contain"
                />
                <span className="sr-only">{dictionary.approvedPartner}</span>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section id="news" titleId="news-title" title={dictionary.news} surface>
        <RecordCards
          items={content.news.map((item) => ({
            id: item.id,
            href: localizePath(locale, `/news/${item.slug}`),
            title: item.title,
            meta: `${item.category} · ${item.dateLabel}`,
            text: item.summary,
          }))}
          empty={dictionary.emptyRecords}
        />
      </Section>

      <Section id="careers" titleId="careers-title" title={dictionary.careers}>
        <RecordCards
          items={content.careers.map((item) => ({
            id: item.id,
            href: localizePath(locale, `/careers/${item.slug}`),
            title: item.title,
            meta: `${item.location} · ${item.workType}`,
            text: item.description,
          }))}
          empty={dictionary.emptyRecords}
        />
        <Link
          href={localizePath(locale, "/careers")}
          variant="primary"
          className="mt-6 w-full sm:w-auto"
        >
          {dictionary.apply}
        </Link>
      </Section>

      <section className="bg-teal text-white" aria-labelledby="cta-title">
        <Container className="section-space grid gap-5">
          <h2 id="cta-title">{dictionary.finalCta}</h2>
          <p>{dictionary.contactCtaBody}</p>
          <Link
            href={localizePath(locale, "/contact")}
            variant="inverse"
            className="w-full sm:w-auto"
          >
            {dictionary.contact}
          </Link>
        </Container>
      </section>
    </>
  );
}

function Section({
  id,
  titleId,
  title,
  children,
  surface = false,
}: {
  id: string;
  titleId: string;
  title: string;
  children: ReactNode;
  surface?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={surface ? "bg-surface" : undefined}
    >
      <Container className="section-space grid gap-8">
        <div className="reveal">
          <SectionHeader id={titleId} title={title} />
        </div>
        {children}
      </Container>
    </section>
  );
}

function MetricList({
  statistics,
  dictionary,
}: {
  statistics: Statistic[];
  dictionary: Dictionary;
}) {
  if (statistics.length === 0) {
    return <p>{dictionary.emptyMetrics}</p>;
  }

  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {statistics.map((item) => (
        <li key={`${item.value}-${item.period}`} className="card p-5">
          <p className="text-ink text-3xl font-semibold">
            {item.value} {item.unit}
          </p>
          <p className="mt-3 text-sm">
            {dictionary.period}: {item.period}
          </p>
          <p className="text-muted text-sm">
            {dictionary.source}: {item.source}
          </p>
        </li>
      ))}
    </ul>
  );
}

function RecordCards({
  items,
  empty,
}: {
  items: Array<{
    id: string;
    href: string;
    title: string;
    meta: string;
    text: string;
  }>;
  empty: string;
}) {
  if (items.length === 0) {
    return <p>{empty}</p>;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article key={item.id} className="card grid gap-3 p-4">
          <p className="text-teal text-sm">{item.meta}</p>
          <h3>
            <Link href={item.href}>{item.title}</Link>
          </h3>
          <p className="text-muted">{item.text}</p>
        </article>
      ))}
    </div>
  );
}
