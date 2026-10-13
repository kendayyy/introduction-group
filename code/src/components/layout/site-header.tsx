"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/components/ui/link";
import { Modal } from "@/components/ui/modal";
import type { NavGroup, NavLink } from "@/components/layout/navigation";
import type { Dictionary } from "@/i18n/dictionary";
import { locales, switchLocalePath, type Locale } from "@/i18n/locales";
import type { ContentImage } from "@/content/schema";
import Image from "next/image";

export function SiteHeader({
  dictionary,
  groups,
  links,
  home,
  locale,
  investorsHref,
  companyName,
  logo,
}: {
  dictionary: Dictionary;
  groups: NavGroup[];
  links: NavLink[];
  home: string;
  locale: Locale;
  investorsHref?: string;
  companyName: string;
  logo?: ContentImage;
}) {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    if (!openGroup) {
      return;
    }

    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }
      setOpenGroup(null);
      document.getElementById(`${openGroup}-opener`)?.focus();
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openGroup]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const allLinks = investorsHref
    ? [...links, { href: investorsHref, label: dictionary.investors }]
    : links;

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        {dictionary.skip}
      </a>
      <div className="container-site flex min-h-18 min-w-0 flex-wrap items-center justify-between gap-3 py-2">
        <Link
          href={home}
          variant="nav"
          className="flex items-center gap-2 px-0 font-semibold"
        >
          {logo ? (
            <Image
              src={logo.src}
              alt=""
              width={120}
              height={66}
              unoptimized={
                logo.src.endsWith(".svg") || logo.src.endsWith(".jpg")
              }
              className="h-8 w-auto"
            />
          ) : null}
          {companyName}
        </Link>
        <nav
          aria-label={dictionary.mainNav}
          className="hidden items-center xl:flex"
        >
          {groups.map((group) => (
            <div key={group.id} className="relative">
              <Link
                href={group.href}
                variant="nav"
                aria-current={pathname === group.href ? "page" : undefined}
              >
                {group.label}
              </Link>
              <button
                type="button"
                id={`${group.id}-opener`}
                className="min-h-11 px-2 text-sm"
                aria-expanded={openGroup === group.id}
                aria-controls={`${group.id}-menu`}
                onClick={() =>
                  setOpenGroup((current) =>
                    current === group.id ? null : group.id,
                  )
                }
              >
                <span className="sr-only">
                  {dictionary.openSectionMenu} {group.label}
                </span>
                <span aria-hidden="true">▾</span>
              </button>
              {openGroup === group.id ? (
                <div
                  id={`${group.id}-menu`}
                  className="border-border bg-background absolute top-full left-0 z-40 min-w-72 border p-4 shadow-none"
                >
                  <ul className="grid gap-1">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} variant="nav">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ))}
          {allLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              variant="nav"
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <nav aria-label={dictionary.language} className="flex">
            {locales.map((item) => (
              <Link
                key={item}
                href={switchLocalePath(pathname, item)}
                variant="nav"
                hrefLang={item}
                lang={item}
                aria-current={item === locale ? "true" : undefined}
              >
                {item.toUpperCase()}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="border-border inline-flex min-h-11 items-center border px-3 xl:hidden"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            {dictionary.openMenu}
          </button>
        </div>
      </div>
      {mobileOpen ? (
        <Modal
          title={dictionary.mainNav}
          closeLabel={dictionary.closeMenu}
          onClose={() => setMobileOpen(false)}
        >
          <nav className="grid gap-4">
            {groups.map((group) => (
              <div key={group.id}>
                <h3>{group.label}</h3>
                <ul className="mt-2 grid gap-1">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} variant="nav">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <ul className="grid gap-1">
              {allLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} variant="nav">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Modal>
      ) : null}
    </header>
  );
}
