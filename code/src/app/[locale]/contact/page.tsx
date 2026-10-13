import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { submitContact } from "@/app/actions/contact";
import { seoDefaults } from "@/content/media";
import { env } from "@/env";
import { readPublishedPage } from "@/lib/page-data";
import { pageMetadata } from "@/seo/metadata";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ topic?: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  const query = await searchParams;
  return pageMetadata({
    locale: page.locale,
    path: "/contact",
    seo: { ...seoDefaults, title: page.dictionary.contact },
    noIndex: Boolean(query.topic),
  });
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ topic?: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  const query = await searchParams;
  return (
    <Container className="section-space grid gap-8 lg:grid-cols-2">
      <div className="grid gap-6">
        <Breadcrumbs
          items={[{ label: page.dictionary.contact, path: "/contact" }]}
          dictionary={page.dictionary}
          locale={page.locale}
        />
        <h1>{page.dictionary.contact}</h1>
        <p>{page.dictionary.contactIntro}</p>
        <h2>{page.dictionary.offices}</h2>
        <ul className="grid gap-4">
          {page.content.offices.map((office) => (
            <li key={office.id} className="card grid gap-1 p-4">
              <h3>{office.name}</h3>
              <p>{office.address}</p>
              <p>{office.email}</p>
              <p>{office.phone}</p>
            </li>
          ))}
        </ul>
        <div
          className="card bg-surface min-h-48 p-4"
          role="img"
          aria-label={page.dictionary.mapPreview}
        >
          {page.content.offices[0]?.address}. {page.dictionary.mapNotice}
        </div>
      </div>
      <ContactForm
        dictionary={page.dictionary}
        siteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        topic={query.topic}
        action={submitContact}
      />
    </Container>
  );
}
