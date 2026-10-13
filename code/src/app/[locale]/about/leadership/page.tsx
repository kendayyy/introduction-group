import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { readPublishedPage } from "@/lib/page-data";
import { pageMetadata } from "@/seo/metadata";
import { seoDefaults } from "@/content/media";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  return pageMetadata({
    locale: page.locale,
    path: "/about/leadership",
    seo: { ...seoDefaults, title: page.dictionary.leadership },
  });
}

export default async function LeadershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  return (
    <Container className="section-space grid gap-8">
      <Breadcrumbs
        items={[
          { label: page.dictionary.about, path: "/about" },
          { label: page.dictionary.leadership, path: "/about/leadership" },
        ]}
        dictionary={page.dictionary}
        locale={page.locale}
      />
      <h1>{page.dictionary.leadership}</h1>
      {page.content.leadership.length === 0 ? (
        <p>{page.dictionary.emptyRecords}</p>
      ) : (
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {page.content.leadership.map((leader) => (
            <li key={leader.id} className="card grid gap-3 p-4">
              <ResponsiveImage image={leader.portrait} sizes="320px" />
              <h2 className="text-xl">{leader.name}</h2>
              <p>{leader.role}</p>
              <p className="text-muted">{leader.biography}</p>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
