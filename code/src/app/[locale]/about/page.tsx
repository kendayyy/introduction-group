import { TextPage } from "@/components/templates/text-page";
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
    path: "/about",
    seo: page.content.pages.about.seo,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  return (
    <TextPage
      title={page.dictionary.about}
      body={page.content.pages.about.body}
      crumbs={[{ label: page.dictionary.about, path: "/about" }]}
      dictionary={page.dictionary}
      locale={page.locale}
    />
  );
}
