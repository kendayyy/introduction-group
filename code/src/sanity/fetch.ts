import { createClient } from "@sanity/client";

const siteQuery = `{
  "company": *[_type == "company"]{
    _id, _type, status, name, description, logo, seo
  },
  "sectors": *[_type == "businessSector"]{
    _id, _type, status, "slug": slug.current, name, excerpt, body, image,
    capabilities, companyIds, projectIds, statistics, seo
  },
  "subsidiaries": *[_type == "subsidiary"]{
    _id, _type, status, "slug": slug.current, name, legalName, excerpt, body,
    sectorId, relationshipNote, locations, email, phone, image, projectIds, seo
  },
  "projects": *[_type == "project"]{
    _id, _type, status, "slug": slug.current, title, summary, body, sectorId,
    companyIds, location, year, projectStatus, featured, image, gallery,
    statistics, relatedIds, seo
  },
  "news": *[_type == "news"]{
    _id, _type, status, "slug": slug.current, title, summary, body, category,
    dateLabel, author, image, relatedIds, seo
  },
  "leadership": *[_type == "leadership"],
  "careers": *[_type == "career"]{ ..., "slug": slug.current },
  "partners": *[_type == "partner"],
  "timeline": *[_type == "timeline"],
  "sustainability": *[_type == "sustainability"]{ ..., "slug": slug.current },
  "offices": *[_type == "office"],
  "pages": *[_type == "textPage"][0].pages,
  "faqs": *[_type == "faq"]
}`;

export async function fetchSanitySite(options: {
  projectId: string;
  dataset: string;
  token?: string;
  preview: boolean;
}) {
  const client = createClient({
    projectId: options.projectId,
    dataset: options.dataset,
    apiVersion: "2026-09-23",
    useCdn: !options.preview,
    token: options.token,
    perspective: options.preview ? "previewDrafts" : "published",
  });

  return client.fetch(siteQuery);
}
