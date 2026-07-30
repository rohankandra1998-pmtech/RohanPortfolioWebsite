# Validation report

Validated July 26, 2026.

## Automated checks

| Check | Result |
| --- | --- |
| Production build (`npm run build`) | Pass |
| ESLint (`npm run lint`) | Pass, zero warnings |
| TypeScript app check (`npx tsc --noEmit`) | Pass |
| Portfolio tests (`node --test tests/rendered-html.test.mjs`) | Pass |
| Secrets/raw source documents | Not present in tracked public source |

## Route inspection

The in-app browser rendered Home, About, Experience, Work, Thoughts, Contact,
all three case studies, and the custom not-found path. Each valid route had the
expected page title and `h1`; no application error overlay remained after the
static-image correction.

## Responsive matrix

| Viewport | Home overflow | Case-study overflow | Navigation |
| --- | --- | --- | --- |
| 1440×1000 | None | None | Desktop |
| 1280×900 | None | None | Desktop |
| 1024×768 | None | None | Desktop |
| 768×1024 | None | None | Mobile |
| 390×844 | None | None | Mobile |
| 375×812 | None | None | Mobile |

The 390px LaunchGuard title initially overflowed by 17px. The mobile case-study
type scale and emergency word wrapping were refined and re-tested at 390px and
375px with no overflow.

## Interaction and accessibility

- Mobile menu reports `aria-expanded`, opens to a visible navigation panel,
  and closes when a destination is chosen.
- Semantic landmarks, one page-level heading, labeled form controls, a skip
  link, descriptive link names, alt text, and visible focus selectors are
  present.
- `prefers-reduced-motion` disables animation, transitions, transforms, and
  smooth scrolling.
- Contact submission constructs a mailto link and stores no form data.
- Touch controls meet the intended mobile sizing.

No automated axe runtime was bundled; the accessibility pass combined semantic
DOM inspection, source safeguards, responsive screenshots, focus-style review,
and keyboard-operable native controls.

## Browser and media

All public portrait and project image paths were rendered directly and verified
with non-zero natural dimensions when in view. Lazy images load as they approach
the viewport. Development-console output contained only Vite connection and
React development notices after the image fix, with no application errors.

## Reference comparison

The side-by-side artifact confirms close alignment in header quietness,
left-edge/container position, large editorial type, body measure, open
whitespace, data-inspired supporting objects, restrained controls, and warm
background. Remaining differences are intentional content/asset adaptations
listed in `docs/SCREENSHOT_GUIDE.md`.

## Complete RAG case study

Validated July 30, 2026.

- Rendered all 24 pages of the supplied DOCX through Microsoft Word and
  visually inspected every page before migration.
- Audited 388 source paragraphs, including 361 non-empty text blocks, 11
  embedded PNGs, and 10 figure captions.
- Confirmed every non-empty source paragraph, heading, list item, quotation,
  code example, caption, and image occurrence is represented in source order.
- Confirmed Figure 4 contains two images and one caption; all other figures
  contain one image.
- Confirmed one semantic `h1`, no skipped heading levels, 10 semantic figures,
  10 `figcaption` elements, 11 descriptive image alternatives, and both
  external action links with `target="_blank"` and `rel="noreferrer"`.
- Confirmed no horizontal overflow at 1440, 1024, 768, or 390 pixels. Figure 4
  renders in two columns at 1024 pixels and stacks at 768 and 390 pixels.
- Confirmed no browser console errors or warnings during the responsive pass.

The long-form layout intentionally translates the Word document into the
portfolio's editorial raspberry Work theme rather than reproducing printed
page dimensions or Word typography. Desktop opening, paired Figure 4, mobile
opening, and mobile Figure 4 evidence is stored under `artifacts/screenshots/`.

## RAG case-study outline

Validated July 30, 2026.

- Confirmed 42 outline links: one Overview target and all 41 exact article
  headings.
- Confirmed deterministic, unique heading IDs and one-to-one outline href
  coverage for every rendered anchor.
- Confirmed one `aria-current="location"` state, exact active highlighting,
  restrained ancestor emphasis, and no white active card, pill, or shadow.
- Confirmed automatic active-section updates while scrolling downward and
  upward, final-section behavior, direct hash alignment, and internal outline
  scrolling that keeps the active item visible.
- Confirmed the permanent desktop ruler begins below the hero beside the
  opening paragraph; 1024px, 768px, and 390px layouts use the compact native
  disclosure.
- Confirmed no horizontal overflow at 1440, 1280, 1024, 768, or 390 pixels.
  The 390px check also covers the browser's minimum narrow viewport used for
  the requested approximately 375px pass.
- Confirmed Figure 4 still stacks at 768px and 390px, and the existing wide
  diagrams retain their 1036px desktop breakout without overflow.
- Confirmed LaunchGuard and UR CourseBot render no RAG outline.
- Confirmed no browser console errors or warnings.

Automated validation passed with `npm install`, `npm run lint`,
`npx tsc --noEmit`, `npm run build`, and `npm test` (16 of 16 tests).
Design comparison and responsive evidence are stored under
`artifacts/screenshots/rag-outline-*`; the complete QA record is in
`design-qa.md`.
