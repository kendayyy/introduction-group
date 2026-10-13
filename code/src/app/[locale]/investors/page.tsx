import { notFound } from "next/navigation";
import { TextPage } from "@/components/templates/text-page";
import { env } from "@/env";
import { readPublishedPage } from "@/lib/page-data";
import { pageMetadata } from "@/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (!env.NEXT_PUBLIC_INVESTOR_RELATIONS_ENABLED) {
    return {};
  }
  const page = await readPublishedPage((await params).locale);
  return pageMetadata({
    locale: page.locale,
    path: "/investors",
    seo: page.content.pages.investors.seo,
  });
}

export default async function InvestorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (!env.NEXT_PUBLIC_INVESTOR_RELATIONS_ENABLED) {
    notFound();
  }
  const page = await readPublishedPage((await params).locale);
  return (
    <TextPage
      title={page.dictionary.investors}
      body={page.content.pages.investors.body}
      crumbs={[{ label: page.dictionary.investors, path: "/investors" }]}
      dictionary={page.dictionary}
      locale={page.locale}
    />
  );
}
