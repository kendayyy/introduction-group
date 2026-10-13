import type { Sector, Subsidiary } from "@/content/map";
import type { Dictionary } from "@/i18n/dictionary";
import { localizePath, type Locale } from "@/i18n/locales";

export type NavLink = { href: string; label: string };

export type NavGroup = {
  id: string;
  label: string;
  href: string;
  items: NavLink[];
};

export function buildNavigation(
  content: { sectors: Sector[]; subsidiaries: Subsidiary[] },
  dictionary: Dictionary,
  locale: Locale,
) {
  const href = (path: string) => localizePath(locale, path);
  const groups: NavGroup[] = [
    {
      id: "about",
      label: dictionary.about,
      href: href("/about"),
      items: [
        { href: href("/about"), label: dictionary.overview },
        { href: href("/about/history"), label: dictionary.history },
        { href: href("/about/vision"), label: dictionary.vision },
        { href: href("/about/mission"), label: dictionary.mission },
        { href: href("/about/values"), label: dictionary.values },
        { href: href("/about/leadership"), label: dictionary.leadership },
        { href: href("/about/governance"), label: dictionary.governance },
      ],
    },
    {
      id: "sectors",
      label: dictionary.sectors,
      href: href("/sectors"),
      items: [
        { href: href("/sectors"), label: dictionary.overview },
        ...content.sectors.map((sector) => ({
          href: href(`/sectors/${sector.slug}`),
          label: sector.name,
        })),
      ],
    },
    {
      id: "ecosystem",
      label: dictionary.ecosystem,
      href: href("/ecosystem"),
      items: [
        { href: href("/ecosystem"), label: dictionary.overview },
        ...content.subsidiaries.map((company) => ({
          href: href(`/ecosystem/${company.slug}`),
          label: company.name,
        })),
      ],
    },
  ];

  const links: NavLink[] = [
    { href: href("/projects"), label: dictionary.projects },
    { href: href("/sustainability"), label: dictionary.sustainability },
    { href: href("/news"), label: dictionary.news },
    { href: href("/careers"), label: dictionary.careers },
    { href: href("/search"), label: dictionary.search },
    { href: href("/contact"), label: dictionary.contact },
  ];

  return { groups, links, home: href("/") };
}
