# Rohan Singh Kandra — Portfolio

An independently built portfolio for a product manager and AI product builder.
The visual system closely recreates the publicly observable layout, typography,
spacing, and interaction patterns of [luisarosa.com](https://www.luisarosa.com/)
while using only Rohan's content, photography, project evidence, and original
implementation.

## Routes

- `/` — introduction, current focus, selected work, and product principles
- `/about` — career transition, working style, education, and interests
- `/experience` — editorial career timeline and verified outcomes
- `/work` — selected project index
- `/work/launchguard` — AI evaluation and prompt-improvement case study
- `/work/rag-knowledge-assistant` — cited document-retrieval case study
- `/work/ur-coursebot` — education-product discovery case study
- `/contact` — mail-app contact form and verified social links

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Open the URL printed by the development server.

## Validation

```bash
npm run lint
npx tsc --noEmit
npm test
```

`npm test` runs a production build before the source-level route and safeguard
tests. See [docs/VALIDATION_REPORT.md](docs/VALIDATION_REPORT.md) for the latest
manual browser matrix.

## Editing

Most public copy and structured data live in `content/site.ts`. The page files
control composition; `app/globals.css` holds the design system. Start with
[docs/CONTENT_EDITING.md](docs/CONTENT_EDITING.md).

## Documentation

- [Recreation plan](docs/RECREATION_PLAN.md)
- [Reference technical assessment](docs/REFERENCE_TECH_ASSESSMENT.md)
- [Content inventory](docs/CONTENT_INVENTORY.md)
- [Route map](docs/ROUTE_MAP.md)
- [Design tokens](docs/DESIGN_TOKENS.md)
- [Project schema](docs/PROJECT_DATA_SCHEMA.md)
- [Asset manifest](docs/ASSET_MANIFEST.md)
- [Screenshot guide](docs/SCREENSHOT_GUIDE.md)
- [Vercel deployment](docs/VERCEL_DEPLOYMENT.md)
- [Missing content](docs/MISSING_CONTENT.md)

## Privacy

Raw resumes, STAR worksheets, interview-prep documents, and the source slide
deck are intentionally excluded. The contact form stores nothing and opens a
visitor's own email application. No analytics, cookies, authentication,
database, or API service is used.
