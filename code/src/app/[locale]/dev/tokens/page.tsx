import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { tokens } from "@/design/tokens";
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
    path: "/dev/tokens",
    seo: {
      ...seoDefaults,
      title: page.dictionary.tokenPreview,
      indexable: false,
    },
    noIndex: true,
  });
}

export default async function TokenPreviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }
  const page = await readPublishedPage((await params).locale);
  return (
    <Container className="section-space grid gap-8">
      <h1>{page.dictionary.tokenPreview}</h1>
      <div className="type-display">{page.dictionary.tokenPreview}</div>
      <p className="prose-measure">
        Body copy uses fixed sizes, zero letter spacing, and a 760 px measure.
      </p>
      <p className="max-w-full wrap-anywhere">{page.dictionary.longWord}</p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Object.entries(tokens.color).map(([name, value]) => (
          <div key={name} className="border-border border">
            <div className="h-16" style={{ background: value }} />
            <p className="p-2 text-sm">
              {name} {value}
            </p>
          </div>
        ))}
      </div>
      <div className="grid gap-3" style={{ gap: "var(--space-gutter)" }}>
        <div
          className="bg-surface h-8"
          style={{ width: "var(--space-section)" }}
        />
        <Button type="button">Focus</Button>
        <Link href="#main">{page.dictionary.focusExample}</Link>
      </div>
    </Container>
  );
}
