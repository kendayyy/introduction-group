import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/layout/json-ld";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { readPublishedPage } from "@/lib/page-data";
import { localizePath } from "@/i18n/locales";
import { pageMetadata } from "@/seo/metadata";
import { jobPostingSchema } from "@/seo/structured-data";
import { careerSlugs } from "@/content/slugs";

export function generateStaticParams() {
  return careerSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = await readPublishedPage(locale);
  const role = page.content.careers.find((item) => item.slug === slug);
  if (!role) return {};
  return pageMetadata({
    locale: page.locale,
    path: `/careers/${role.slug}`,
    seo: role.seo,
  });
}

export default async function CareerPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = await readPublishedPage(locale);
  const role = page.content.careers.find((item) => item.slug === slug);
  if (!role) notFound();
  return (
    <Container className="section-space grid gap-6">
      <JsonLd
        data={jobPostingSchema(role, page.locale, page.content.company.name)}
      />
      <Breadcrumbs
        items={[
          { label: page.dictionary.careers, path: "/careers" },
          { label: role.title, path: `/careers/${role.slug}` },
        ]}
        dictionary={page.dictionary}
        locale={page.locale}
      />
      <h1>{role.title}</h1>
      <p>
        {role.location} · {role.workType} · {role.department}
      </p>
      <p className="prose-measure">{role.description}</p>
      <h2>{page.dictionary.requirements}</h2>
      <ul className="list-disc ps-5">
        {role.requirements.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h2>{page.dictionary.benefits}</h2>
      <ul className="list-disc ps-5">
        {role.benefits.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>
        {role.deadline} · {role.applicationTarget}
      </p>
      <Link
        href={localizePath(page.locale, "/contact?topic=career")}
        variant="primary"
      >
        {page.dictionary.apply}
      </Link>
    </Container>
  );
}
