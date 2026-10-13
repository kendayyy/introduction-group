import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { seoDefaults } from "@/content/media";
import { readPublishedPage } from "@/lib/page-data";
import { localizePath } from "@/i18n/locales";
import { pageMetadata } from "@/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  return pageMetadata({
    locale: page.locale,
    path: "/sustainability",
    seo: { ...seoDefaults, title: page.dictionary.sustainability },
  });
}

export default async function SustainabilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  return (
    <Container className="section-space grid gap-8">
      <Breadcrumbs
        items={[
          { label: page.dictionary.sustainability, path: "/sustainability" },
        ]}
        dictionary={page.dictionary}
        locale={page.locale}
      />
      <h1>{page.dictionary.sustainability}</h1>
      <ul className="grid gap-5 md:grid-cols-3">
        {page.content.sustainability.map((item) => (
          <li key={item.id} className="card grid gap-3 p-4">
            <h2 className="text-xl">{item.pillar}</h2>
            <p>{item.body}</p>
            {item.statistics.length === 0 ? (
              <p>{page.dictionary.emptyMetrics}</p>
            ) : null}
            <Link
              href={localizePath(page.locale, `/sustainability/${item.slug}`)}
            >
              {page.dictionary.overview}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
