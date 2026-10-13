import { z } from "zod";

export const imageSchema = z.object({
  src: z.string().min(1),
  mobileSrc: z.string().min(1),
  alt: z.string(),
  width: z.number().positive(),
  height: z.number().positive(),
});

export const seoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  indexable: z.boolean(),
  ogImage: z.string().min(1),
});

export const statisticSchema = z.object({
  value: z.string().regex(/^\d+(?:[.,]\d+)?$/),
  unit: z.string().min(1),
  period: z.string().min(1),
  source: z.string().min(1),
});

const publicationStatus = z.enum(["published", "draft"]);

const baseDocument = {
  _id: z.string().min(1),
  status: publicationStatus,
  seo: seoSchema,
};

export const rawCompanySchema = z.object({
  ...baseDocument,
  _type: z.literal("company"),
  name: z.string().min(1),
  description: z.string().min(1),
  logo: imageSchema,
});

export const rawSectorSchema = z.object({
  ...baseDocument,
  _type: z.literal("businessSector"),
  slug: z.string().min(1),
  name: z.string().min(1),
  excerpt: z.string().min(1),
  body: z.string().min(1),
  image: imageSchema,
  capabilities: z.array(z.string()),
  companyIds: z.array(z.string()),
  projectIds: z.array(z.string()),
  statistics: z.array(z.unknown()),
});

export const rawSubsidiarySchema = z.object({
  ...baseDocument,
  _type: z.literal("subsidiary"),
  slug: z.string().min(1),
  name: z.string().min(1),
  legalName: z.string().min(1),
  excerpt: z.string().min(1),
  body: z.string().min(1),
  sectorId: z.string().min(1),
  relationshipNote: z.string().min(1),
  locations: z.array(z.string()),
  email: z.string().min(1),
  phone: z.string().min(1),
  image: imageSchema,
  projectIds: z.array(z.string()),
});

export const projectStatusSchema = z.enum([
  "placeholder",
  "announced",
  "in-progress",
  "complete",
]);

export const rawProjectSchema = z.object({
  ...baseDocument,
  _type: z.literal("project"),
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  body: z.string().min(1),
  sectorId: z.string().min(1),
  companyIds: z.array(z.string()),
  location: z.string().min(1),
  year: z.string().min(1),
  projectStatus: projectStatusSchema,
  featured: z.boolean(),
  image: imageSchema,
  gallery: z.array(imageSchema),
  statistics: z.array(z.unknown()),
  relatedIds: z.array(z.string()),
});

export const rawNewsSchema = z.object({
  ...baseDocument,
  _type: z.literal("news"),
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  body: z.string().min(1),
  category: z.string().min(1),
  dateLabel: z.string().min(1),
  author: z.string().min(1),
  image: imageSchema,
  relatedIds: z.array(z.string()),
});

export const rawLeaderSchema = z.object({
  _id: z.string().min(1),
  _type: z.literal("leadership"),
  status: publicationStatus,
  name: z.string().min(1),
  role: z.string().min(1),
  portrait: imageSchema,
  biography: z.string().min(1),
  expertise: z.array(z.string()),
  order: z.number().int(),
  companyIds: z.array(z.string()),
});

export const rawCareerSchema = z.object({
  ...baseDocument,
  _type: z.literal("career"),
  slug: z.string().min(1),
  title: z.string().min(1),
  companyId: z.string().min(1),
  department: z.string().min(1),
  location: z.string().min(1),
  workType: z.string().min(1),
  level: z.string().min(1),
  description: z.string().min(1),
  requirements: z.array(z.string()),
  benefits: z.array(z.string()),
  applicationTarget: z.string().min(1),
  deadline: z.string().min(1),
});

export const rawPartnerSchema = z.object({
  _id: z.string().min(1),
  _type: z.literal("partner"),
  status: publicationStatus,
  name: z.string().min(1),
  logo: imageSchema,
  category: z.string().min(1),
  url: z.string().url().nullable(),
  approvalStatus: z.enum(["approved", "pending"]),
  order: z.number().int(),
});

export const rawTimelineSchema = z.object({
  _id: z.string().min(1),
  _type: z.literal("timeline"),
  status: publicationStatus,
  dateLabel: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  image: imageSchema,
  source: z.string().min(1),
  relatedIds: z.array(z.string()),
  order: z.number().int(),
});

export const rawSustainabilitySchema = z.object({
  ...baseDocument,
  _type: z.literal("sustainability"),
  slug: z.string().min(1),
  pillar: z.string().min(1),
  body: z.string().min(1),
  goals: z.array(z.string()),
  statistics: z.array(z.unknown()),
  report: z.object({
    title: z.string().min(1),
    href: z.string().min(1),
  }),
  image: imageSchema,
  projectIds: z.array(z.string()),
});

export const rawOfficeSchema = z.object({
  _id: z.string().min(1),
  name: z.string().min(1),
  address: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1),
});

export const rawPageSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  seo: seoSchema,
});

export const rawSiteSchema = z.object({
  company: z.array(rawCompanySchema),
  sectors: z.array(rawSectorSchema),
  subsidiaries: z.array(rawSubsidiarySchema),
  projects: z.array(rawProjectSchema),
  news: z.array(rawNewsSchema),
  leadership: z.array(rawLeaderSchema),
  careers: z.array(rawCareerSchema),
  partners: z.array(rawPartnerSchema),
  timeline: z.array(rawTimelineSchema),
  sustainability: z.array(rawSustainabilitySchema),
  offices: z.array(rawOfficeSchema),
  pages: z.object({
    about: rawPageSchema,
    history: rawPageSchema,
    vision: rawPageSchema,
    mission: rawPageSchema,
    values: rawPageSchema,
    governance: rawPageSchema,
    process: rawPageSchema,
    privacy: rawPageSchema,
    terms: rawPageSchema,
    cookies: rawPageSchema,
    recruitment: rawPageSchema,
    brand: rawPageSchema,
    disclaimer: rawPageSchema,
    investors: rawPageSchema,
    press: rawPageSchema,
  }),
  faqs: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      answer: z.string(),
    }),
  ),
});

export type RawSite = z.infer<typeof rawSiteSchema>;
export type Statistic = z.infer<typeof statisticSchema>;
export type ContentImage = z.infer<typeof imageSchema>;
export type SeoFields = z.infer<typeof seoSchema>;
