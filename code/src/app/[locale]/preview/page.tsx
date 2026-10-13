import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { loadSiteContent } from "@/content/repository";
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
    path: "/preview",
    seo: { ...seoDefaults, indexable: false },
    noIndex: true,
  });
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await readPublishedPage(locale);
  const draft = await draftMode();
  if (!draft.isEnabled) {
    notFound();
  }

  const loaded = await loadSiteContent(true, page.locale);
  if (loaded.status !== "ready") {
    return (
      <Container className="section-space">
        <p>{page.dictionary.unavailable}</p>
      </Container>
    );
  }

  return (
    <Container className="section-space grid gap-4">
      <p role="status">{page.dictionary.previewBanner}</p>
      <h1>{loaded.content.company.name}</h1>
    </Container>
  );
}
