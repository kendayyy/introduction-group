import {
  rawSiteSchema,
  statisticSchema,
  type ContentImage,
  type RawSite,
  type SeoFields,
  type Statistic,
} from "@/content/schema";

export type Company = {
  id: string;
  name: string;
  description: string;
  logo: ContentImage;
  seo: SeoFields;
};

export type Sector = {
  id: string;
  slug: string;
  name: string;
  excerpt: string;
  body: string;
  image: ContentImage;
  capabilities: string[];
  companyIds: string[];
  projectIds: string[];
  statistics: Statistic[];
  seo: SeoFields;
};

export type Subsidiary = {
  id: string;
  slug: string;
  name: string;
  legalName: string;
  excerpt: string;
  body: string;
  sectorId: string;
  relationshipNote: string;
  locations: string[];
  email: string;
  phone: string;
  image: ContentImage;
  projectIds: string[];
  seo: SeoFields;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  sectorId: string;
  companyIds: string[];
  location: string;
  year: string;
  projectStatus: "placeholder" | "announced" | "in-progress" | "complete";
  featured: boolean;
  image: ContentImage;
  gallery: ContentImage[];
  statistics: Statistic[];
  relatedIds: string[];
  seo: SeoFields;
};

export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  dateLabel: string;
  author: string;
  image: ContentImage;
  relatedIds: string[];
  seo: SeoFields;
};

export type Leader = {
  id: string;
  name: string;
  role: string;
  portrait: ContentImage;
  biography: string;
  expertise: string[];
  order: number;
  companyIds: string[];
};

export type Career = {
  id: string;
  slug: string;
  title: string;
  companyId: string;
  department: string;
  location: string;
  workType: string;
  level: string;
  description: string;
  requirements: string[];
  benefits: string[];
  applicationTarget: string;
  deadline: string;
  seo: SeoFields;
};

export type Partner = {
  id: string;
  name: string;
  logo: ContentImage;
  category: string;
  url: string | null;
  approvalStatus: "approved" | "pending";
  order: number;
};

export type TimelineEvent = {
  id: string;
  dateLabel: string;
  title: string;
  description: string;
  image: ContentImage;
  source: string;
  relatedIds: string[];
  order: number;
};

export type SustainabilityItem = {
  id: string;
  slug: string;
  pillar: string;
  body: string;
  goals: string[];
  statistics: Statistic[];
  report: { title: string; href: string };
  image: ContentImage;
  projectIds: string[];
  seo: SeoFields;
};

export type Office = {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
};

export type TextPage = {
  id: string;
  title: string;
  body: string;
  seo: SeoFields;
};

export type Faq = { id: string; question: string; answer: string };

export type SiteContent = {
  source: "local" | "sanity";
  company: Company;
  sectors: Sector[];
  subsidiaries: Subsidiary[];
  projects: Project[];
  news: NewsItem[];
  leadership: Leader[];
  careers: Career[];
  partners: Partner[];
  timeline: TimelineEvent[];
  sustainability: SustainabilityItem[];
  offices: Office[];
  pages: RawSite["pages"];
  faqs: Faq[];
};

type PublicDoc = { _id: string; status: "published" | "draft"; slug?: string };

export function isPublicDocument(document: PublicDoc) {
  return document.status === "published" && !document._id.startsWith("drafts.");
}

export function mapStatistics(values: unknown[]) {
  return values.flatMap((value) => {
    const parsed = statisticSchema.safeParse(value);
    return parsed.success ? [parsed.data] : [];
  });
}

