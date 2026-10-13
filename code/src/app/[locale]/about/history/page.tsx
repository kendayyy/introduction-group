import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Timeline } from "@/components/sections/timeline";
import { Container } from "@/components/ui/container";
import { readPublishedPage } from "@/lib/page-data";
import { pageMetadata } from "@/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  return pageMetadata({
    locale: page.locale,
    path: "/about/history",
    seo: page.content.pages.history.seo,
  });
}

export default async function HistoryPage({
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
          { label: page.dictionary.history, path: "/about/history" },
        ]}
        dictionary={page.dictionary}
        locale={page.locale}
      />
      <h1>{page.dictionary.history}</h1>
      <p className="prose-measure">{page.content.pages.history.body}</p>
      <Timeline events={page.content.timeline} dictionary={page.dictionary} />
    </Container>
  );
}
