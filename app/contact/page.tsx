import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { contact, socials } from "@/content/site";

function EmailIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <rect
        fill="none"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
        width="19"
        x="2.5"
        y="4.5"
      />
      <path
        d="m4 7 8 6 8-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <path
        d="M5.4 8.1H2.2V21h3.2V8.1ZM3.8 2.5A1.9 1.9 0 1 0 3.8 6.3a1.9 1.9 0 0 0 0-3.8ZM21.8 13.6c0-3.9-2.1-5.8-4.9-5.8-2.2 0-3.3 1.2-3.8 2.1V8.1H9.9V21h3.2v-6.4c0-1.7.3-3.4 2.5-3.4 2.2 0 2.2 2 2.2 3.5V21h3.2l.8-7.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <path
        d="M12 2.2a10 10 0 0 0-3.2 19.5v-2.5c-2.7.6-3.3-1.1-3.3-1.1-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.4-2.1-.2-4.4-1.1-4.4-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.5.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.4 4.9.3.3.6.9.6 1.8v3.4A10 10 0 0 0 12 2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ContactIcon({ label }: { label: string }) {
  if (label === "LinkedIn") return <LinkedInIcon />;
  if (label === "GitHub") return <GitHubIcon />;
  return <EmailIcon />;
}

function ExternalArrow() {
  return (
    <svg
      aria-hidden="true"
      className="contact-direct__arrow"
      focusable="false"
      viewBox="0 0 12 12"
    >
      <path
        d="M3 9 9 3M4 3h5v5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Rohan Singh Kandra about product management, AI products, and technical product opportunities.",
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      <section className="contact-content">
        <div className="wrap contact-grid">
          <div className="contact-main">
            <header className="contact-hero" data-reveal>
              <p className="eyebrow eyebrow--dot contact-hero__eyebrow">
                Let’s connect
              </p>
              <h1>Say hi!</h1>
              <p className="contact-hero__lead">
                Write your note below and it will open in your own email app.
              </p>
            </header>
            <ContactForm />
          </div>
          <aside className="contact-aside" data-reveal>
            <div aria-hidden="true" className="contact-visual">
              <span className="contact-visual__logo" />
            </div>
            <div className="contact-actions">
              <div className="contact-actions__heading">
                <span aria-hidden="true" />
                <p className="eyebrow contact-actions__label">
                  Prefer something else?
                </p>
                <span aria-hidden="true" />
              </div>
              <a className="contact-direct focus-ring" href={`mailto:${contact.email}`}>
                <span aria-hidden="true" className="contact-direct__icon">
                  <ContactIcon label="Email" />
                </span>
                <span className="contact-direct__copy">
                  <span>Email</span>
                  <strong>{contact.email}</strong>
                </span>
                <ExternalArrow />
              </a>
              {socials.slice(0, 2).map((link) => (
                <a
                  className="contact-direct focus-ring"
                  href={link.href}
                  key={link.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span aria-hidden="true" className="contact-direct__icon">
                    <ContactIcon label={link.label} />
                  </span>
                  <span className="contact-direct__copy">
                    <span>{link.label}</span>
                    <strong>Open profile</strong>
                  </span>
                  <ExternalArrow />
                </a>
              ))}
            </div>
            <p className="signature contact-signature">— Rohan</p>
          </aside>
        </div>
      </section>
    </div>
  );
}