function byOrder<T extends { order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

export function mapSite(
  input: unknown,
  options: { preview?: boolean; source?: SiteContent["source"] } = {},
): SiteContent | null {
  const parsed = rawSiteSchema.safeParse(input);
  if (!parsed.success) {
    return null;
  }

  const preview = options.preview ?? false;
  const keep = <T extends PublicDoc>(items: T[]) =>
    preview ? items : items.filter(isPublicDocument);

  const sectors = keep(parsed.data.sectors).map((item) => ({
    id: item._id,
    slug: item.slug,
    name: item.name,
    excerpt: item.excerpt,
    body: item.body,
    image: item.image,
    capabilities: item.capabilities,
    companyIds: item.companyIds,
    projectIds: item.projectIds,
    statistics: mapStatistics(item.statistics),
    seo: item.seo,
  }));

  const company = keep(parsed.data.company)[0];
  if (!company) {
    return null;
  }

  return {
    source: options.source ?? "local",
    company: {
      id: company._id,
      name: company.name,
      description: company.description,
      logo: company.logo,
      seo: company.seo,
    },
    sectors,
    subsidiaries: keep(parsed.data.subsidiaries).map((item) => ({
      id: item._id,
      slug: item.slug,
      name: item.name,
      legalName: item.legalName,
      excerpt: item.excerpt,
      body: item.body,
      sectorId: item.sectorId,
      relationshipNote: item.relationshipNote,
      locations: item.locations,
      email: item.email,
      phone: item.phone,
      image: item.image,
      projectIds: item.projectIds,
      seo: item.seo,
    })),
    projects: keep(parsed.data.projects).map((item) => ({
      id: item._id,
      slug: item.slug,
      title: item.title,
      summary: item.summary,
      body: item.body,
      sectorId: item.sectorId,
      companyIds: item.companyIds,
      location: item.location,
      year: item.year,
      projectStatus: item.projectStatus,
      featured: item.featured,
      image: item.image,
      gallery: item.gallery,
      statistics: mapStatistics(item.statistics),
      relatedIds: item.relatedIds,
      seo: item.seo,
    })),
    news: keep(parsed.data.news).map((item) => ({
      id: item._id,
      slug: item.slug,
      title: item.title,
      summary: item.summary,
      body: item.body,
      category: item.category,
      dateLabel: item.dateLabel,
      author: item.author,
      image: item.image,
      relatedIds: item.relatedIds,
      seo: item.seo,
    })),
    leadership: byOrder(
      keep(parsed.data.leadership).map((item) => ({
        id: item._id,
        name: item.name,
        role: item.role,
        portrait: item.portrait,
        biography: item.biography,
        expertise: item.expertise,
        order: item.order,
        companyIds: item.companyIds,
      })),
    ),
    careers: keep(parsed.data.careers).map((item) => ({
      id: item._id,
      slug: item.slug,
      title: item.title,
      companyId: item.companyId,
      department: item.department,
      location: item.location,
      workType: item.workType,
      level: item.level,
      description: item.description,
      requirements: item.requirements,
      benefits: item.benefits,
      applicationTarget: item.applicationTarget,
      deadline: item.deadline,
      seo: item.seo,
    })),
    partners: byOrder(
      keep(parsed.data.partners).map((item) => ({
        id: item._id,
        name: item.name,
        logo: item.logo,
        category: item.category,
        url: item.url,
        approvalStatus: item.approvalStatus,
        order: item.order,
      })),
    ),
    timeline: byOrder(
      keep(parsed.data.timeline).map((item) => ({
        id: item._id,
        dateLabel: item.dateLabel,
        title: item.title,
        description: item.description,
        image: item.image,
        source: item.source,
        relatedIds: item.relatedIds,
        order: item.order,
      })),
    ),
    sustainability: keep(parsed.data.sustainability).map((item) => ({
      id: item._id,
      slug: item.slug,
      pillar: item.pillar,
      body: item.body,
      goals: item.goals,
      statistics: mapStatistics(item.statistics),
      report: item.report,
      image: item.image,
      projectIds: item.projectIds,
      seo: item.seo,
    })),
    offices: parsed.data.offices.map((item) => ({
      id: item._id,
      name: item.name,
      address: item.address,
      email: item.email,
      phone: item.phone,
    })),
    pages: parsed.data.pages,
    faqs: parsed.data.faqs,
  };
}
