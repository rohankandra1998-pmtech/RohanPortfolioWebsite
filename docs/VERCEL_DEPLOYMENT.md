# Vercel deployment

The source is Vercel-ready but no permanent domain should be connected without
Rohan's explicit approval.

## Preview deployment

1. Import `rohankandra1998-pmtech/RohanPortfolioWebsite` into Vercel.
2. Use the repository root.
3. Use Node.js 22.
4. Install with `npm install`.
5. Build with `npm run build`.
6. Do not add environment variables; the portfolio requires none.
7. Deploy a preview from the feature branch.

After deployment, verify all routes in `docs/ROUTE_MAP.md`, social and project
links, image loading, metadata, `robots.txt`, `sitemap.xml`, the mailto form,
and 390px responsive behavior.

## Domain

The metadata base is derived from the incoming host, so canonical and social
image URLs work on previews and the eventual production domain. Connect a
permanent domain only after approval and a final preview review.

## OpenAI Sites

The repository also includes the Sites starter configuration and can be
packaged and privately deployed through OpenAI Sites. This does not require
application secrets or a database.
