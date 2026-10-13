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
    path: "/news",
    seo: { ...seoDefaults, title: page.dictionary.news },
  });
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  return (
    <Container className="section-space grid gap-8">
      <Breadcrumbs
        items={[{ label: page.dictionary.news, path: "/news" }]}
        dictionary={page.dictionary}
        locale={page.locale}
      />
      <h1>{page.dictionary.news}</h1>
      <Link href={localizePath(page.locale, "/news/press")}>
        {page.dictionary.press}
      </Link>
      {page.content.news.length === 0 ? (
        <p>{page.dictionary.emptyRecords}</p>
      ) : (
        <ul className="grid gap-4">
          {page.content.news.map((item) => (
            <li key={item.id} className="card grid gap-2 p-4">
              <p className="text-teal text-sm">
                {item.category} · {item.dateLabel}
              </p>
              <h2 className="text-xl">
                <Link href={localizePath(page.locale, `/news/${item.slug}`)}>
                  {item.title}
                </Link>
              </h2>
              <p>{item.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
