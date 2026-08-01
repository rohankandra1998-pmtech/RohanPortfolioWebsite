# Reference recreation plan

## Route map

| Reference route | Portfolio route | Treatment |
| --- | --- | --- |
| `/` | `/` | Close recreation of the editorial hero, profile preview, current cards, selected work, principles, and contact invitation. |
| `/about` | `/about` | Same page-head and portrait-led narrative structure, adapted to Rohan's consulting-to-product story. |
| `/experience` | `/experience` | Same editorial timeline, selected work, education, and recognition rhythm. |
| `/contact` | `/contact` | Same concise contact page; the form opens the visitor's email client and stores nothing. |
| — | `/work` | Added because the brief requires a dedicated selected-work index. |
| — | `/work/launchguard` | Added long-form case study. |
| — | `/work/rag-knowledge-assistant` | Added long-form case study. |
| — | `/work/ur-coursebot` | Added long-form case study. |

## Component inventory

- Sticky translucent header, desktop navigation, and mobile drop-down menu
- Editorial page header and section heading
- Data-inspired hero canvas
- Current-focus cards
- Selected-work cards with editorial image treatment
- Experience timeline rows
- Numbered product principles
- Case-study chapter, metric strip, media figure, and link groups
- Contact form that composes a `mailto:` URL
- Shared footer and reduced-motion-aware scroll reveal

## Design tokens

- Canvas: `#f7f7f5`
- Ink: `#16181c`
- Muted ink: `#4b515a`
- Border: `#e6e6e2`
- Card: `#ffffff`
- Accent: `#3f7d68`
- Accent soft: `#e1eee8`
- Secondary accent: `#7567a8`
- Display type: Newsreader with Georgia fallback
- Body type: IBM Plex Sans with system-ui fallback
- Content width: approximately 1036px at large desktop
- Desktop outer padding: 32–48px; mobile: 22px
- Header height: approximately 72px
- Motion: 300–450ms, `cubic-bezier(.22,.61,.36,1)`

## Responsive behavior

- 1024px: project and content grids reduce columns while keeping editorial measure.
- 768px: desktop navigation collapses to the reference-style menu panel.
- 390/375px: 22px page padding, 38px hero name, single-column cards, full-width media, no horizontal scrolling.
- Images retain intentional crops with `object-fit`; case-study evidence remains readable and can expand with the page.

## Content mapping

- Hero: product manager and AI builder positioning, Bay Area location, and verified professional summary.
- About: technology consulting and analytics foundation, MBA transition, discovery practice, and technical product craft.
- Current: Vivify co-op, MBA completion, LaunchGuard, and Bay Area search/build focus.
- Work: LaunchGuard, RAG Knowledge Assistant, and UR CourseBot 2.0.
- Experience: Vivify, PwC, VNB Consulting Services, and DXC Technology.
- Principles: start from evidence, make systems legible, design for action, bridge disciplines, build trust, and keep learning.

## Asset plan

- Use the supplied graduation portrait without facial alteration.
- Use verified screenshots from the two live products and their public repositories.
- Use selected CourseBot research, prioritization, prototype, and roadmap slides rather than embedding the entire deck.
- Use a bespoke generated social card whose exact copy matches the site.
- Do not publish the master resume, STAR files, or raw source deck.

## Implementation and testing

- Next App Router-compatible Vinext starter, TypeScript, reusable content data, and CSS tokens.
- No authentication, database, analytics, CMS, or backend form handler.
- Verify type checking, lint, unit/static rendering tests, and production build.
- Compare Home at 1440 and 390, then verify About, Experience, Work, one case study, Contact, keyboard focus, reduced motion, and internal/external links.

## Known adaptations

- The reference has no public case-study routes, so the project pages extend its typography, spacing, borders, and image rhythm.
- The exact reference fonts are open Google fonts; the implementation uses the same families through the framework with legal system fallbacks.
- The CourseBot deck contains a repeated-name error on its team slide; the title slide and LinkedIn post are used as the authoritative collaborator sources.
- A final public resume PDF and permanent domain were not supplied, so private master-resume material is not exposed.
