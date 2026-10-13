import { HomePage } from "@/components/home/home-page";
import { JsonLd } from "@/components/layout/json-ld";
import { readPublishedPage } from "@/lib/page-data";
import { pageMetadata } from "@/seo/metadata";
import { organizationSchema, websiteSchema } from "@/seo/structured-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await readPublishedPage(locale);
  return pageMetadata({
    locale: page.locale,
    path: "/",
    seo: page.content.company.seo,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await readPublishedPage(locale);
  return (
    <>
      <JsonLd data={organizationSchema(page.content)} />
      <JsonLd data={websiteSchema(page.content, page.locale)} />
      <HomePage
        content={page.content}
        dictionary={page.dictionary}
        locale={page.locale}
      />
    </>
  );
}
