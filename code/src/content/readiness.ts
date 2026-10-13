const productionMarkers = [
  "[PLACEHOLDER]",
  "DEMO_ONLY",
  "LEGAL_VERIFY_",
  "web2go.example",
  "@web2go.example",
];

function walkMarkers(
  value: unknown,
  path: string,
  match: (text: string) => boolean,
): string[] {
  if (typeof value === "string") {
    return match(value) ? [path] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      walkMarkers(item, `${path}[${index}]`, match),
    );
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      walkMarkers(item, `${path}.${key}`, match),
    );
  }

  return [];
}

export function findPlaceholders(value: unknown, path = "$"): string[] {
  return walkMarkers(value, path, (text) => text.includes("[PLACEHOLDER]"));
}

export function productionContentBlockers(content: unknown) {
  return walkMarkers(content, "$", (text) =>
    productionMarkers.some((marker) => text.includes(marker)),
  );
}
