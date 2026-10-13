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
    path: "/careers",
    seo: { ...seoDefaults, title: page.dictionary.careers },
  });
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  return (
    <Container className="section-space grid gap-8">
      <Breadcrumbs
        items={[{ label: page.dictionary.careers, path: "/careers" }]}
        dictionary={page.dictionary}
        locale={page.locale}
      />
      <h1>{page.dictionary.careers}</h1>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href={localizePath(page.locale, "/careers/process")}
          variant="secondary"
        >
          {page.dictionary.process}
        </Link>
        <Link
          href={localizePath(page.locale, "/careers/faq")}
          variant="secondary"
        >
          {page.dictionary.faq}
        </Link>
      </div>
      <ul className="grid gap-4">
        {page.content.careers.map((role) => (
          <li key={role.id} className="card grid gap-2 p-4">
            <h2 className="text-xl">
              <Link href={localizePath(page.locale, `/careers/${role.slug}`)}>
                {role.title}
              </Link>
            </h2>
            <p>
              {role.location} · {role.workType} · {role.level}
            </p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
