import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { seoDefaults } from "@/content/media";
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
    path: "/careers/faq",
    seo: { ...seoDefaults, title: page.dictionary.faq },
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  return (
    <Container className="section-space grid gap-8">
      <Breadcrumbs
        items={[
          { label: page.dictionary.careers, path: "/careers" },
          { label: page.dictionary.faq, path: "/careers/faq" },
        ]}
        dictionary={page.dictionary}
        locale={page.locale}
      />
      <h1>{page.dictionary.faq}</h1>
      <Accordion
        emptyLabel={page.dictionary.emptyRecords}
        items={page.content.faqs.map((item) => ({
          id: item.id,
          title: item.question,
          content: item.answer,
        }))}
      />
    </Container>
  );
}
