# Release

This repository is configured for a fictional Web2Go customer demo. The local content scan is clean, but `CONTENT_MODE=demo` intentionally blocks public release. Live hosting, DNS, Turnstile, and analytics configuration are outside this repository.

## Company

- Trade name: Web2Go
- Legal name: Công ty Cổ phần Công nghệ Web2Go (fictional demo content)
- Enterprise code: not configured for public release
- Office: Tầng 8, 123 Nguyễn Huệ, Quận 1, Thành phố Hồ Chí Minh (fictional demo content)
- Public mailbox: hello@web2go.vn

## Checklist

- [ ] DNS and certificate point to the approved host for the chosen domain.
- [ ] `NEXT_PUBLIC_SITE_URL` is the canonical origin.
- [ ] Sanity project, dataset, preview secret, and revalidation secret are set on the host if CMS is used.
- [ ] Turnstile keys are set before the contact form is opened to the public.
- [ ] Analytics stays off until a provider id exists and the visitor accepts cookies.
- [ ] Replace every fictional corporate, legal, personnel, project, partner, and policy value with approved production content.
- [ ] Set `CONTENT_MODE=production` only after approved content, legal review, and release authorization exist.
- [ ] `ALLOW_INDEXING=true` may be set only after the production content scan and release authorization are complete.
- [ ] Rollback is the previous Vercel deployment. Keep the last known good deployment pinned.
- [ ] Monitor `/api/health` and the contact route error rate.
- [ ] Backup is the Sanity dataset export plus the git revision deployed.

## Local Demo QA recorded on 2026-09-23

- Content report: 0 content blockers, 0 rendered source literals, and 0 missing media.
- Lint, typecheck, unit (15), integration (6), Playwright Chromium (19), and production build passed.
- `release:check` correctly fails while `CONTENT_MODE=demo`.
- Firefox and WebKit browsers were not installed in this environment.
- Live Vercel promotion was not executed from this workspace.
- Earlier Lighthouse on `/vi`: performance 91 (warm), accessibility 100, best practices 100. SEO was 69 while robots still blocked indexing. Re-run Lighthouse after `ALLOW_INDEXING` is enabled on the host.

## Handover

Local commands run from `code/`:

```bash
npm install
npx playwright install chromium
npm run dev
npm run lint
npm run typecheck
npm run test:unit
npm run test:integration
npm run test:e2e
npm run build
npm run content:report
npm run release:check
```
