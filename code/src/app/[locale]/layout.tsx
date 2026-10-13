import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { CookieBanner } from "@/components/consent/cookie-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { buildNavigation } from "@/components/layout/navigation";
import { getPublishedContent } from "@/content/published";
import { env } from "@/env";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale, localizePath } from "@/i18n/locales";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
});

export function generateStaticParams() {
  return [{ locale: "vi" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const loaded = await getPublishedContent(locale);
  const content = loaded.status === "ready" ? loaded.content : null;
  const navigation = buildNavigation(
    content ?? { sectors: [], subsidiaries: [] },
    dictionary,
    locale,
  );

  return (
    <html lang={locale} className={inter.variable}>
      <body className="font-sans">
        <SiteHeader
          dictionary={dictionary}
          groups={navigation.groups}
          links={navigation.links}
          home={navigation.home}
          locale={locale}
          companyName={content?.company.name ?? "Web2Go"}
          logo={content?.company.logo}
          investorsHref={
            env.NEXT_PUBLIC_INVESTOR_RELATIONS_ENABLED
              ? localizePath(locale, "/investors")
              : undefined
          }
        />
        <main id="main">
          {content ? (
            children
          ) : (
            <p className="container-site section-space">
              {dictionary.unavailable}
            </p>
          )}
        </main>
        <SiteFooter
          dictionary={dictionary}
          groups={navigation.groups}
          links={navigation.links}
          locale={locale}
          companyName={content?.company.name ?? "Web2Go"}
        />
        <CookieBanner
          dictionary={dictionary}
          analytics={{
            provider: env.NEXT_PUBLIC_ANALYTICS_PROVIDER,
            ga4Id: env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
            matomoUrl: env.NEXT_PUBLIC_MATOMO_URL,
            matomoSiteId: env.NEXT_PUBLIC_MATOMO_SITE_ID,
          }}
        />
      </body>
    </html>
  );
}
