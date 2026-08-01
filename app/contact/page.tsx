import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { contact, socials } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Rohan Singh Kandra about product management, AI products, and technical product opportunities.",
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      <section className="page-head page-head--contact contact-hero">
        <div className="wrap contact-hero__inner" data-reveal>
          <p className="eyebrow eyebrow--dot contact-hero__eyebrow">Let’s connect</p>
          <h1>Say hi!</h1>
          <p className="page-head__lead contact-hero__lead">
            Write your note below and it will open in your own email app.
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="wrap contact-grid">
          <ContactForm />
          <aside className="contact-aside" data-reveal>
            <div aria-hidden="true" className="contact-visual">
              <span className="contact-visual__logo" />
            </div>
            <div className="contact-actions">
              <p className="eyebrow contact-actions__label">Prefer something else?</p>
              <a className="contact-direct focus-ring" href={`mailto:${contact.email}`}>
                <span>Email</span>
                <strong>{contact.email}</strong>
                <b aria-hidden="true">↗</b>
              </a>
              {socials.slice(0, 2).map((link) => (
                <a
                  className="contact-direct focus-ring"
                  href={link.href}
                  key={link.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>{link.label}</span>
                  <strong>Open profile</strong>
                  <b aria-hidden="true">↗</b>
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
