# Corporate Website Task Plan

## Workflow

Only one task may be `IN_PROGRESS`. Cursor must implement, review, test, report, and wait for `Duyệt Txxx` before marking it `DONE` and starting the next task.

Decision recorded on 2026-09-23: the user named the company Web2Go and supplied the logo. The repository may use the Web2Go demo content pack for local/staging review, but invented legal or operating details must never be presented as verified facts. T021 and T022 use separate staging and production gates.

The current task notes are intentionally conservative: no command result, legal approval, domain ownership, deployment, or browser-matrix result may be claimed unless it is run or supplied by the owner in the current task.

Status values: `TODO`, `IN_PROGRESS`, `REVIEW`, `DONE`, `BLOCKED`.

Each report must include changed files, implemented behavior, commands run, results, screenshots when UI changed, and remaining risks.

## Task Queue

### T001 Project Foundation

Status: DONE

Create the Next.js App Router project inside `code/` with TypeScript, Tailwind CSS, ESLint, formatting, test runners, Playwright, environment validation, and standard scripts. All application files and commands must remain inside `code/`.

Acceptance: `code/` is the application root; no implementation files exist outside it; development and production builds start; lint and typecheck work; one unit smoke test and one Playwright smoke test pass; `code/.env.example` contains names only, no secrets.

Gate: install, lint, typecheck, unit test, Playwright smoke test, production build.

### T002 Tokens And Base Styles

Status: DONE

Implement color, typography, spacing, container, grid, radius, focus, reduced-motion, and breakpoint tokens from the spec.

Acceptance: token documentation and a development preview cover headings, body, color, spacing, focus, and mobile wrapping.

Gate: lint, typecheck, unit test for token helpers, visual screenshots at 375 and 1440 px, build.

### T003 Core UI Primitives

Status: DONE

Build Button, IconButton, Link, Container, Grid, Stack, SectionHeader, responsive Image, Accordion, Tabs, Modal, and Carousel primitives.

Acceptance: variants and states include default, hover, focus, disabled, loading, empty, and error where relevant; keyboard behavior passes.

Gate: component tests, axe checks, keyboard Playwright tests, responsive screenshots, build.

### T004 Global Layout And Navigation

Status: DONE

Build skip link, site header, desktop navigation, approved mega menus, mobile navigation, breadcrumbs, language control shell, main landmark, and footer.

Acceptance: full keyboard operation, focus return, active states, scroll behavior, and mobile panel work without layout shift.

Gate: navigation unit tests, keyboard E2E, 375/768/1024/1440 screenshots, axe, build.

### T005 CMS Contracts And Mock Data

Status: DONE

Define typed view models, validation, CMS query boundaries, mappers, mock records, placeholders, empty states, and error states for all collections.

Acceptance: UI never receives raw CMS documents; invalid statistics without value, unit, period, or source are rejected.

Gate: schema and mapper unit tests, typecheck, lint, build.

### T006 Homepage Hero Metrics And About

Status: DONE

Implement the static cinematic hero, verified metrics, and About sections with mobile art direction and placeholder-safe content.

Acceptance: next section remains visible from the hero; metrics include source and period; no autoplay video is added.

Gate: component tests, 375/768/1440 screenshots, LCP review, axe, build.

### T007 Business Sectors

Status: DONE

Implement the critical sector grid and sector card behavior for desktop, tablet, and mobile.

Acceptance: all sector names are immediately visible; no essential hover content; 3/2/1-column layouts match the spec; cards link correctly.

Gate: component tests, keyboard E2E, 375/768/1200/1440 screenshots, axe, build.

### T008 Corporate Ecosystem

Status: DONE

Implement hierarchy plus detail panel on desktop, grouped filter list on tablet, and accordion list on mobile using one data model.

Acceptance: every company is reachable in list form; filters are keyboard accessible; the UI remains usable with many records.

Gate: filter tests, keyboard E2E, large-data fixture, responsive screenshots, axe, build.

### T009 Vision And Featured Projects

Status: DONE

Implement the vision and mission band plus featured project layout and nonautoplay mobile project navigation.

Acceptance: image copy remains readable; project metadata is visible; controls have names and focus states.

Gate: component tests, carousel E2E, reduced-motion test, screenshots, build.

### T010 Timeline And Brand Video

Status: DONE

Implement horizontal desktop and vertical mobile timelines plus deferred video loading, poster, modal, captions, transcript, and controls.

Acceptance: video is not fetched before intent; Escape closes and restores focus; timeline has a static accessible representation.

Gate: network assertion, keyboard E2E, reduced-motion test, axe, screenshots, build.

### T011 Sustainability Partners News Careers And CTA

Status: DONE

Implement remaining homepage sections and data-driven cards using the shared design system.

Acceptance: sustainability claims require evidence; partner logos require approval state; dates and categories show on news; career CTA works on mobile.

Gate: component tests, content validation tests, responsive screenshots, axe, build.

### T012 Homepage Integration

Status: DONE

