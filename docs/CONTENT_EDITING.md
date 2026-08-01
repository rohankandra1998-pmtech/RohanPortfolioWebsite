# Content editing

## Primary content file

Edit `content/site.ts` for contact details, navigation, social links,
experience, education, principles, skills, and projects. The
exported TypeScript types make omissions visible during `npx tsc --noEmit`.

### Common changes

- Profile or contact: update `contact` and `socials`.
- Career history: update `experiences`; preserve reverse chronology.
- Project card and case study: update the matching item in `projects`.
- Homepage current-focus cards: edit `currentCards` in `app/page.tsx`.

## Project case studies

Every project needs a stable `slug`, card summary, verified context, at least
one public image, metrics that do not overstate impact, and meaningful
`sections`. Optional live and repository links are rendered only when present.

Use the section labels to clarify epistemic status:

- `Problem`, `Users`, `Research`, `Decision`, `Build`, `Result`, `Lesson`
- say `Proposed`, `Prototype`, or `Roadmap` when the work was not shipped;
- say `Expected` when an outcome was modeled rather than measured.

Do not add an empty section to make projects look symmetrical.

## Page-only narrative

Long-form About and Experience compositions intentionally live in their route
files because their ordering is part of the editorial design. When changing
them, keep all underlying facts synchronized with `content/site.ts`.

## Verification

After editing:

```bash
npx tsc --noEmit
npm run lint
npm test
```

Then inspect the affected page at desktop and 390px. Check heading wrapping,
paragraph measure, image loading, navigation, and horizontal overflow.
