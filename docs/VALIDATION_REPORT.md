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
