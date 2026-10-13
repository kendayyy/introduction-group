import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { shouldLoadAnalytics } from "@/analytics/consent";
import { mapSite, mapStatistics } from "@/content/map";
import { localRawSites } from "@/content/locales";
import { localRawSite } from "@/content/mock";
import { productionContentBlockers } from "@/content/readiness";
import { contrastRatio, tokens } from "@/design/tokens";
import { processContact } from "@/forms/contact";
import { switchLocalePath } from "@/i18n/locales";
import { searchContent } from "@/search/search";
import { parseRevalidateTags } from "@/sanity/revalidate";
import { buildSitemap, publicRoutes } from "@/seo/routes";
import { articleSchema, jobPostingSchema } from "@/seo/structured-data";

describe("tokens", () => {
  it("matches the spec palette and readable text pairs", () => {
    expect(tokens.color.ink).toBe("#14212B");
    expect(tokens.color.teal).toBe("#1C6E7D");
    expect(tokens.containerMaxPx).toBe(1280);
    expect(tokens.mobileHeroMaxPx).toBe(32);
    expect(tokens.sectionPx.mobile).toBeGreaterThanOrEqual(64);
    expect(tokens.sectionPx.desktop).toBeLessThanOrEqual(160);
    expect(
      contrastRatio(tokens.color.text, tokens.color.background),
    ).toBeGreaterThan(4.5);
    expect(
      contrastRatio(tokens.color.muted, tokens.color.background),
    ).toBeGreaterThan(4.5);
    expect(contrastRatio("#FFFFFF", tokens.color.teal)).toBeGreaterThan(4.5);
    expect(
      contrastRatio(tokens.color.copper, tokens.color.ink),
    ).toBeGreaterThan(4.5);
    expect(
      contrastRatio(tokens.color.copper, tokens.color.background),
    ).toBeLessThan(4.5);
    const css = readFileSync("src/app/globals.css", "utf8").toLowerCase();
    expect(css).toContain("#14212b");
    expect(css).toContain("prefers-reduced-motion");
  });
});

describe("content boundary", () => {
  const content = mapSite(localRawSite);

  it("rejects statistics that omit value, unit, period, or source", () => {
    expect(mapStatistics([{ value: "10", unit: "people" }])).toEqual([]);
    expect(
      mapStatistics([
        {
          value: "10",
          unit: "people",
          period: "2020-2024",
          source: "Annual report",
        },
      ]),
    ).toHaveLength(1);
    expect(
      mapStatistics([
        {
          value: "[PLACEHOLDER]",
          unit: "people",
          period: "2020",
          source: "Report",
        },
      ]),
    ).toEqual([]);
  });

  it("hides draft documents from the public view model", () => {
    const raw = structuredClone(localRawSite);
    raw.sectors.push({
      ...raw.sectors[0],
      _id: "drafts.sector-secret",
      slug: "secret-sector",
      status: "draft",
      name: "Draft only",
    });
    const published = mapSite(raw, { preview: false });
    const preview = mapSite(raw, { preview: true });
    expect(
      published?.sectors.some((item) => item.slug === "secret-sector"),
    ).toBe(false);
    expect(preview?.sectors.some((item) => item.slug === "secret-sector")).toBe(
      true,
    );
  });

  it("keeps approved partners separate from pending logos", () => {
    expect(
      content?.partners.filter((item) => item.approvalStatus === "approved"),
    ).toHaveLength(2);
    expect(
      content?.partners.filter((item) => item.approvalStatus === "pending"),
    ).toHaveLength(2);
  });

  it("blocks production while demo or verification tokens remain", () => {
    expect(productionContentBlockers(content)).toEqual([]);
    expect(productionContentBlockers(mapSite(localRawSites.en)!)).toEqual([]);
    expect(content?.pages.privacy.body).not.toMatch(
      /DEMO_ONLY|LEGAL_VERIFY_|\[PLACEHOLDER\]/,
    );
    expect(productionContentBlockers({ name: "[PLACEHOLDER]" })).toEqual([
      "$.name",
    ]);
    expect(productionContentBlockers({ name: "DEMO_ONLY" })).toEqual([
      "$.name",
    ]);
  });
});

