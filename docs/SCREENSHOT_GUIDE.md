# Screenshot capture

## Baseline viewports

- Desktop: 1440×1000, 1280×900, 1024×768
- Tablet: 768×1024
- Mobile: 390×844, 375×812

## Required captures

Capture Home at desktop and mobile, About, Experience, Work, a case-study
opening, Contact, and the open mobile menu. Wait at least 900ms after navigation
so the restrained reveal animation has settled.

Store reviewable evidence in `artifacts/screenshots/`. Current files include:

- `home-desktop.png`
- `home-mobile.png`
- `about-desktop.png`
- `experience-desktop.png`
- `work-desktop.png`
- `work-mobile.png`
- `launchguard-case-desktop.png`
- `launchguard-case-mobile.png`
- `contact-desktop.png`
- `mobile-menu.png`
- `reference-home-desktop.png`
- `reference-vs-implementation.png`

## Comparison checklist

Use matching viewports and compare header height, content left edge, maximum
width, heading scale, line breaks, body measure, vertical rhythm, data-artifact
placement, button sizing, image crop, border tone, and breakpoint behavior.

Do not compare copied content or assets. The benchmark is publicly observable
design behavior; the implementation must remain independently written and use
Rohan's materials.

## Intentional differences

- The reference's proprietary logo, illustrations, project media, and copy are
  replaced with Rohan's wordmark, CSS/data artifacts, and verified projects.
- Work is a dedicated route so three deep case studies remain discoverable.
- Social links use text labels rather than copied icons.
- The contact form opens a mail application and stores no data.
- Motion is implemented with a small IntersectionObserver reveal rather than
  reproducing any proprietary animation implementation.
