# Design tokens

## Reference-informed foundations

| Token | Value | Purpose |
| --- | --- | --- |
| Canvas | `#f7f7f5` | warm editorial page background |
| Ink | `#16181c` | primary text and dark actions |
| Muted | `#4b515a` | body copy |
| Faint | `#757a82` | supporting metadata |
| Line | `#e6e6e2` | borders and dividers |
| Card | `#ffffff` | project and data surfaces |
| Accent | `#3f7d68` | labels, focus, and quiet interaction |
| Accent soft | `#e1eee8` | selected or explanatory surfaces |
| Lavender | `#7567a8` | occasional project visual accent |
| Radius | `16px` | cards and media frames |
| Content width | `1036px` | primary desktop wrap |
| Motion easing | `cubic-bezier(.22,.61,.36,1)` | navigation and reveal movement |

## Typography

- Display: Newsreader, delivered through `next/font/google`.
- Body: IBM Plex Sans, delivered through `next/font/google`.
- Legal fallback: Georgia for display; system UI stack for body.
- Desktop homepage `h1`: approximately 90px.
- Mobile homepage `h1`: 38px.
- Body: approximately 18–19px desktop, 16–17px mobile.
- Metadata: compact uppercase with increased letter spacing.

The reference exposed Newsreader and IBM Plex Sans in computed styles, so no
font substitution was required.

## Layout and motion

- Sticky header height: 72px.
- Desktop gutters are fluid around the 1,036px wrap.
- Mobile horizontal padding: 22px.
- Section spacing is intentionally large and editorial.
- Reveals use opacity plus a short vertical translation.
- Hover movement stays within a few pixels and 300ms.
- `prefers-reduced-motion: reduce` removes transforms, animation, and smooth
  scrolling.