describe("search and locales", () => {
  const content = mapSite(localRawSite)!;

  it("covers empty, miss, hit, and error states", () => {
    expect(searchContent(content, "vi", " ").status).toBe("empty");
    expect(searchContent(content, "vi", "zzzz-not-present").status).toBe(
      "none",
    );
    expect(searchContent(content, "vi", "Web2Go").status).toBe("results");
    expect(searchContent(content, "vi", "x".repeat(121)).status).toBe("error");
  });

  it("switches locale without dropping the route", () => {
    const next = switchLocalePath("/vi/sectors/nen-tang-so", "en");
    expect(next).toBe("/en/sectors/nen-tang-so");
    expect(switchLocalePath(next, "vi")).toBe("/vi/sectors/nen-tang-so");
  });

  it("loads distinct Vietnamese and English content fixtures", () => {
    expect(localRawSites.vi.pages.about.body).toContain("Web2Go là");
    expect(localRawSites.en.pages.about.body).toContain("Web2Go is");
    expect(localRawSites.en.sectors[0].name).toBe("Digital platforms");
  });
});

describe("seo", () => {
  const content = mapSite(localRawSite)!;

  it("omits draft, preview, and query urls from the sitemap", () => {
    const urls = buildSitemap(content, "https://example.com", {
      investors: false,
    }).map((item) => item.url);
    expect(urls.some((url) => url.includes("/preview"))).toBe(false);
    expect(urls.some((url) => url.includes("?"))).toBe(false);
    expect(urls.some((url) => url.includes("/investors"))).toBe(false);
    expect(urls).toContain("https://example.com/vi/sectors/nen-tang-so");
    expect(
      publicRoutes(content, { investors: true }).some(
        (route) => route.path === "/vi/investors",
      ),
    ).toBe(true);
  });

  it("emits schema for complete records and omits placeholder records", () => {
    expect(articleSchema(content.news[0], "vi")).not.toBeNull();
    expect(
      jobPostingSchema(content.careers[0], "vi", content.company.name),
    ).not.toBeNull();
    expect(
      articleSchema(
        { ...content.news[0], summary: "[PLACEHOLDER]" },
        "vi",
      ),
    ).toBeNull();
    expect(
      jobPostingSchema(
        { ...content.careers[0], description: "DEMO_ONLY" },
        "vi",
        content.company.name,
      ),
    ).toBeNull();
  });
});

describe("contact protection", () => {
  const valid = {
    name: "A",
    email: "a@example.com",
    organization: "B",
    message: "C",
    topic: "general",
  };

  it("rejects spam and missing protection", async () => {
    const fetcher = vi.fn();
    expect(
      (
        await processContact(
          { ...valid, companyWebsite: "https://spam.test" },
          { secret: "secret", fetcher },
        )
      ).status,
    ).toBe("rejected");
    expect((await processContact(valid, { secret: undefined })).status).toBe(
      "unavailable",
    );
    expect(
      (await processContact(valid, { secret: "secret", fetcher })).status,
    ).toBe("rejected");
    expect(fetcher).not.toHaveBeenCalled();
  });
});

describe("analytics", () => {
  it("loads a provider only after consent and a configuration id", () => {
    expect(shouldLoadAnalytics("accepted", { provider: "ga4" })).toBe(false);
    expect(
      shouldLoadAnalytics("accepted", { provider: "ga4", ga4Id: "G-TEST" }),
    ).toBe(true);
    expect(
      shouldLoadAnalytics("rejected", { provider: "ga4", ga4Id: "G-TEST" }),
    ).toBe(false);
  });
});

describe("revalidation", () => {
  it("accepts only bounded tags", () => {
    expect(parseRevalidateTags({ tags: ["news"] })).toEqual(["news"]);
    expect(parseRevalidateTags({ tags: [""] })).toBeNull();
    expect(parseRevalidateTags({})).toBeNull();
  });
});
