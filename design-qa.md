# RAG case-study outline design QA

## Evidence

- Source visual truth:
  `C:\Users\Rohan\Downloads\ChatGPT Image Jul 30, 2026, 01_54_58 PM.png`
- Browser-rendered implementation:
  `artifacts/screenshots/rag-outline-desktop-overview-final.png`
- Side-by-side focused comparison:
  `artifacts/screenshots/rag-outline-design-comparison.png`
- Responsive evidence:
  `artifacts/screenshots/rag-outline-tablet-open.png` and
  `artifacts/screenshots/rag-outline-mobile-390-open.png`
- Desktop active-state evidence:
  `artifacts/screenshots/rag-outline-desktop-step-5.png` and
  `artifacts/screenshots/rag-outline-desktop-final.png`
- Source pixels: 1456 × 1086.
- Desktop implementation pixels and CSS viewport: 1440 × 1000 at device scale
  1.
- Focused comparison normalization: a 1180 × 496 source crop and a 1160 × 760
  implementation crop were each contained in a 720 × 450 panel.
- State: the Overview anchor is active beside the opening article paragraph.

## Findings

No actionable P0, P1, or P2 findings remain.

- Fonts and typography: the outline uses the existing sans-serif system and
  compact metadata scale. Labels wrap naturally without truncation. Root,
  subsection, and step levels remain distinct at the required density.
- Spacing and layout: the desktop rail aligns with the first article paragraph,
  stays outside the hero, preserves the 720px reading column, and does not
  constrain existing figure sizes. Tablet and mobile disclosures use the same
  semantic outline without duplicate links.
- Colors and tokens: inactive states use the existing faint and muted tokens;
  active text, tick, node, and focus indicators use the Work-page raspberry
  tokens. No white active card, pill, shadow, or filled active rectangle exists.
- Image quality and assets: all 11 existing article images and 10 figures remain
  unchanged, retain natural aspect ratios, and use the pre-existing source
  assets. No image or icon placeholders were introduced.
- Copy and content: all 41 source headings appear verbatim, with Overview added
  only as a navigation target. No article, caption, metadata, or button copy was
  changed.
- Interaction and accessibility: one link has `aria-current="location"`;
  ancestor states are secondary; the native disclosure, semantic nested list,
  real anchors, visible focus treatment, reduced-motion branch, and hash
  destinations are present. The outline scrolls independently and keeps the
  active link visible.
- Responsive behavior: browser checks at 1440, 1280, 1024, 768, and 390 pixels
  found no horizontal overflow. Figure 4 remains paired on desktop and stacked
  at 768 and 390 pixels.

## Comparison history

Initial browser comparison found five P2 issues:

1. Programmatically focused article anchors showed a default orange outline.
   The article and heading focus targets now suppress that non-user focus ring;
   outline links retain a visible raspberry keyboard focus indicator.
2. Tablet/mobile disclosure links scrolled before the disclosure collapsed,
   moving the destination above the sticky header. The disclosure now collapses
   before the destination offset is calculated.
3. The open tablet/mobile outline used a translucent canvas that allowed article
   content to show through. It now uses the opaque site canvas.
4. The shifted desktop reading column let wide diagrams extend horizontally at
   1280px. Wide figures retain their original 1036px size and receive a scoped
   lateral correction between 1025px and 1350px.
5. Smooth clicks and direct hashes could briefly leave the previous section
   active or drift after late layout changes. Pending navigation now protects
   the requested active state, and a short-lived resize observer realigns direct
   hash landings while the article settles.

Post-fix browser evidence confirms correct sticky offsets, one exact active
link, parent emphasis, independent rail scrolling, direct-hash alignment,
clean responsive disclosures, and no console errors or warnings.

## Primary interactions tested

- Clicked Overview, a root chapter, Pipeline A, a nested Step 5 entry, and the
  final summary entry.
- Scrolled down and back up across adjacent headings.
- Opened a direct `#purpose-statement` URL in a fresh tab.
- Verified the final item and automatic internal outline scrolling.
- Opened and closed tablet/mobile disclosure states and confirmed link
  selection closes the disclosure.
- Confirmed LaunchGuard and UR CourseBot render no RAG outline.

Focused region comparison was required because the source image includes the
unchanged hero while this task begins below it. The focused artifact compares
the intended ruler/article relationship at readable scale.

final result: passed
