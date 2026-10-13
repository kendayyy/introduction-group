import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { seoDefaults } from "@/content/media";
import { readPublishedPage } from "@/lib/page-data";
import { pageMetadata } from "@/seo/metadata";
import { searchContent } from "@/search/search";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  const query = await searchParams;
  return pageMetadata({
    locale: page.locale,
    path: "/search",
    seo: { ...seoDefaults, title: page.dictionary.search },
    noIndex: Boolean(query.q),
  });
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const page = await readPublishedPage((await params).locale);
  const query = await searchParams;
  const result = searchContent(page.content, page.locale, query.q ?? "");
  const message = {
    empty: page.dictionary.searchEmpty,
    none: page.dictionary.searchNone,
    error: page.dictionary.searchError,
    results: "",
  }[result.status];

  return (
    <Container className="section-space grid gap-6">
      <Breadcrumbs
        items={[{ label: page.dictionary.search, path: "/search" }]}
        dictionary={page.dictionary}
        locale={page.locale}
      />
      <h1>{page.dictionary.search}</h1>
      <form action="" className="flex flex-col gap-3 sm:flex-row">
        <label className="grid flex-1 gap-2">
          {page.dictionary.search}
          <input
            className="border-border min-h-11 border px-3"
            name="q"
            defaultValue={query.q ?? ""}
          />
        </label>
        <button
          className="bg-teal min-h-11 px-4 font-semibold text-white"
          type="submit"
        >
          {page.dictionary.search}
        </button>
      </form>
      <p>
        {result.status === "empty" ? page.dictionary.searchPrompt : message}
      </p>
      {result.status === "results" ? (
        <ul className="grid gap-4">
          {result.results.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.title}</Link>
              <p className="text-muted">{item.excerpt}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </Container>
  );
}
