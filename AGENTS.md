# Portfolio maintenance guide

## Architecture

This is a Next.js App Router application compiled with vinext for OpenAI Sites
and kept Vercel-compatible. Server components are the default. Client
JavaScript is limited to the navigation/reveal shell and mailto contact form.

- `app/` — route compositions, metadata, sitemap, robots, and global styles
- `components/` — reusable shell, project card, and contact form
- `content/site.ts` — typed public content and project case-study data
- `public/` — optimized public imagery and the social card
- `docs/` — research, editing, design, validation, and deployment guidance
- `artifacts/screenshots/` — checked visual-QA evidence
- `tests/` — lightweight route, metadata, accessibility, and privacy checks

The database and authentication helpers inherited from the Sites starter are
not used by this public portfolio. Do not introduce persistence or identity
without an explicit product requirement.

## Coding conventions

- Keep TypeScript strict and content strongly typed.
- Prefer server components; add `"use client"` only for real interaction.
- Keep route content semantic: one `h1`, ordered headings, landmark elements,
  descriptive links, and useful image alt text.
- Do not duplicate project facts in page files. Update `content/site.ts`.
- Keep external links explicit and use `rel="noreferrer"` when opening a new tab.
- Avoid large UI dependencies. The visual system is intentionally CSS-native.

## Design fidelity

Preserve the independent recreation's observable reference characteristics:

- warm `#f7f7f5` canvas and near-black type;
- approximately 1,036px desktop content width;
- quiet 72px sticky header;
- editorial display typography and compact sans-serif metadata;
- large whitespace, hairline rules, restrained radii, and minimal shadow;
- two-column desktop compositions that collapse deliberately on mobile;
- 300ms movement using `cubic-bezier(.22,.61,.36,1)`;
- restrained reveal and hover motion, never decorative spectacle.

Do not add gradients, glassmorphism, neon AI motifs, skill bars, testimonial
templates, generic SaaS cards, or unrelated components.

## Content rules

The supplied resume, STAR worksheets, LinkedIn profile, repositories, live
products, and CourseBot deck are the sources of truth. Never invent dates,
titles, responsibilities, technologies, research counts, business impact, or
outcomes. Preserve the distinction between shipped features, prototypes,
recommendations, and expected outcomes.

Raw private source documents must never be copied into `public/` or committed.
If sources conflict, record the conflict in `docs/CONTENT_INVENTORY.md` or
`docs/MISSING_CONTENT.md` and use the most authoritative version.

## Asset rules

- Use only Rohan's supplied portrait, verified project screenshots, deck
  excerpts, and original graphics.
- Never hotlink or reuse reference-site media.
- Keep public filenames stable because project data references them directly.
- Add descriptive alt text and a manifest entry for every new asset.
- Do not materially alter Rohan's facial appearance.
- Never publish screenshots containing credentials, private test data, or
  personal user information.

## Responsive and accessibility expectations

Validate at roughly 1440, 1280, 1024, 768, 390, and 375 pixels. There must be no
horizontal overflow. Headings must wrap cleanly, project imagery must retain its
aspect ratio, mobile controls must remain touch-friendly, and the navigation
must expose a correct expanded state.

Keep the skip link, visible `:focus-visible` treatment, logical heading order,
reduced-motion override, labeled form controls, semantic landmarks, accessible
menu name, and descriptive link names.

## Commands

```bash
npm install
npm run lint
npx tsc --noEmit
npm test
```

`npm test` includes the production build. Fix all warnings that affect the app;
never hide an error simply to make a check green.

## Screenshot comparison workflow

1. Run `npm run dev`.
2. Open the reference and local equivalent at the same viewport.
3. Capture the desktop homepage, mobile homepage, about, experience, work,
   one complete case-study opening, and contact/footer.
4. Compare header height, container position, heading scale and wrapping,
   paragraph measure, vertical rhythm, cards, image crops, and mobile changes.
5. Record intentional differences in `docs/VALIDATION_REPORT.md`.
6. Re-run route overflow, image-loading, mobile-menu, lint, TypeScript, tests,
   and production build checks.

Reset temporary browser viewport overrides after testing.
