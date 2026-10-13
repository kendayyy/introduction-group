export const locales = ["vi", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "vi";

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function localizePath(locale: Locale, path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") {
    return `/${locale}`;
  }
  return `/${locale}${normalized}`;
}

export function pathWithoutLocale(pathname: string) {
  const [, maybeLocale, ...rest] = pathname.split("/");
  if (maybeLocale && isLocale(maybeLocale)) {
    return `/${rest.join("/")}` || "/";
  }
  return pathname || "/";
}

export function switchLocalePath(pathname: string, nextLocale: Locale) {
  const [, maybeLocale, ...rest] = pathname.split("/");
  if (maybeLocale && isLocale(maybeLocale)) {
    return (
      `/${[nextLocale, ...rest].filter(Boolean).join("/")}` || `/${nextLocale}`
    );
  }
  return localizePath(nextLocale, pathname);
}

export function localeFromAcceptLanguage(header: string | null) {
  const codes = (header ?? "")
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase() ?? "")
    .filter(Boolean);

  for (const code of codes) {
    const match = locales.find(
      (locale) => code === locale || code.startsWith(`${locale}-`),
    );
    if (match) {
      return match;
    }
  }

  return defaultLocale;
}
