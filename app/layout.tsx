import type { Metadata } from "next";
import { headers } from "next/headers";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import { SiteShell } from "@/components/site-shell";
import { contact } from "@/content/site";
import "./globals.css";

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const image = new URL("/og.png", metadataBase).toString();

  return {
    metadataBase,
    title: {
      default: `${contact.name} — ${contact.positioning}`,
      template: `%s — ${contact.name}`,
    },
    description:
      "Product manager and AI product builder focused on trustworthy AI workflows, product discovery, and data-informed product decisions.",
    alternates: { canonical: "/" },
    openGraph: {
      title: `${contact.name} — ${contact.positioning}`,
      description: contact.statement,
      type: "website",
      url: "/",
      images: [{ url: image, width: 1730, height: 909, alt: contact.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${contact.name} — ${contact.positioning}`,
      description: contact.statement,
      images: [image],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: contact.name,
    jobTitle: contact.positioning,
    email: `mailto:${contact.email}`,
    address: {
      "@type": "PostalAddress",
      addressRegion: "San Francisco Bay Area",
      addressCountry: "US",
    },
    sameAs: [
      "https://www.linkedin.com/in/MeetRohanKandra",
      "https://github.com/rohankandra1998-pmtech",
    ],
  };

  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <a className="skip-link" href="#page-content">
          Skip to main content
        </a>
        <div id="page-content">
          <SiteShell>{children}</SiteShell>
        </div>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
