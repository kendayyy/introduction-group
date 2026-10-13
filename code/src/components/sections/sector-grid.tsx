import { ResponsiveImage } from "@/components/ui/responsive-image";
import { Grid } from "@/components/ui/grid";
import { Link } from "@/components/ui/link";
import type { Sector } from "@/content/map";
import type { Dictionary } from "@/i18n/dictionary";
import { localizePath, type Locale } from "@/i18n/locales";

export function SectorGrid({
  sectors,
  locale,
  dictionary,
}: {
  sectors: Sector[];
  locale: Locale;
  dictionary: Dictionary;
}) {
  if (sectors.length === 0) {
    return <p>{dictionary.emptyRecords}</p>;
  }

  return (
    <Grid variant="sectors">
      {sectors.map((sector) => (
        <article key={sector.id} className="card h-full">
          <Link
            href={localizePath(locale, `/sectors/${sector.slug}`)}
            className="media-link grid h-full gap-4 p-4 no-underline"
          >
            <ResponsiveImage
              image={sector.image}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <h3>{sector.name}</h3>
            <p className="text-muted">{sector.excerpt}</p>
          </Link>
        </article>
      ))}
    </Grid>
  );
}
