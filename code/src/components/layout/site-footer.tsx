import { Link } from "@/components/ui/link";
import type { NavGroup, NavLink } from "@/components/layout/navigation";
import type { Dictionary } from "@/i18n/dictionary";
import { localizePath, type Locale } from "@/i18n/locales";

export function SiteFooter({
  dictionary,
  groups,
  links,
  locale,
  companyName,
}: {
  dictionary: Dictionary;
  groups: NavGroup[];
  links: NavLink[];
  locale: Locale;
  companyName: string;
}) {
  const legal = [
    { href: localizePath(locale, "/privacy"), label: dictionary.privacy },
    { href: localizePath(locale, "/terms"), label: dictionary.terms },
    { href: localizePath(locale, "/cookies"), label: dictionary.cookies },
    {
      href: localizePath(locale, "/careers/notice"),
      label: dictionary.recruitment,
    },
    { href: localizePath(locale, "/news/brand"), label: dictionary.brandUse },
    {
      href: localizePath(locale, "/legal/disclaimer"),
      label: dictionary.contactDisclaimer,
    },
    { href: localizePath(locale, "/sitemap"), label: dictionary.htmlSitemap },
  ];
  const columns = [
    ...groups.map((group) => ({
      id: group.id,
      label: group.label,
      items: group.items,
    })),
    { id: "more", label: dictionary.footerNav, items: links },
    { id: "legal", label: dictionary.legalNav, items: legal },
  ];

  return (
    <footer className="border-border bg-surface border-t">
      <div className="container-site section-space">
        <div className="grid gap-6 min-[481px]:hidden">
          {columns.map((column) => (
            <details
              key={column.id}
              className="border-border bg-background border p-4"
            >
              <summary className="min-h-11 cursor-pointer font-semibold">
                {column.label}
              </summary>
              <ul className="mt-3 grid gap-2">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
        <div className="hidden gap-8 min-[481px]:grid min-[481px]:grid-cols-2 lg:grid-cols-5">
          {columns.map((column) => (
            <nav key={column.id} aria-label={column.label}>
              <h2 className="mb-3 text-base">{column.label}</h2>
              <ul className="grid gap-2">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="text-muted mt-8 text-sm">
          © 2026 {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
