import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/layout/json-ld";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";
import { breadcrumbSchema } from "@/seo/structured-data";

export function TextPage({
  title,
  body,
  crumbs,
  dictionary,
  locale,
}: {
  title: string;
  body: string;
  crumbs: Crumb[];
  dictionary: Dictionary;
  locale: Locale;
}) {
  return (
    <Container className="section-space">
      <Breadcrumbs items={crumbs} dictionary={dictionary} locale={locale} />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: dictionary.home, path: "/" },
            ...crumbs.map((crumb) => ({ name: crumb.label, path: crumb.path })),
          ],
          locale,
        )}
      />
      <article className="grid gap-5">
        <h1>{title}</h1>
        <p className="prose-measure">{body}</p>
      </article>
    </Container>
  );
}
