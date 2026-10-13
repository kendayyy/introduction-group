# Corporate Website Implementation Spec

## Purpose

Build a modern corporate information platform for Web2Go. The site must communicate scale, history, vision, business sectors, subsidiaries, projects, leadership, sustainability, partners, news, careers, investor information when applicable, and contact details. It is not ecommerce and must not feel like a generic landing page.

This file is the compact implementation source of truth. The original Word document remains a reference for deeper rationale only.

## Web2Go Identity And Demo Content Pack

The supplied image is the Web2Go logo and may be used as the brand mark at `code/public/media/web2go-logo.jpg`. The image contains no product, legal, or implementation instructions.

The following content is a **fictional demo seed for local development and customer presentation only**. It is not an enterprise lookup, legal opinion, ownership statement, registered address, tax number, certification, financial disclosure, or evidence that Web2Go owns any domain or mailbox. The customer-facing demo must not render internal markers; `CONTENT_MODE=demo` and internal documentation identify the fixture. Production release remains blocked until the owner replaces fictional content with approved source material.

### Brand facts for the demo fixture

- Trade name: Web2Go
- Proposed legal name: Công ty Cổ phần Công nghệ Web2Go (DEMO_ONLY)
- Brand idea: web products, business systems, and digital operations connected through one practical technology group
- Demo founding year: 2018 (DEMO_ONLY; verify before publishing)
- Demo headquarters: Tầng 8, 123 Nguyễn Huệ, Quận 1, Thành phố Hồ Chí Minh (DEMO_ONLY; verify before publishing)
- Demo enterprise code: DEMO-0318882202 (DEMO_ONLY; never present as an official code)
- Demo phone: +84 28 3822 2000 (DEMO_ONLY; verify ownership before publishing)
- Demo contacts: hello@web2go.example, press@web2go.example, privacy@web2go.example, legal@web2go.example
- Members: Web2Go Studio, Web2Go Systems, Web2Go Cloud, Web2Go Labs (DEMO_ONLY; do not imply separate legal entities without records)
- Sectors: digital platforms, enterprise systems, digital operations
- Investor relations: disabled until a real board decision, approved disclosure policy, and responsible contact exist
- Demo website: `https://web2go.example`; production domain must be supplied and verified by the owner
- Logo file: `code/public/media/web2go-logo.jpg`

### Legal and policy pages for the demo fixture

Create the following pages with complete customer-facing sample copy. Keep the fictional/legal-review status in internal documentation, not visible interface labels, until approved:

- Privacy notice: Web2Go is the proposed data controller for contact, recruitment, and newsletter data; collect only stated fields; explain purpose, retention, access, deletion, and contact channels; do not claim a regulator registration or cross-border transfer mechanism that has not been verified.
- Terms of use: the website provides corporate information; content is supplied for general information; intellectual property, permitted use, service availability, third-party links, and governing law require counsel review; do not promise service levels or commercial terms.
- Cookie notice: list essential cookies first; analytics and marketing cookies remain off until consent; do not load GA4, Matomo, pixels, or chat tools before consent and configuration.
- Recruitment notice: explain application data, hiring purpose, retention window, access controls, and candidate rights; do not publish employee names, portraits, or testimonials without written permission.
- Media and brand use: the logo is supplied for this project; press or partner reuse requires Web2Go approval; do not imply endorsement by a partner.
- Contact disclaimer: form submissions are not automatically a contract, offer, complaint resolution, or investor disclosure.

### Legal verification tokens

Use these tokens when the real value is unavailable. They are release blockers, not copy to hide:

- `[LEGAL_VERIFY_LEGAL_NAME]`
- `[LEGAL_VERIFY_ENTERPRISE_CODE]`
- `[LEGAL_VERIFY_REGISTERED_ADDRESS]`
- `[LEGAL_VERIFY_EFFECTIVE_DATE]`
- `[LEGAL_VERIFY_DATA_CONTROLLER]`
- `[LEGAL_VERIFY_PRIVACY_CONTACT]`
- `[LEGAL_VERIFY_PRODUCTION_DOMAIN]`

The existing demo values above may be used only in the staging fixture and must be replaced or explicitly approved before production. Never invent revenue, headcount, certifications, subsidiaries, ownership, investor information, customer logos, project outcomes, or legal claims.

