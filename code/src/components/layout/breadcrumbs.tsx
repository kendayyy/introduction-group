import { Link } from "@/components/ui/link";
import type { Dictionary } from "@/i18n/dictionary";
import { localizePath, type Locale } from "@/i18n/locales";

export type Crumb = { label: string; path: string };

export function Breadcrumbs({
  items,
  dictionary,
  locale,
}: {
  items: Crumb[];
  dictionary: Dictionary;
  locale: Locale;
}) {
  const crumbs = [{ label: dictionary.home, path: "/" }, ...items];
  return (
    <nav aria-label={dictionary.breadcrumb} className="py-4">
      <ol className="text-muted flex flex-wrap gap-2 text-sm">
        {crumbs.map((item, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={item.path} className="flex gap-2">
              {last ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={localizePath(locale, item.path)}>{item.label}</Link>
              )}
              {last ? null : <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
