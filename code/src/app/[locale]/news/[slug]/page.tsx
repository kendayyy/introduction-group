import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/layout/json-ld";
import { Container } from "@/components/ui/container";
import { readPublishedPage } from "@/lib/page-data";
import { pageMetadata } from "@/seo/metadata";
import { articleSchema } from "@/seo/structured-data";
import { newsSlugs } from "@/content/slugs";

export function generateStaticParams() {
  return newsSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = await readPublishedPage(locale);
  const item = page.content.news.find((entry) => entry.slug === slug);
  if (!item) return {};
  return pageMetadata({
    locale: page.locale,
    path: `/news/${item.slug}`,
    seo: item.seo,
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = await readPublishedPage(locale);
  const item = page.content.news.find((entry) => entry.slug === slug);
  if (!item) notFound();
  return (
    <Container className="section-space grid gap-6">
      <JsonLd data={articleSchema(item, page.locale)} />
      <Breadcrumbs
        items={[
          { label: page.dictionary.news, path: "/news" },
          { label: item.title, path: `/news/${item.slug}` },
        ]}
        dictionary={page.dictionary}
        locale={page.locale}
      />
      <p className="text-teal text-sm">
        {item.category} · {item.dateLabel}
      </p>
      <h1>{item.title}</h1>
      <p>{item.author}</p>
      <p className="prose-measure">{item.body}</p>
    </Container>
  );
}
