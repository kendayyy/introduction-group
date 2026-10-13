# Corporate website

Next.js application root. Run every command in this directory.

No company facts are stored here. Missing business data stays `[PLACEHOLDER]`.

## Setup

```bash
npm install
npx playwright install chromium
```

Copy `.env.example` to `.env.local` when a public site URL is available. The example file contains names and comments only.

## Local development

```bash
npm run dev
```

The development server listens on [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Test gate

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test:unit
npm run test:integration
npm run test:e2e
npm run build
```

`npm run test:e2e` starts the development server and runs the smoke test at a 1440 px desktop viewport and a 375 px mobile viewport.

## Scripts

| Script                     | Purpose                    |
| -------------------------- | -------------------------- |
| `npm run dev`              | Development server         |
| `npm run lint`             | ESLint                     |
| `npm run format:check`     | Prettier check             |
| `npm run format`           | Prettier write             |
| `npm run typecheck`        | TypeScript `tsc --noEmit`  |
| `npm run test:unit`        | Vitest unit project        |
| `npm run test:integration` | Vitest integration project |
| `npm run test:e2e`         | Playwright smoke tests     |
| `npm run build`            | Production build           |
| `npm run start`            | Serve the production build |
