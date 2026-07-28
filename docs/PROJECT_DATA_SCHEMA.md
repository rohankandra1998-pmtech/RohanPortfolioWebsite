# Project data schema

Projects are defined by the `Project` type in `content/site.ts`.

```ts
type Project = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  timeframe: string;
  organization: string;
  role: string;
  team: string;
  tags: string[];
  image: string;
  imageAlt: string;
  liveUrl?: string;
  repoUrl?: string;
  metrics: { value: string; label: string }[];
  sections: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    bullets?: string[];
    media?: {
      src: string;
      alt: string;
      caption: string;
    }[];
  }[];
};
```

`slug` controls the URL and must remain unique. `image` paths begin with `/` and
resolve from `public/`. `metrics` may represent verified scope, system
properties, or research counts; they must not imply unmeasured business impact.
Media captions should identify prototypes and proposals explicitly.
