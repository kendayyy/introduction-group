"use client";

import { useMemo, useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import { Link } from "@/components/ui/link";
import type { Sector, Subsidiary } from "@/content/map";
import type { Dictionary } from "@/i18n/dictionary";
import { localizePath, type Locale } from "@/i18n/locales";

export function EcosystemPanel({
  sectors,
  subsidiaries,
  dictionary,
  locale,
}: {
  sectors: Sector[];
  subsidiaries: Subsidiary[];
  dictionary: Dictionary;
  locale: Locale;
}) {
  const [sectorId, setSectorId] = useState("all");
  const [activeId, setActiveId] = useState(subsidiaries[0]?.id ?? "");
  const filtered = useMemo(
    () =>
      sectorId === "all"
        ? subsidiaries
        : subsidiaries.filter((item) => item.sectorId === sectorId),
    [sectorId, subsidiaries],
  );
  const active = filtered.find((item) => item.id === activeId) ?? filtered[0];

  if (subsidiaries.length === 0) {
    return <p>{dictionary.emptyRecords}</p>;
  }

  const filters = (
    <div
      role="group"
      aria-label={dictionary.filterSectors}
      className="flex flex-wrap gap-2"
    >
      <FilterButton
        pressed={sectorId === "all"}
        label={dictionary.all}
        onClick={() => setSectorId("all")}
      />
      {sectors.map((sector) => (
        <FilterButton
          key={sector.id}
          pressed={sectorId === sector.id}
          label={sector.name}
          onClick={() => setSectorId(sector.id)}
        />
      ))}
    </div>
  );

  return (
    <div className="grid gap-6">
      {filters}
      <div className="hidden xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] xl:gap-6">
        <ul className="grid gap-2">
          {filtered.map((company) => (
            <li key={company.id}>
              <button
                type="button"
                className="border-border aria-pressed:bg-ink min-h-11 w-full border px-4 text-left aria-pressed:text-white"
                aria-pressed={active?.id === company.id}
                onClick={() => setActiveId(company.id)}
              >
                {company.name}
              </button>
            </li>
          ))}
        </ul>
        {active ? (
          <CompanyDetail
            company={active}
            locale={locale}
            dictionary={dictionary}
          />
        ) : null}
      </div>
      <div className="hidden md:grid md:grid-cols-2 md:gap-4 xl:hidden">
        {filtered.map((company) => (
          <CompanyDetail
            key={company.id}
            company={company}
            locale={locale}
            dictionary={dictionary}
          />
        ))}
      </div>
      <div className="md:hidden">
        <Accordion
          emptyLabel={dictionary.emptyRecords}
          items={filtered.map((company) => ({
            id: company.id,
            title: company.name,
            content: (
              <div className="grid gap-3">
                <p>{company.excerpt}</p>
                <Link href={localizePath(locale, `/ecosystem/${company.slug}`)}>
                  {dictionary.overview}
                </Link>
              </div>
            ),
          }))}
        />
      </div>
    </div>
  );
}

function FilterButton({
  pressed,
  label,
  onClick,
}: {
  pressed: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className="border-border aria-pressed:bg-ink min-h-11 border px-4 aria-pressed:text-white"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function CompanyDetail({
  company,
  locale,
  dictionary,
}: {
  company: Subsidiary;
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <article className="card grid gap-3 p-4">
      <h3>{company.name}</h3>
      <p className="text-muted">{company.excerpt}</p>
      <p>{company.relationshipNote}</p>
      <Link href={localizePath(locale, `/ecosystem/${company.slug}`)}>
        {dictionary.overview}
      </Link>
    </article>
  );
}
