# Reference technology assessment

## Verified

- **Next.js — high confidence.** Public assets and scripts are served from `/_next/static/`, and a Turbopack-named chunk is present.
- **React-rendered application — high confidence.** The page is delivered as a Next.js application with client-side route behavior.
- **Newsreader and IBM Plex Sans — high confidence.** Computed styles identify Newsreader for display headings and IBM Plex Sans for body copy.
- **Responsive custom CSS — high confidence.** The desktop navigation becomes a fixed mobile panel, headlines scale from roughly 90px to 38px, and content becomes single-column without horizontal overflow.

## Probable

- **App Router — medium confidence.** The modern Next.js chunk structure and route behavior are consistent with App Router, but the public page does not expose the source tree.
- **Vercel hosting — medium confidence.** The deployment characteristics are consistent with Vercel, but hosting headers were not authoritative in the available browser surface.
- **CSS-driven reveal animations — medium confidence.** Computed classes and transforms show reveal states with restrained transitions; the source animation library, if any, is not publicly identifiable.

## Unknown

- Whether a dedicated motion library is used
- Whether content is stored in files, a CMS, or another source
- The exact build configuration and deployment pipeline
- Any private analytics or monitoring configuration

## Observable interaction details

- Sticky translucent header around 72px tall
- Warm off-white canvas (`rgb(247, 247, 245)`) and near-black text
- Hairline borders, 16px card radii, and minimal shadow
- Desktop headline around 90px; mobile around 38px
- Mobile navigation panel uses an approximately 300ms transform/opacity transition with `cubic-bezier(.22,.61,.36,1)`
- Current cards use approximately 350ms transform, border, and shadow transitions
