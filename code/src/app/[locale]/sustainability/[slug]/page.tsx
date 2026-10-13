import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { readPublishedPage } from "@/lib/page-data";
import { pageMetadata } from "@/seo/metadata";

export function generateStaticParams() {
  return ["environment", "social", "governance"].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = await readPublishedPage(locale);
  const item = page.content.sustainability.find((entry) => entry.slug === slug);
  if (!item) return {};
  return pageMetadata({
    locale: page.locale,
    path: `/sustainability/${item.slug}`,
    seo: item.seo,
  });
}

export default async function SustainabilityDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = await readPublishedPage(locale);
  const item = page.content.sustainability.find((entry) => entry.slug === slug);
  if (!item) notFound();
  return (
    <Container className="section-space grid gap-6">
      <Breadcrumbs
        items={[
          { label: page.dictionary.sustainability, path: "/sustainability" },
          { label: item.pillar, path: `/sustainability/${item.slug}` },
        ]}
        dictionary={page.dictionary}
        locale={page.locale}
      />
      <h1>{item.pillar}</h1>
      <p className="prose-measure">{item.body}</p>
      {item.statistics.length === 0 ? (
        <p>{page.dictionary.emptyMetrics}</p>
      ) : null}
      <ul>
        {item.goals.map((goal) => (
          <li key={goal}>{goal}</li>
        ))}
      </ul>
      <Link href={item.report.href}>{page.dictionary.download}</Link>
    </Container>
  );
}