Assemble the complete homepage in approved order, tune spacing and motion, and verify all links and states.

Acceptance: no overlap, clipping, unexpected horizontal scroll, broken link, or missing empty state at any required breakpoint.

Gate: full homepage E2E, visual regression at six breakpoints, console and network review, Lighthouse, build.

### T013 About And Leadership Templates

Status: DONE

Build About, history, vision/mission/values, leadership, and governance templates.

Acceptance: heading hierarchy, timeline, profiles, breadcrumbs, related content, metadata, and empty states work.

Gate: route integration tests, E2E, axe, metadata tests, build.

### T014 Sector Subsidiary And Project Templates

Status: DONE

Build listing and detail templates, filters, galleries, facts, relationships, and related content for sectors, subsidiaries, and projects.

Acceptance: relations are rendered from references; filters preserve URL state; galleries are keyboard accessible.

Gate: query and route tests, filter E2E, gallery E2E, screenshots, axe, build.

### T015 Sustainability News Careers And Contact Templates

Status: DONE

Build remaining listing and detail routes, report downloads, job details, contact paths, and accessible contact form.

Acceptance: form validates client and server, protects against spam, provides useful errors, and does not expose secrets.

Gate: form unit and integration tests, spam-path test, keyboard E2E, axe, build.

### T016 CMS Integration And Preview

Status: DONE

Connect Sanity, implement queries, preview, draft isolation, webhook revalidation, permissions assumptions, and production-safe fallbacks.

Acceptance: publish updates only affected routes; draft content never leaks publicly; missing CMS data produces controlled states.

Gate: query tests, preview E2E, webhook integration test, draft-leak test, build.

### T017 Search And Internationalization

Status: DONE

Implement site search at the justified complexity level and locale-aware routing, navigation, metadata, and hreflang.

Acceptance: search handles empty, no-result, error, and keyboard states; locale links are reciprocal and preserve valid routes.

Gate: search tests, locale route tests, keyboard E2E, metadata tests, build.

### T018 SEO And Structured Data

Status: DONE

Implement metadata, Open Graph, canonical, robots, sitemap, breadcrumbs, Organization, WebSite, Article, and JobPosting schemas.

Acceptance: draft and noncanonical URLs are excluded; structured data validates on representative routes.

Gate: metadata snapshots, sitemap tests, schema validation, broken-link crawl, build.

### T019 Performance Hardening

Status: DONE

Optimize images, fonts, video, caching, code splitting, client boundaries, animation, and third-party loading.

Acceptance: key templates meet Lighthouse 90 and Core Web Vitals targets in the agreed test environment.

Gate: bundle analysis, Lighthouse mobile runs, Web Vitals capture, network review, build.

### T020 Accessibility Audit

Status: DONE

Audit every key template and workflow against WCAG 2.2 AA and remediate discovered issues.

Acceptance: automated scans are clean for agreed rules; keyboard-only flows complete; focus and reduced motion are correct.

Gate: axe suite, manual keyboard checklist, contrast review, screen-reader spot checks, build.

### T021 Content And Placeholder Readiness

Status: REVIEW

The bilingual Web2Go demo content pack is complete for local customer presentation. It uses fictional company, leadership, project, partner, operating, and policy information without rendering `DEMO_ONLY`, `LEGAL_VERIFY_*`, `[PLACEHOLDER]`, or sample-contact markers.

Vietnamese and English fixtures use the same route identifiers and relationships, while supplying locale-specific company, sector, ecosystem, project, news, leadership, career, timeline, sustainability, FAQ, SEO, and policy copy. `CONTENT_MODE=demo` documents the fixture's intended use and keeps public release outside T021.

Acceptance for demo: all required routes render; Web2Go logo loads; legal pages show complete customer-facing copy without internal markers; content report has zero blockers, source literals, and missing media; the local gate passes.

Acceptance for production remains separate: replace fictional content with owner-approved records, complete legal review, configure production contacts and domain, and switch `CONTENT_MODE` to `production`.

Gate passed on 2026-09-23: content report, lint, typecheck, unit tests, integration tests, Playwright Chromium (19 tests), and production build. `release:check` correctly fails while `CONTENT_MODE=demo`.

Approval: wait for explicit `Duyệt T021` before marking `DONE` or beginning T022.

### T022 Release QA And Deployment

Status: BLOCKED

T022 may use the staging content pack for a release rehearsal, but public production release remains blocked until T021 production acceptance is approved. A local build does not establish legal truth, domain ownership, consent configuration, or deployment authorization.

Run cross-browser and responsive QA, configure redirects, analytics consent, DNS checklist, monitoring, backup, rollback, and handover.

Acceptance: production smoke tests pass; the verification-token scan is zero; the verified domain and certificate are recorded; consent and analytics configuration are approved; monitoring, backup, rollback, browser matrix, and release approval are recorded.

Gate: complete regression suite, production build, browser matrix, Lighthouse, accessibility suite, SEO crawl, deployment smoke test, host checklist, and explicit `Duyệt T022`.