## T021/T022 Operating Contract

- T021 is complete for customer-demo review when the bilingual content pack renders on all content and legal routes, the logo loads, no internal marker appears in rendered HTML, and the content report identifies no blocker, source literal, or missing media.
- T021 is production-ready only after the owner supplies approved legal identity, contact, policy, source, image, and translation records and the verification-token scan is zero.
- T022 is blocked until production approval, a verified domain, DNS/certificate ownership, consent configuration, monitoring, rollback instructions, and the agreed browser matrix are recorded.
- A passing local build, clean TypeScript, or a clean demo content report does not prove that legal facts are true or that a public deployment is authorized.

## Project Location

- The complete application must be created inside `code/`.
- `code/` is the working directory for package installation, development, testing, builds, code generation, and deployment commands.
- Do not place application source, tests, assets, package manifests, lockfiles, or framework configuration at the workspace root.
- Only `.cursor/**` process files may be updated outside `code/` during implementation.

## Product Direction

- Recommended concept: Corporate Systems Premium.
- Brand feeling: credible, modern, structured, international, restrained, and built for long-term growth.
- Story order: identity and scale, business capabilities, ecosystem, evidence, responsibility, updates, careers, contact.
- Visual approach: editorial grid, authentic project imagery, clear data modules, restrained color, and subtle motion.
- Editorial baseline: the company name is Web2Go and the supplied logo is approved for the demo. Operating and legal details in the demo pack are fictional until verified. Additional facts must remain `[PLACEHOLDER]` or use a `LEGAL_VERIFY_*` token. Do not add revenue, headcount, certification, ownership, or legal-status claims beyond approved source material.

## Users And Outcomes

- Customers: understand capabilities and reach a relevant sector or project within 2 to 3 steps.
- Partners: verify scale, ecosystem, evidence, and the correct contact point.
- Investors: access governance, reports, disclosures, and IR contacts when the module is enabled.
- Candidates: understand the workplace and find relevant roles comfortably on mobile.
- Media: find current facts, news, approved logos, media assets, and press contacts.
- General visitors: understand the group and its major sectors within 30 to 60 seconds.

## Information Architecture

- Home
- About: overview, history, vision, mission, values, leadership, governance
- Business sectors: overview and one detail route per sector
- Ecosystem: overview and one detail route per subsidiary
- Projects: filterable listing and detail routes
- Sustainability: strategy, environment, social, governance, reports
- Investor relations: optional and feature-flagged
- News: categories, listing, detail, press resources
- Careers: culture, listing, role detail, process, FAQ
- Contact: offices, contact paths, map, form, legal information
- System: search, 404, privacy, terms, cookies, HTML sitemap

Header navigation exposes About, Sectors, Ecosystem, Projects, Sustainability, News, Careers, Search, Language, and Contact. Use mega menus only for About, Sectors, and Ecosystem. Breadcrumbs begin on child pages.

## Homepage Order

1. Header
2. Hero
3. Verified key metrics
4. About
5. Business sectors
6. Corporate ecosystem
7. Vision and mission
8. Featured projects
9. Development timeline
10. Brand video
11. Sustainability
12. Partners
13. News
14. Careers
15. Final CTA
16. Footer

The first release uses a cinematic static project image for the hero. Upgrade to video only when approved footage, poster, captions, transcript, and performance budget exist.

## Critical UX Decisions

- Business sectors use a large image card grid: 3 columns desktop, 2 tablet, 1 mobile.
- Sector names and short descriptions are always visible; essential content never depends on hover.
- Users should identify major sectors within 5 to 10 seconds.
- Ecosystem uses sector-to-subsidiary hierarchy with a detail panel on desktop, filtered grouped lists on tablet, and accordions on mobile.
- Projects use a featured grid on desktop and a nonautoplay snap carousel or vertical list on mobile.
- Timeline is horizontal on desktop and vertical on mobile.
- Partner logos use a static grid, not an infinite marquee.
- Video loads only after user intent and includes pause, captions, transcript, and Escape handling.

## Design System

- Primary Ink `#14212B`
- Secondary Teal `#1C6E7D`
- Accent Copper Gold `#B68A4A`, used sparingly
- Text `#1A1D1F`; muted text `#5F6B73`
- Background `#FFFFFF` and `#F5F6F7`; border `#D9D9D9`
- Font: Inter when licensed and self-hostable; otherwise Arial-compatible fallback
- Grid: 12 columns desktop, 8 tablet, 4 mobile
- Container: maximum 1280 px; readable prose maximum 760 px
- Gutters: 24 px desktop, 20 px tablet, 16 px mobile
- Section spacing: 120 to 160 px desktop, 88 to 112 px tablet, 64 to 80 px mobile
- Radius: 0 to 8 px; cards never exceed 8 px
- Typography must use fixed breakpoint values, not viewport-width scaling; letter spacing is zero.

## Responsive Breakpoints

- 1440 and above: 1280 px container, full editorial layouts
- 1200: reduced spacing, 3-column sectors
- 1024: mobile navigation and list-based ecosystem
- 768: 2-column sectors, vertical timeline, simpler hero
- 480: 1-column cards, snap projects, accordion footer
- 375: maximum 32 px hero heading, safe long-word wrapping, optional full-width CTAs

## Motion

- Framer Motion is the default library.
- Entrances use opacity and at most 12 px translation over 240 to 320 ms.
- Image hover may scale to at most 1.03 over roughly 450 ms.
- Counters run once; carousels and video never autoplay with sound.
- Prefer transform and opacity. Disable nonessential movement for reduced motion.

## Technical Architecture

- Project root: `code/`
- Next.js App Router, TypeScript, Tailwind CSS, CSS variables
- Sanity CMS with preview, roles, structured references, and publish workflow
- `next/image` plus CMS image CDN
- Framer Motion; GSAP only for an approved complex timeline
- Vercel hosting, edge delivery, static generation, ISR, tag-based revalidation
- GA4 or Matomo behind appropriate consent behavior
- Server Actions or route handlers for forms, server validation, Turnstile, and a CRM/email adapter
- Algolia only when content scale proves native server search insufficient
- Server Components by default; interactive client islands only when required

## CMS Collections

- Company: identity, descriptions, logo, imagery, addresses, contacts, sectors, projects, SEO, status
- BusinessSector: name, slug, excerpt, body, imagery, capabilities, companies, projects, sourced statistics, SEO
- Subsidiary: legal identity, branding, sector, relationship note, locations, contacts, projects, SEO
- Project: title, slug, summary, body, sector, companies, location, year, status, gallery, sourced statistics, related projects, SEO
- News: title, slug, summary, body, category, tags, date, author, imagery, related records, SEO, status
- Leadership: name, role, portrait, biography, expertise, order, related companies
- Career: role, company, department, location, work type, level, description, requirements, benefits, application target, deadline, status
- Partner: name, logo, category, URL, approval status, order
- Timeline: date, title, description, image, source, related records, order
- Sustainability: pillar, body, goals, sourced metrics, reports, imagery, related projects, SEO
- GlobalSettings: navigation, footer, contacts, locales, default SEO, legal links, analytics settings

Every statistic requires `value`, `unit`, `period`, and `source`.

## SEO Accessibility And Performance

- Per-page metadata, canonical, Open Graph, sitemap, robots, and locale-aware hreflang
- Organization, WebSite, BreadcrumbList, Article, and JobPosting structured data where valid
- WCAG 2.2 AA, semantic landmarks, one H1, correct heading order, keyboard operation, visible focus, accessible forms, reduced motion, captions and transcripts
- Lighthouse minimum 90 on key templates
- LCP at most 2.5 s, INP at most 200 ms, CLS at most 0.1 at p75
- Responsive images, declared dimensions, lazy loading outside the viewport, subset fonts, lazy interactive modules, no continuous offscreen animation

## Definition Of Done

- All acceptance criteria in the active task pass.
- Lint, typecheck, relevant tests, and production build pass.
- No console errors, hydration warnings, broken links, missing media, overlap, clipping, or unintended horizontal scrolling.
- Keyboard and responsive checks pass at defined breakpoints.
- New behavior has appropriate automated coverage.
- Required production content contains no unresolved `[PLACEHOLDER]` values.
- Production content also contains no `DEMO_ONLY`, `LEGAL_VERIFY_*`, sample-domain, sample-contact, or unapproved legal-policy marker.
- The user has explicitly approved the task with `Duyệt Txxx`.
